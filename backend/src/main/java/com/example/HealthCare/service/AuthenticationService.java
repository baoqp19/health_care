package com.example.HealthCare.service;

import com.example.HealthCare.request.auth.RegisterRequest;
import com.example.HealthCare.request.auth.LoginRequest;
import com.example.HealthCare.model.User;
import com.example.HealthCare.response.ApiResponse;
import com.example.HealthCare.response.AuthenticationResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

import java.io.IOException;

public interface AuthenticationService {

  AuthenticationResponse register(RegisterRequest request);

  AuthenticationResponse authenticate(LoginRequest request);

  void saveUserToken(User user, String jwtToken);

  void revokeAllUserTokens(User user);

  ResponseEntity<ApiResponse<?>> refreshToken(
          HttpServletRequest request,
          HttpServletResponse response
  ) throws IOException;

  ResponseEntity<ApiResponse<?>> getMe(
          HttpServletRequest request,
          HttpServletResponse response
  ) throws IOException;

  public User getCurrentUser();
}
