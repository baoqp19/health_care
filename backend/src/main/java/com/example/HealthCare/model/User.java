package com.example.HealthCare.model;

import com.example.HealthCare.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "user")
public class User {

  @Id
  @GeneratedValue
  private Integer id;

  private String firstname;

  private String lastname;

  @Column(unique = true)
  private String email;
  private String password;

  @Enumerated(EnumType.STRING)
  private Role role;

  @Column(columnDefinition = "MEDIUMTEXT")
  private String refreshToken;

  @OneToMany(mappedBy = "user")
  private List<Token> tokens;

}
