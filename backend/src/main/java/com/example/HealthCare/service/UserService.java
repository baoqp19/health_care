package com.example.HealthCare.service;

import com.example.HealthCare.request.users.ChangePasswordRequest;
import java.security.Principal;

public interface UserService {
    public void changePassword(ChangePasswordRequest request, Principal connectedUser);
}
