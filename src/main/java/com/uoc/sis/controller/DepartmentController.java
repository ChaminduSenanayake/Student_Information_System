package com.uoc.sis.controller;


import com.uoc.sis.dto.DepartmentDTO;
import com.uoc.sis.dto.ExamDTO;
import com.uoc.sis.service.DepartmentService;
import com.uoc.sis.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/api/v1/department")
public class DepartmentController {
    @Autowired
    private DepartmentService departmentService;

    @GetMapping("/")
    public ModelAndView loadPage(HttpServletRequest request){
        HttpSession session = request.getSession();
        Object user = request.getSession().getAttribute("user_session");
        if(session!=null && user!=null){
            ModelAndView model=new ModelAndView("/facultyAdmin/department.html");
            model.addObject("userName",user.toString());
            return model;
        }else{
            ModelAndView model=new ModelAndView("login.html");
            model.addObject("sessionExpired","Session Expired...! Please sign in again");
            return model;
        }

    }

    @PostMapping("/save")
    public boolean addDepartment(@RequestBody DepartmentDTO departmentDTO){
        return departmentService.addDepartment(departmentDTO);
    }
    @PutMapping("/update")
    public boolean updateDepartment(@RequestBody DepartmentDTO departmentDTO){
        return departmentService.updateDepartment(departmentDTO);
    }
    @DeleteMapping("/delete/{departmentID}")
    public boolean deleteDepartment(@PathVariable("departmentID") String departmentID){
        return departmentService.deleteDepartment(departmentID);
    }
    @GetMapping("/getAll")
    public List<DepartmentDTO> getAll(){
        return departmentService.getAll();
    }

    @GetMapping("/getDepartment/{departmentID}")
    public DepartmentDTO getByID(@PathVariable("departmentID") String departmentID){
        return departmentService.getDepartmentByID(departmentID);
    }


    @GetMapping("/getNewID")
    @ResponseBody
    public String getNewID() {
        return departmentService.getNewID();
    }
}
