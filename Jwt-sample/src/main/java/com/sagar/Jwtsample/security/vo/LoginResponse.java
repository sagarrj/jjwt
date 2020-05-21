package com.sagar.Jwtsample.security.vo;

import java.io.Serializable;

/**
 * Created by sagar on 20/5/20.
 */
public class LoginResponse implements Serializable {

    private String status;
    private String token;


    public LoginResponse() {
    }

    public LoginResponse(String status) {
        this.status = status;
    }

    public LoginResponse(String status, String token) {
        this.status = status;
        this.token = token;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
