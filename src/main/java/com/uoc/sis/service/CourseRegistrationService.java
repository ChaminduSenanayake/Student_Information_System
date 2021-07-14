package com.uoc.sis.service;

import com.uoc.sis.dto.CourseDTO;
import com.uoc.sis.dto.CourseRegistrationDTO;
import com.uoc.sis.entity.Course;
import com.uoc.sis.entity.Department;
import com.uoc.sis.entity.Registration;
import com.uoc.sis.entity.Student;
import com.uoc.sis.repository.CourseRegistrationRepository;
import com.uoc.sis.repository.CourseRepository;
import com.uoc.sis.repository.DepartmentRepository;
import com.uoc.sis.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityNotFoundException;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;

public class CourseRegistrationService {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CourseRegistrationRepository courseRegistrationRepository;

    public boolean addCourseRegistration(CourseRegistrationDTO dto) {
        Course course=courseRepository.getById(dto.getCourseID());
        Student student=studentRepository.getById(dto.getRegistrationNo());
        Registration registration=new Registration(student,course);
        courseRegistrationRepository.save(registration);
        Registration registration1=courseRegistrationRepository.getByCombineID(dto.getRegistrationNo(),dto.getCourseID());
        if (registration1!=null) {
            return true;
        } else {
            return false;
        }
    }

    public boolean updateCourseRegistration(CourseRegistrationDTO dto) {
        try {
            Registration objRegistration=courseRegistrationRepository.getByCombineID(dto.getRegistrationNo(),dto.getCourseID());
            if (objRegistration != null) {
                Course course=courseRepository.getById(dto.getCourseID());
                Student student=studentRepository.getById(dto.getRegistrationNo());
                Registration registration=new Registration(student,course);
                courseRegistrationRepository.save(registration);
                return true;
            } else {
                return false;
            }
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean deleteCourseRegistration(String registrationNo,String courseID) {
        Registration objRegistration=courseRegistrationRepository.getByCombineID(registrationNo,courseID);
        if (objRegistration!=null) {
            courseRegistrationRepository.deleteRegistration(registrationNo,courseID);
            return true;
        } else {
            return false;
        }
    }

//    public List<CourseDTO> getAll() {
//        List<Course> all = courseRepository.findAll();
//        ArrayList<CourseDTO> dtos = new ArrayList<>();
//        for (Course course : all) {
//            Department department=course.getDepartment();
//            if(department!=null) {
//                dtos.add(new CourseDTO(course.getCourse_id(),course.getCourse_level(),course.getCourse_name(),course.getSemester(),department.getDepartment_id(),department.getName()));
//            }
//        }
//        return dtos;
//    }
//
//
//    public CourseDTO getCourseByID(String courseID) {
//        try {
//            Course course = courseRepository.getById(courseID);
//            Department department=course.getDepartment();
//            return new CourseDTO(course.getCourse_id(),course.getCourse_level(),course.getCourse_name(),course.getSemester(),department.getDepartment_id(),department.getName());
//        } catch (EntityNotFoundException e) {
//            e.printStackTrace();
//        }
//        return null;
//    }



}
