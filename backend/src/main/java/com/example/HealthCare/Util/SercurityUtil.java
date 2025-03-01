package com.example.HealthCare.Util;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.stereotype.Service;

import com.example.HealthCare.request.auth.ResTokenLogin;
import com.nimbusds.jose.util.Base64;

@Service
public class SercurityUtil {

    private final JwtEncoder jwtEncoder;

    public static final MacAlgorithm JW_ALGORITHM = MacAlgorithm.HS512;

    public SercurityUtil(JwtEncoder jwtEncoder) {
        this.jwtEncoder = jwtEncoder;
    }

    @Value("${EXPIRATION_ACCESS_TOKEN}")
    private long jwtExpiretion;

    @Value("${SECRET_KEY}")
    private String jwtKey;

    @Value("${EXPIRATION_ACCESS_TOKEN}")
    private long accessTokenExpiration;

    @Value("${EXPIRATION_REFRESH_TOKEN}")
    private long refreshTokenExpiration;

    // đăng nhập thì thông tin user lưu trong token nên 2 static để giải mã token
    // lấy ra email
    public static Optional<String> getCurrentUserLogin() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        return Optional.ofNullable(extractPrincipal(securityContext.getAuthentication()));
    }

    private static String extractPrincipal(Authentication authentication) {
        if (authentication == null) {
            return null;
        } else if (authentication.getPrincipal() instanceof UserDetails springSecurityUser) {
            return springSecurityUser.getUsername();
        } else if (authentication.getPrincipal() instanceof Jwt jwt) {
            return jwt.getSubject();
        } else if (authentication.getPrincipal() instanceof String s) {
            return s;
        }
        return null;
    }

    // lấy token của người dùng hiện tại
    public static Optional<String> getCurrentUserJWT() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        return Optional.ofNullable(securityContext.getAuthentication())
                .filter(authentication -> authentication.getCredentials() instanceof String)
                .map(authentication -> (String) authentication.getCredentials());
    }

    // chuyển key sang base64
    private SecretKey getSecretKey() {
        byte[] keyBytes = Base64.from(jwtKey).decode();
        return new SecretKeySpec(keyBytes, 0, keyBytes.length,
                JW_ALGORITHM.getName());
    }

    public Jwt checkValidRefreshToken(String token) {
        NimbusJwtDecoder jwtDecoder = NimbusJwtDecoder.withSecretKey(
                getSecretKey()).macAlgorithm(SercurityUtil.JW_ALGORITHM).build();
        try {
            return jwtDecoder.decode(token);
        } catch (Exception e) {
            System.out.println(">>> Refresh Token error: " + e.getMessage());
            throw e;
        }
    }

    public String createAccessToken(String email, ResTokenLogin dto) {

        // lấy thời gian ban đầu token
        Instant now = Instant.now();
        Instant validity = now.plus(this.accessTokenExpiration, ChronoUnit.SECONDS);

        // hardcode permission (for testing)
        List<String> listAuthority = new ArrayList<String>();

        listAuthority.add("ROLE_USER_CREATE");
        listAuthority.add("ROLE_USER_UPDATE");

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuedAt(now)
                .expiresAt(validity)
                .subject(email)
                .claim("user", dto) // thêm bao nhiêu cái .claim cũng dc
                .claim("permission", listAuthority)
                .build();

        JwsHeader jwsHeader = JwsHeader.with(JW_ALGORITHM).build();
        return this.jwtEncoder.encode(JwtEncoderParameters.from(jwsHeader, claims)).getTokenValue();
    }

    public String createRefreshToken(String email, ResTokenLogin dto) {
        Instant now = Instant.now();
        Instant validity = now.plus(this.refreshTokenExpiration, ChronoUnit.SECONDS);
        

        ResTokenLogin.UserLogin userToken = new ResTokenLogin.UserLogin();
            userToken.setId(dto.getUser().getId());
            userToken.setEmail(dto.getUser().getEmail());
            userToken.setFirstName(dto.getUser().getFirstName());
            userToken.setEmail(dto.getUser().getLastName());

        
        // @formatter:off
        JwtClaimsSet claims = JwtClaimsSet.builder()
            .issuedAt(now)
            .expiresAt(validity)
            .subject(email)
            .claim("user", dto)
            .build();

        JwsHeader jwsHeader = JwsHeader.with(JW_ALGORITHM).build();
        return this.jwtEncoder.encode(JwtEncoderParameters.from(jwsHeader, claims)).getTokenValue();

    }

    
}
