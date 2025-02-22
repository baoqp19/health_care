package com.example.HealthCare.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.HealthCare.model.Student;
import com.example.HealthCare.service.StudentService;

import jakarta.validation.Valid;

@RestController
@Validated
@RequestMapping(value = "/api/v1/student", produces = "application/json")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping(value = "/new")
    public ResponseEntity<Student> createNewStudent(@Valid @RequestBody Student student) {
        Student abcUser = this.studentService.createNewStudent(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(abcUser);
    }

    @GetMapping(value = "/{studentId}")
    public ResponseEntity<Student> getStudentById(@PathVariable("id") Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(this.studentService.getStudentById(id));
    }

}
