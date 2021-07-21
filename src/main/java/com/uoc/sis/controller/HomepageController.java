package com.uoc.sis.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/homepage")
public class HomepageController {

    @Autowired
    private LoginController loginController;

    @GetMapping("/home")
    public ModelAndView loadIndexPage(){
        return new ModelAndView("index.html") ;
    }

    @GetMapping("/about")
    public ModelAndView loadAboutPage(){
        return new ModelAndView("about.html") ;
    }

    @GetMapping("/contact")
    public ModelAndView loadContactPage(){
        return new ModelAndView("contact.html") ;
    }

    @GetMapping("/institutes")
    public ModelAndView loadInstitutePage(){
        return new ModelAndView("institutes.html") ;
    }

}
