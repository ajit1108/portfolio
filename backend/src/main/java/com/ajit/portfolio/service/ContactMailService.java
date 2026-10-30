package com.ajit.portfolio.service;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

import com.ajit.portfolio.dto.ContactRequest;
import com.ajit.portfolio.web.ApiException;

/**
 * Delivers contact-form messages either through Brevo's HTTPS API (required on
 * hosts that block outbound SMTP, such as the Render free tier) or, when only
 * SMTP is configured, through JavaMailSender.
 */
@Service
public class ContactMailService {

    private static final Logger log = LoggerFactory.getLogger(ContactMailService.class);

    private final JavaMailSender mailSender;
    private final RestClient http;
    private final String smtpHost;
    private final String to;
    private final String from;
    private final String brevoApiKey;
    private final String brevoApiUrl;

    public ContactMailService(
            JavaMailSender mailSender,
            @Value("${spring.mail.host:}") String smtpHost,
            @Value("${app.contact.to:}") String to,
            @Value("${app.contact.from:}") String from,
            @Value("${app.contact.brevo-api-key:}") String brevoApiKey,
            @Value("${app.contact.brevo-api-url:https://api.brevo.com/v3/smtp/email}") String brevoApiUrl) {
        this.mailSender = mailSender;
        this.smtpHost = smtpHost;
        this.to = to;
        this.from = from;
        this.brevoApiKey = brevoApiKey;
        this.brevoApiUrl = brevoApiUrl;

        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(10_000);
        factory.setReadTimeout(15_000);
        this.http = RestClient.builder().requestFactory(factory).build();
    }

    public boolean isConfigured() {
        return isPresent(to) && isPresent(from) && (isPresent(brevoApiKey) || isPresent(smtpHost));
    }

    public void send(ContactRequest request) {
        if (!isConfigured()) {
            throw new ApiException(HttpStatus.SERVICE_UNAVAILABLE, "contact_not_configured",
                    "The contact form is not configured yet. Please email me directly instead.");
        }

        if (isPresent(brevoApiKey)) {
            sendViaBrevo(request);
        } else {
            sendViaSmtp(request);
        }
    }

    private void sendViaBrevo(ContactRequest request) {
        Map<String, Object> payload = Map.of(
                "sender", Map.of("name", "Ajit Birajdar Portfolio", "email", from),
                "to", List.of(Map.of("email", to)),
                "replyTo", Map.of("email", request.email(), "name", request.name()),
                "subject", "[Portfolio] " + singleLine(request.subject()),
                "textContent", bodyText(request));

        try {
            http.post()
                    .uri(brevoApiUrl)
                    .contentType(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON)
                    .header("api-key", brevoApiKey.trim())
                    .body(payload)
                    .retrieve()
                    .toBodilessEntity();
            log.info("Contact email delivered via Brevo to {}", to);
        } catch (RestClientResponseException e) {
            log.error("Brevo rejected contact email: status={} body={}",
                    e.getStatusCode(), e.getResponseBodyAsString(), e);
            throw mailFailure();
        } catch (RuntimeException e) {
            log.error("Failed to reach Brevo: {}", e.getMessage(), e);
            throw mailFailure();
        }
    }

    private void sendViaSmtp(ContactRequest request) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom(from);
        mail.setTo(to);
        mail.setReplyTo(request.email());
        mail.setSubject("[Portfolio] " + singleLine(request.subject()));
        mail.setText(bodyText(request));

        try {
            mailSender.send(mail);
            log.info("Contact email delivered via SMTP to {}", to);
        } catch (RuntimeException e) {
            log.error("Failed to send contact email: {}", e.getMessage(), e);
            throw mailFailure();
        }
    }

    private static String bodyText(ContactRequest request) {
        return """
                New message from your portfolio contact form.

                Name:    %s
                Email:   %s
                Subject: %s

                Message:
                %s
                """.formatted(request.name(), request.email(), singleLine(request.subject()), request.message());
    }

    private static ApiException mailFailure() {
        return new ApiException(HttpStatus.SERVICE_UNAVAILABLE, "mail_send_failed",
                "The message could not be delivered right now. Please email me directly instead.");
    }

    /** Collapse line breaks so a subject can never inject extra mail headers. */
    private static String singleLine(String value) {
        return value == null ? "" : value.replaceAll("[\\r\\n]+", " ").trim();
    }

    private static boolean isPresent(String value) {
        return value != null && !value.isBlank();
    }
}
