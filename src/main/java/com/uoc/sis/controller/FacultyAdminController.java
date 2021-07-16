package com.uoc.sis.controller;

import com.uoc.sis.dto.DegreeDTO;
import com.uoc.sis.dto.FacultyAdminDTO;
import com.uoc.sis.repository.FacultyAdminRepository;
import com.uoc.sis.service.FacultyAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/api/v1/facultyAdmin")
public class FacultyAdminController {
    @Autowired
    private FacultyAdminService adminService;

    @GetMapping("/")
    public ModelAndView loadPage(HttpServletRequest request){
        HttpSession session = request.getSession();
        Object user = request.getSession().getAttribute("user_session");
        if(session!=null && user!=null){
            ModelAndView model=new ModelAndView("/MainAdmin/facultyAdmin.html");
            model.addObject("userName",user.toString());
            return model;
        }else{
            ModelAndView model=new ModelAndView("login.html");
            model.addObject("sessionExpired","Session Expired...! Please sign in again");
            return model;
        }

    }

    @PostMapping("/save")
    public boolean addFacultyAdmin(@RequestBody FacultyAdminDTO dto){
        return adminService.addFacultyAdmin(dto);
    }
    @PutMapping ("/update")
    public boolean updateFacultyAdmin(@RequestBody FacultyAdminDTO dto){
        return adminService.updateFacultyAdmin(dto);
    }
    @DeleteMapping("/delete/{facultyAdminID}")
    public boolean deleteFacultyAdmin(@PathVariable("facultyAdminID") String facultyAdminID){
        return adminService.deleteFacultyAdmin(facultyAdminID);
    }
    @GetMapping("/getAll")
    public List<FacultyAdminDTO> getAll(){
        return adminService.getAll();
    }

    @GetMapping("/getFacultyAdmin/{facultyAdminID}")
    public FacultyAdminDTO getByID(@PathVariable("facultyAdminID") String facultyAdminID){
        return adminService.getFacultyAdminByID(facultyAdminID);
    }

    @GetMapping("/getByUserName/{userName}")
    public FacultyAdminDTO getByUserName(@PathVariable("userName") String userName){
        FacultyAdminDTO dto=adminService.getFacultyAdminByUserName(userName);
        dto.setPassword(null);
        return dto;
    }

    @GetMapping("/getNewID")
    @ResponseBody
    public String getNewID() {
        String x=adminService.getNewID();
        System.out.println("-----------"+x);
        return x;
    }

}
