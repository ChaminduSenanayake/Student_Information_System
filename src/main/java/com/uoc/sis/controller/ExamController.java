package com.uoc.sis.controller;

import com.uoc.sis.dto.ExamDTO;
import com.uoc.sis.dto.FacultyDTO;
import com.uoc.sis.service.ExamService;
import com.uoc.sis.service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/api/v1/exam")
public class ExamController {

    @Autowired
    private ExamService examService;

    @GetMapping("/")
    public ModelAndView loadPage(HttpServletRequest request) {
        HttpSession session = request.getSession();
        Object user = request.getSession().getAttribute("user_session");
        if (session != null && user != null) {
            ModelAndView model = new ModelAndView("/facultyAdmin/exam.html");
            model.addObject("userName", user.toString());
            return model;
        } else {
            ModelAndView model = new ModelAndView("login.html");
            model.addObject("sessionExpired", "Session Expired...! Please sign in again");
            return model;
        }

    }

    @PostMapping("/save")
    public boolean addExam(@RequestBody ExamDTO examDTO) {
        return examService.addExam(examDTO);
    }

    @PutMapping("/update")
    public boolean updateExam(@RequestBody ExamDTO examDTO) {
        return examService.updateExam(examDTO);
    }

    @DeleteMapping("/delete/{examID}")
    public boolean deleteExam(@PathVariable("examID") String examID) {
        return examService.deleteExam(examID);
    }

    @GetMapping("/getAll")
    public List<ExamDTO> getAll() {
        return examService.getAll();
    }

    @GetMapping("/getExam/{examID}")
    public ExamDTO getByID(@PathVariable("examID") String examID) {
        return examService.getExam(examID);
    }


    @GetMapping("/getNewID")
    @ResponseBody
    public String getNewID() {
        return examService.getNewID();
    }
}
