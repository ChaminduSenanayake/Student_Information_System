package com.uoc.sis.controller;

import com.uoc.sis.dto.DegreeDTO;
import com.uoc.sis.dto.FacultyDTO;
import com.uoc.sis.entity.Degree;
import com.uoc.sis.service.DegreeService;
import com.uoc.sis.service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/api/v1/degree")
public class DegreeController {

    @Autowired
    private DegreeService degreeService;

    @GetMapping("/")
    public ModelAndView loadPage(HttpServletRequest request){
        HttpSession session = request.getSession();
        Object user = request.getSession().getAttribute("user_session");
        if(session!=null && user!=null){
            ModelAndView model=new ModelAndView("/FacultyAdmin/degree.html");
            model.addObject("userName",user.toString());
            return model;
        }else{
            ModelAndView model=new ModelAndView("login.html");
            model.addObject("sessionExpired","Session Expired...! Please sign in again");
            return model;
        }

    }

    @PostMapping("/save")
    public boolean addDegree(@RequestBody DegreeDTO dto){

        return degreeService.addDegree(dto);
    }

    @PutMapping ("/update")
    public boolean updateDegree(@RequestBody DegreeDTO dto){
        System.out.println(dto.getDegreeID()+"====="+dto.getDegreeName()+"==="+dto.getFacultyID()+"====="+dto.getFacultyName());
        return degreeService.updateDegree(dto);
    }
    @DeleteMapping("/delete/{degreeID}")
    public boolean deleteFaculty(@PathVariable("degreeID") String degreeID){
        return degreeService.deleteDegree(degreeID);
    }
    @GetMapping("/getAll")
    public List<DegreeDTO> getAll(){
        return degreeService.getAll();
    }
    @GetMapping("/getDegree/{degreeID}")
    public DegreeDTO getByID(@PathVariable("degreeID") String degreeID){
        return degreeService.getDegreeByID(degreeID);
    }

    @GetMapping("/getNewID")
    @ResponseBody
    public String getNewID() {
        return degreeService.getNewID();
    }
}
