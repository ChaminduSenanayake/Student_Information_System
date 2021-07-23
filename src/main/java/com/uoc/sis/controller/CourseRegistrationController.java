package com.uoc.sis.controller;

import com.uoc.sis.dto.CourseDTO;
import com.uoc.sis.dto.CourseRegistrationDTO;
import com.uoc.sis.dto.ResultDTO;
import com.uoc.sis.service.CourseRegistrationService;
import com.uoc.sis.service.CourseService;
import com.uoc.sis.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/api/v1/studentCourse")
public class CourseRegistrationController {
    @Autowired
    private CourseRegistrationService registrationService;


    @GetMapping("/")
    public ModelAndView loadPage(HttpServletRequest request) {
        HttpSession session = request.getSession();
        Object user = request.getSession().getAttribute("user_session");
        if (session != null && user != null) {
            ModelAndView model = new ModelAndView("/Student/course.html");
            model.addObject("userName", user.toString());
            return model;
        } else {
            ModelAndView model = new ModelAndView("login.html");
            model.addObject("sessionExpired", "Session Expired...! Please sign in again");
            return model;
        }

    }

    @PostMapping("/save")
    public boolean addRegistration(@RequestBody CourseRegistrationDTO courseRegistrationDTO) {
        return registrationService.addCourseRegistration(courseRegistrationDTO);
    }

//    @PutMapping("/update")
//    public boolean updateRegistration(@RequestBody CourseRegistrationDTO courseRegistrationDTO) {
//        return registrationService.updateCourseRegistration(courseRegistrationDTO);
//    }

    @DeleteMapping("/delete/{registrationNo}/{courseID}")
    public boolean deleteRegistration(@PathVariable("registrationNo") String registrationNo, @PathVariable("courseID") String courseID) {
        return registrationService.deleteCourseRegistration(registrationNo, courseID);
    }

    @DeleteMapping("/getCourses/{registrationNo}")
    public List<CourseRegistrationDTO> getCoursesByRegNO(@PathVariable("registrationNo") String registrationNo) {
        return registrationService.getCoursesByRegNO(registrationNo);
    }

}
