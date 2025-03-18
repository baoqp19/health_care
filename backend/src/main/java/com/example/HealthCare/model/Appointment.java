package com.example.HealthCare.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="appointments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int appointmentID;

    @Column(name = "time", nullable = false)
    private Date time;

    @Column(name = "doctor")
    private String doctor;

    @Column(name = "location")
    private String location;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

}