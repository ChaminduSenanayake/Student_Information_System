package com.uoc.sis.controller;

import com.uoc.sis.dto.FacultyDTO;
import com.uoc.sis.entity.Student;
import com.uoc.sis.service.FacultyService;
import com.uoc.sis.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/api/v1/student")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @GetMapping("/")
    public ModelAndView loadPage(HttpServletRequest request){
        HttpSession session = request.getSession();
        Object user = request.getSession().getAttribute("user_session");
        if(session!=null && user!=null){
            ModelAndView model=new ModelAndView("/FacultyAdmin/student.html");
            model.addObject("userName",user.toString());
            return model;
        }else{
            ModelAndView model=new ModelAndView("login.html");
            model.addObject("sessionExpired","Session Expired...! Please sign in again");
            return model;
        }

    }
//
//    @PostMapping("/save")
//    public boolean addFaculty(@RequestBody FacultyDTO facultyDTO){
//        return facultyService.addFaculty(facultyDTO);
//    }
//    @PutMapping ("/update")
//    public boolean updateFaculty(@RequestBody FacultyDTO facultyDTO){
//        return facultyService.updateFaculty(facultyDTO);
//    }
//    @DeleteMapping("/delete/{facultyID}")
//    public boolean deleteFaculty(@PathVariable("facultyID") String facultyID){
//        return facultyService.deleteFaculty(facultyID);
//    }
//    @GetMapping("/getAll")
//    public List<FacultyDTO> getAll(){
//        return facultyService.getAllFaculties();
//    }
//
//    @GetMapping("/getFaculty/{facultyID}")
//    public FacultyDTO getByID(@PathVariable("facultyID") String facultyID){
//        return facultyService.getFacultyByID(facultyID);
//    }
//    @GetMapping("/getAllByUniCode/{uniCode}")
//    public List<FacultyDTO> getByUniCode(@PathVariable("uniCode") String uniCode){
//        return facultyService.getAllByUniCode(uniCode);
//    }
//
//    @GetMapping("/getNewID")
//    @ResponseBody
//    public String getNewID() {
//        return facultyService.getNewID();
//    }
}
