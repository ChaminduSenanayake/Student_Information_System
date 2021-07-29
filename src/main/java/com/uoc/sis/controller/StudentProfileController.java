package com.uoc.sis.controller;

import com.uoc.sis.dto.StudentDTO;
import com.uoc.sis.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/v1/studentProfile")
public class StudentProfileController {
    @Autowired
    private StudentService studentService;

    @GetMapping("/")
    public ModelAndView loadPage(HttpServletRequest request){
        HttpSession session = request.getSession();
        Object user = request.getSession().getAttribute("user_session");
        if(session!=null && user!=null){
            ModelAndView model=new ModelAndView("/Student/profile.html");
            model.addObject("userName",user.toString());
            return model;
        }else{
            ModelAndView model=new ModelAndView("login.html");
            model.addObject("sessionExpired","Session Expired...! Please sign in again");
            return model;
        }

    }

    @PutMapping("/update")
    public boolean updatePassword(@RequestBody StudentDTO studentDTO){
        return studentService.updatePassword(studentDTO);
    }
}