package com.uoc.sis.controller;

import com.sun.org.apache.xpath.internal.operations.Mod;
import com.uoc.sis.dto.LoginDTO;
import com.uoc.sis.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/login")
public class LoginController {
    @Autowired
    private LoginService loginService;

    @GetMapping("/")
    public ModelAndView loadPage(HttpServletRequest request){
        logOut(request);
        return new ModelAndView("login.html") ;
    }
    @PostMapping("/validate")
    public LoginDTO validateUser(@RequestBody LoginDTO loginDTO, HttpServletRequest request){
        LoginDTO dto=loginService.login(loginDTO);
        if(dto.getUrl()!=null){
            request.getSession().setAttribute("user_session", dto.getUserName());
        }
        return dto;
    }
    @GetMapping("/logout")
    public ModelAndView logOut(HttpServletRequest request) {
        //invalidate the session , this will clear the data from configured database (Mysql/redis/hazelcast)
        request.getSession().invalidate();
        return new ModelAndView("uni-selector.html");
    }
}
