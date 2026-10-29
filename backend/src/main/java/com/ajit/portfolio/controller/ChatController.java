package com.ajit.portfolio.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ajit.portfolio.dto.ChatRequest;
import com.ajit.portfolio.dto.ChatResponse;
import com.ajit.portfolio.service.GeminiService;
import com.ajit.portfolio.web.ApiException;
import com.ajit.portfolio.web.RateLimiter;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class ChatController {

    private final GeminiService geminiService;
    private final RateLimiter rateLimiter = new RateLimiter(30, 60_000);

    public ChatController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/chat")
    public ChatResponse chat(@Valid @RequestBody ChatRequest request, HttpServletRequest httpRequest) {
        if (!rateLimiter.tryAcquire(RateLimiter.clientKey(httpRequest))) {
            throw new ApiException(HttpStatus.TOO_MANY_REQUESTS, "rate_limited",
                    "Too many messages. Please wait a moment and try again.");
        }
        String reply = geminiService.reply(request.message(), request.context());
        return new ChatResponse(reply, "gemini");
    }
}
