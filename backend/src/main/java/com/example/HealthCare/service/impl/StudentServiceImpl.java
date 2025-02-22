package com.example.HealthCare.service.impl;

import com.example.HealthCare.dto.StudentLocation;
import com.example.HealthCare.exception.ResourceNotFoundException;
import com.example.HealthCare.model.Student;
import com.example.HealthCare.repository.StudentRepository;
import com.example.HealthCare.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public StudentLocation getStudentLocation(Long id) {
        Optional<StudentLocation> studentLocation = studentRepository.findStudentLocationById(id);
        if (!studentLocation.isPresent()) {
            throw new ResourceNotFoundException("Student Location", "id", id.toString());
        }
        return studentLocation.get();
    }

    @Override
    public Student getStudentById(Long id) {
        Optional<Student> student = studentRepository.findById(id);
        if (!student.isPresent()) {
            throw new ResourceNotFoundException("Student", "id", id.toString());
        }
        return student.get();
    }

    @Override
    public Student createNewStudent(Student student) {
        try {
            return studentRepository.save(student);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
