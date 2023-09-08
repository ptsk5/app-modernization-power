
package com.ibm.greeting.controller;

import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class GreetingController {

    private static final Logger log = LoggerFactory.getLogger(GreetingController.class);

    @Value("${GREETINGS:You did not specify any greetings.}")
    private String greetings;

    @GetMapping(value = "/greetings", produces = MediaType.APPLICATION_JSON_VALUE)
    public String[] getGreetings() {
        String[] greetingsArray = greetings.split(";");
        log.info("Serving greetings: " + Arrays.toString(greetingsArray));
        return greetingsArray;
    }
}