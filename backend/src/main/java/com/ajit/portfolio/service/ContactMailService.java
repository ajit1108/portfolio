package com.ajit.portfolio.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.ajit.portfolio.dto.ContactRequest;
import com.ajit.portfolio.web.ApiException;

@Service
public class ContactMailService {

    private static final Logger log = LoggerFactory.getLogger(ContactMailService.class);

    private final JavaMailSender mailSender;
    private final String host;
    private final String to;
    private final String from;

    public ContactMailService(
            JavaMailSender mailSender,
            @Value("${spring.mail.host:}") String host,
            @Value("${app.contact.to:}") String to,
            @Value("${spring.mail.username:}") String from) {
        this.mailSender = mailSender;
        this.host = host;
        this.to = to;
        this.from = from;
    }

    public boolean isConfigured() {
        return isPresent(host) && isPresent(to) && isPresent(from);
    }

    public void send(ContactRequest request) {
        if (!isConfigured()) {
            throw new ApiException(HttpStatus.SERVICE_UNAVAILABLE, "contact_not_configured",
                    "The contact form is not configured yet. Please email me directly instead.");
        }

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom(from);
        mail.setTo(to);
        mail.setReplyTo(request.email());
        mail.setSubject("[Portfolio] " + request.subject());
        mail.setText("""
                New message from your portfolio contact form.

                Name:    %s
                Email:   %s
                Subject: %s

                Message:
                %s
                """.formatted(request.name(), request.email(), request.subject(), request.message()));

        try {
            mailSender.send(mail);
        } catch (RuntimeException e) {
            log.error("Failed to send contact email: {}", e.getMessage());
            throw new ApiException(HttpStatus.SERVICE_UNAVAILABLE, "mail_send_failed",
                    "The message could not be delivered right now. Please email me directly instead.");
        }
    }

    private static boolean isPresent(String value) {
        return value != null && !value.isBlank();
    }
}
