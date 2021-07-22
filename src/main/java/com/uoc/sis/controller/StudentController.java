package com.uoc.sis.controller;

import com.uoc.sis.dto.FacultyDTO;
import com.uoc.sis.dto.StudentDTO;
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
    @PostMapping("/save")
    public boolean addStudent(@RequestBody StudentDTO studentDTO){
        return studentService.addStudent(studentDTO);
    }
    @PutMapping ("/update")
    public boolean updateStudent(@RequestBody StudentDTO studentDTO){
        return studentService.updateStudent(studentDTO);
    }
    @DeleteMapping("/delete/{registrationNo}")
    public boolean deleteFaculty(@PathVariable("registrationNo") String registrationNo){
        return studentService.deleteStudent(registrationNo);
    }
    @GetMapping("/getAll")
    public List<StudentDTO> getAll(){
        return studentService.getAll();
    }

    @GetMapping("/getAllByFacultyID/{facultyID}")
    public List<StudentDTO> getAllByFaculty(@PathVariable("facultyID") String facultyID){
        return studentService.getAllByFaculty(facultyID);
    }


    @GetMapping("/getStudent/{registrationNo}")
    public StudentDTO getByID(@PathVariable("registrationNo") String registrationNo){
        StudentDTO studentDTO=studentService.getStudentByRegNo(registrationNo);
        studentDTO.setPassword(null);
        return studentDTO;
    }

    @GetMapping("/getNewRegistrationNo/{year}")
    @ResponseBody
    public String getNewRegNo(@PathVariable("year") String year) {
        return studentService.getNewRegistrationNo(year);
    }
    @GetMapping("/getNewIndex/{uniCode}")
    @ResponseBody
    public String getNewIndex(@PathVariable("uniCode") String uniCode) {
        return studentService.getNewIndexNo(uniCode);
    }
}
