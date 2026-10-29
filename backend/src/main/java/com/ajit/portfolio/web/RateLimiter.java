package com.ajit.portfolio.web;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import jakarta.servlet.http.HttpServletRequest;

/**
 * Fixed-window, in-memory rate limiter. Intentionally simple: it protects a
 * free-tier AI quota from casual abuse, not against a determined attacker.
 * State resets whenever the instance restarts (Render free tier sleeps often).
 */
public final class RateLimiter {

    private static final int MAX_TRACKED_CLIENTS = 10_000;

    private final int maxRequests;
    private final long windowMillis;
    private final Map<String, Window> windows = new ConcurrentHashMap<>();

    public RateLimiter(int maxRequests, long windowMillis) {
        this.maxRequests = maxRequests;
        this.windowMillis = windowMillis;
    }

    public boolean tryAcquire(String clientKey) {
        long now = System.currentTimeMillis();
        Window window = windows.compute(clientKey, (key, existing) -> {
            if (existing == null || now - existing.start() >= windowMillis) {
                return new Window(now, 1);
            }
            return existing.increment();
        });
        if (windows.size() > MAX_TRACKED_CLIENTS) {
            windows.clear();
        }
        return window.count() <= maxRequests;
    }

    public static String clientKey(HttpServletRequest request) {
        String forwardedFor = request.getHeader("X-Forwarded-For");
        if (forwardedFor != null && !forwardedFor.isBlank()) {
            return forwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }

    private record Window(long start, int count) {
        Window increment() {
            return new Window(start, count + 1);
        }
    }
}
