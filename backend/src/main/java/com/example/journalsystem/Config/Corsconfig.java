package com.example.journalsystem.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class Corsconfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // This allows all paths to have CORS enabled
        registry.addMapping("/**")
                // Allow all origins (you can specify specific origins here)
                .allowedOrigins("*")
                // Allow specific HTTP methods
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                // Allow all headers
                .allowedHeaders("*")
                // Set the max age for caching pre-flight responses (in seconds)
                .maxAge(3600);
    }
}
