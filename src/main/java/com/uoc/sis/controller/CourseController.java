package com.uoc.sis.controller;

import com.uoc.sis.dto.CourseDTO;
import com.uoc.sis.dto.DepartmentDTO;
import com.uoc.sis.service.CourseService;
import com.uoc.sis.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/api/v1/course")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @GetMapping("/")
    public ModelAndView loadPage(HttpServletRequest request){
        HttpSession session = request.getSession();
        Object user = request.getSession().getAttribute("user_session");
        if(session!=null && user!=null){
            ModelAndView model=new ModelAndView("/facultyAdmin/course.html");
            model.addObject("userName",user.toString());
            return model;
        }else{
            ModelAndView model=new ModelAndView("login.html");
            model.addObject("sessionExpired","Session Expired...! Please sign in again");
            return model;
        }

    }

    @PostMapping("/save")
    public boolean addCourse(@RequestBody CourseDTO courseDTO){
        return courseService.addCourse(courseDTO);
    }

    @PutMapping("/update")
    public boolean updateCourse(@RequestBody CourseDTO courseDTO){
        return courseService.updateCourse(courseDTO);
    }

    @DeleteMapping("/delete/{courseID}")
    public boolean deleteCourse(@PathVariable("courseID") String courseID){
        return courseService.deleteCourse(courseID);
    }

    @GetMapping("/getAll")
    public List<CourseDTO> getAll(){
        return courseService.getAll();
    }

    @GetMapping("/getCourseByID/{courseID}")
    public CourseDTO getByID(@PathVariable("courseID") String courseID){
        return courseService.getCourseByID(courseID);
    }

    @GetMapping("/getNewID")
    @ResponseBody
    public String getNewID() {
        return courseService.getNewID();
    }
}
