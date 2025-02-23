package com.example.HealthCare.controller;

import com.example.HealthCare.enums.Role;
import com.example.HealthCare.request.auth.LoginRequest;
import com.example.HealthCare.response.ApiResponse;
import com.example.HealthCare.response.AuthenticationResponse;
import com.example.HealthCare.service.AuthenticationService;
import com.example.HealthCare.request.auth.RegisterRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

  private final AuthenticationService service;

  @PostMapping("/register")
  public ResponseEntity<ApiResponse<AuthenticationResponse>> register(
      @Valid @RequestBody RegisterRequest request) {
    request.setRole(Role.USER);
    AuthenticationResponse authResponse = service.register(request);
    ApiResponse<AuthenticationResponse> response = new ApiResponse<>(
        HttpStatus.OK.value(),
        "Login successful",
        authResponse);
    return new ResponseEntity<>(response, HttpStatus.CREATED);
  }

  @PostMapping("/login")
  public ResponseEntity<ApiResponse<AuthenticationResponse>> authenticate(
      @Valid @RequestBody LoginRequest request) {
    AuthenticationResponse authResponse = service.authenticate(request);
    ApiResponse<AuthenticationResponse> response = new ApiResponse<>(
        HttpStatus.OK.value(),
        "Login successful",
        authResponse);
    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  @PostMapping("/refresh-token")
  public ResponseEntity<ApiResponse<?>> refreshToken(
      HttpServletRequest request,
      HttpServletResponse response) throws IOException {
    return service.refreshToken(request, response);
  }

  @GetMapping("/me")
  public ResponseEntity<ApiResponse<?>> me(
      HttpServletRequest request,
      HttpServletResponse response) throws IOException {
    return service.getMe(request, response);
  }

}
