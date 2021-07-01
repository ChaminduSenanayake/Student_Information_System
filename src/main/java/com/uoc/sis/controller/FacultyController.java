package com.uoc.sis.controller;

import com.uoc.sis.dto.FacultyDTO;
import com.uoc.sis.dto.UniversityDTO;
import com.uoc.sis.service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("api/v1/faculty")
public class FacultyController {

    @Autowired
    private FacultyService facultyService;
    @GetMapping("/")
    public ModelAndView loadPage(HttpServletRequest request){
        HttpSession session = request.getSession();
        Object user = request.getSession().getAttribute("user_session");
        if(session!=null && user!=null){
            ModelAndView model=new ModelAndView("/MainAdmin/faculty.html");
            model.addObject("userName",user.toString());
            return model;
        }else{
            ModelAndView model=new ModelAndView("login.html");
            model.addObject("sessionExpired","Session Expired...! Please sign in again");
            return model;
        }

    }

    @PostMapping("/save")
    public boolean addFaculty(@RequestBody FacultyDTO facultyDTO){
        return facultyService.addFaculty(facultyDTO);
    }
    @PutMapping ("/update")
    public boolean updateFaculty(@RequestBody FacultyDTO facultyDTO){
        return facultyService.updateFaculty(facultyDTO);
    }
    @DeleteMapping("/delete/{facultyID}")
    public boolean deleteFaculty(@PathVariable("facultyID") String facultyID){
        return facultyService.deleteFaculty(facultyID);
    }
    @GetMapping("/getAll")
    public List<FacultyDTO> getAll(){
        return facultyService.getAllFaculties();
    }
    @GetMapping("/getFaculty/{facultyID}")
    public FacultyDTO getByID(@PathVariable("facultyID") String facultyID){
        return facultyService.getFacultyByID(facultyID);
    }

    @GetMapping("/getNewID")
    @ResponseBody
    public String getNewID() {
        return facultyService.getNewID();
    }
}
