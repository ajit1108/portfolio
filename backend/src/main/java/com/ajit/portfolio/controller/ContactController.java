package com.ajit.portfolio.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ajit.portfolio.dto.ContactRequest;
import com.ajit.portfolio.service.ContactMailService;
import com.ajit.portfolio.web.ApiException;
import com.ajit.portfolio.web.RateLimiter;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class ContactController {

    private final ContactMailService contactMailService;
    private final RateLimiter rateLimiter = new RateLimiter(5, 60_000);

    public ContactController(ContactMailService contactMailService) {
        this.contactMailService = contactMailService;
    }

    @PostMapping("/contact")
    public Map<String, String> contact(@Valid @RequestBody ContactRequest request, HttpServletRequest httpRequest) {
        if (!rateLimiter.tryAcquire(RateLimiter.clientKey(httpRequest))) {
            throw new ApiException(HttpStatus.TOO_MANY_REQUESTS, "rate_limited",
                    "Too many messages. Please wait a moment and try again.");
        }
        contactMailService.send(request);
        return Map.of("status", "sent");
    }
}
