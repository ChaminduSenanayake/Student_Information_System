package com.uoc.sis.controller;

import com.uoc.sis.dto.FacultyDTO;
import com.uoc.sis.dto.ResultDTO;
import com.uoc.sis.service.FacultyService;
import com.uoc.sis.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/api/v1/result")
public class ResultController {
    @Autowired
    private ResultService resultService;

    @GetMapping("/")
    public ModelAndView loadPage(HttpServletRequest request){
        HttpSession session = request.getSession();
        Object user = request.getSession().getAttribute("user_session");
        if(session!=null && user!=null){
            ModelAndView model=new ModelAndView("/FacultyAdmin/result.html");
            model.addObject("userName",user.toString());
            return model;
        }else{
            ModelAndView model=new ModelAndView("login.html");
            model.addObject("sessionExpired","Session Expired...! Please sign in again");
            return model;
        }

    }

    @PostMapping("/save")
    public boolean addResult(@RequestBody ResultDTO resultDTO){
        return resultService.addResult(resultDTO);
    }

    @PutMapping ("/update")
    public boolean updateResult(@RequestBody ResultDTO resultDTO){
        return resultService.updateResult(resultDTO);
    }
    @DeleteMapping("/delete/{registrationNo}/{examID}")
    public boolean deleteResult(@PathVariable("registrationNo") String registrationNo,@PathVariable("examID") String examID){
        return resultService.deleteResult(registrationNo,examID);
    }
    @GetMapping("/getAll")
    public List<ResultDTO> getAll(){
        return resultService.getAll();
    }

    @GetMapping("/getAllByExamID/{examID}")
    public List<ResultDTO> getAllByExamID(@PathVariable("examID") String examID){
        return resultService.getAllByExamID(examID);
    }

    @GetMapping("/getAllByRegNo/{registrationNo}")
    public List<ResultDTO> getAllByRegNo(@PathVariable("registrationNo") String registrationNo){
        return resultService.getAllByRegNo(registrationNo);
    }

    @GetMapping("/getResult/{registrationNo}/{examID}")
    public ResultDTO getResult(@PathVariable("registrationNo") String registrationNo,@PathVariable("examID") String examID){
        return resultService.getResult(registrationNo,examID);
    }

}
