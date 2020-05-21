package com.sagar.Jwtsample.security.controller;

import com.sagar.Jwtsample.security.service.SecurityService;
import com.sagar.Jwtsample.security.vo.LoginCred;
import com.sagar.Jwtsample.security.vo.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by sagar on 20/5/20.
 */
@RestController
public class AuthController {
    private SecurityService securityService;

    @Autowired
    public AuthController(SecurityService securityService) {
        this.securityService = securityService;
    }

    @PostMapping("/auth")
    public LoginResponse authenicateUser(@RequestBody LoginCred loginCred){

        return securityService.authenicateUser(loginCred);
    }


    //TODO: for testing
    @GetMapping("/hello")
    public String hello(){
        return "hello";
    }

}
