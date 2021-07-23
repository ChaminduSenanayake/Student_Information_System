package com.uoc.sis.service;

import com.uoc.sis.dto.CourseDTO;
import com.uoc.sis.dto.CourseRegistrationDTO;
import com.uoc.sis.entity.*;
import com.uoc.sis.repository.CourseRegistrationRepository;
import com.uoc.sis.repository.CourseRepository;
import com.uoc.sis.repository.DepartmentRepository;
import com.uoc.sis.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;
@Service
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

//    public boolean updateCourseRegistration(CourseRegistrationDTO dto) {
//        try {
//            Registration objRegistration=courseRegistrationRepository.getByCombineID(dto.getRegistrationNo(),dto.getCourseID());
//            if (objRegistration != null) {
//                Course course=courseRepository.getById(dto.getCourseID());
//                Student student=studentRepository.getById(dto.getRegistrationNo());
//                Registration registration=new Registration(student,course);
//                courseRegistrationRepository.save(registration);
//                return true;
//            } else {
//                return false;
//            }
//        } catch (EntityNotFoundException e) {
//            e.printStackTrace();
//        }
//        return false;
//    }

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
    public List<CourseRegistrationDTO> getCoursesByRegNO(String registrationNo) {
        List<Registration> all = courseRegistrationRepository.getByRegistrationNo(registrationNo);
        ArrayList<CourseRegistrationDTO> dtos = new ArrayList<>();
        for (Registration registration : all) {
            Course course=registration.getCourse();
            Student student=registration.getStudent();
            if(course!=null&student!=null) {
                dtos.add(new CourseRegistrationDTO(student.getRegistration_no(),course.getCourse_id(),course.getCourse_name(),course.getCourse_level(),course.getCredits()));
            }
        }
        return dtos;
    }



}
