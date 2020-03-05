package com.example.servingwebcontent;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class MyConfiguration {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/*/**")
                        .allowedOrigins("*")
                        .allowedMethods("PUT", "DELETE", "POST", "OPTIONS")
                        .allowedHeaders("Content-Type")
                        .exposedHeaders("Content-Type")
                        .allowCredentials(false).maxAge(3600)
                ;
            }
        };
    }
}
