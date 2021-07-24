package com.uoc.sis.controller;

import com.uoc.sis.dto.ExamDTO;
import com.uoc.sis.service.ExamService;
import com.uoc.sis.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/api/v1/studentExam")
public class StudentExamController {
        @Autowired
        private ExamService examService;

        @GetMapping("/")
        public ModelAndView loadPage(HttpServletRequest request){
            HttpSession session = request.getSession();
            Object user = request.getSession().getAttribute("user_session");
            if(session!=null && user!=null){
                ModelAndView model=new ModelAndView("/Student/exam.html");
                model.addObject("userName",user.toString());
                return model;
            }else{
                ModelAndView model=new ModelAndView("login.html");
                model.addObject("sessionExpired","Session Expired...! Please sign in again");
                return model;
            }

        }

    @GetMapping("/getExamsByRegNo/{regNo}")
    public List<ExamDTO> getAllByFacultyID(@PathVariable("regNo") String regNo) {
        return examService.getExamsByRegNo(regNo);
    }

}
