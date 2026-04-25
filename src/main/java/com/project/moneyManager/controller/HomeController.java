package com.project.moneyManager.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/status","/health","/check"})
public class HomeController {

    //Endpoint To check whether application is running or not, post deployment
    @GetMapping
    public String healthCheck()
    {
        return "Application is running";
    }
}
