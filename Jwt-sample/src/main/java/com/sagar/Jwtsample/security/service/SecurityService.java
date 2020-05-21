package com.sagar.Jwtsample.security.service;

import com.sagar.Jwtsample.security.vo.LoginCred;
import com.sagar.Jwtsample.security.vo.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

/**
 * Created by sagar on 20/5/20.
 */
@Service
public class SecurityService
{

    private AuthenticationManager authenticationManager;
    private UserDetailsService customUserDetailsService;
    private JwtUtil jwtUtil;

    @Autowired
    public SecurityService(AuthenticationManager authenticationManager,
                           UserDetailsService customUserDetailsService,
                           JwtUtil jwtUtil) {
        this.authenticationManager  = authenticationManager;
        this.customUserDetailsService = customUserDetailsService;
        this.jwtUtil =jwtUtil;
    }

    public LoginResponse authenicateUser(LoginCred loginCred){
        Authentication authentication = new UsernamePasswordAuthenticationToken(loginCred.getUsername(), loginCred.getPassword());
        try{
            authenticationManager.authenticate(authentication);
        }catch (BadCredentialsException e){
            return new LoginResponse("Incorrect Username / password Combination");
        }

        UserDetails userDetails = customUserDetailsService
                .loadUserByUsername(loginCred.getUsername());
        String token = jwtUtil.generateToken(userDetails);

        return new LoginResponse("success",token);
    }
}
