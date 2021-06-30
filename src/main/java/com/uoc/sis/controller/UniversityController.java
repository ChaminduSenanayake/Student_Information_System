package com.uoc.sis.controller;

import com.uoc.sis.dto.UniversityDTO;
import com.uoc.sis.dto.UploadFileResponseDTO;
import com.uoc.sis.service.FileStorageService;
import com.uoc.sis.service.UniversityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.awt.image.AreaAveragingScaleFilter;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/university")
public class UniversityController {
    @Autowired
    private UniversityService universityService;

    @GetMapping("/")
    public ModelAndView loadPage(HttpServletRequest request){
        HttpSession session = request.getSession();
        Object user = request.getSession().getAttribute("user_session");
        if(session!=null && user!=null){
            ModelAndView model=new ModelAndView("/MainAdmin/university.html");
            model.addObject("userName",user.toString());
            return model;
        }else{
            ModelAndView model=new ModelAndView("login.html");
            model.addObject("sessionExpired","Session Expired...! Please sign in again");
            return model;
        }

    }

    @PostMapping("/save")
    public boolean addUniversity(@RequestParam("uniCode") String uniCode,@RequestParam("uniName") String uniName,@RequestParam("uniImage") MultipartFile uniImage){
        UniversityDTO dto=new UniversityDTO(uniCode,uniName);
        return universityService.addUniversity(dto,uniImage);
    }

    @GetMapping("/getAll")
    public List<UniversityDTO> getAllUniversities(){
        return universityService.getAllUniversities();
    }

    @DeleteMapping("/delete/{uniCode}")
    public boolean deleteUniversity(@PathVariable("uniCode") String uniCode){
        return universityService.deleteUniversity(uniCode);
    }
    @GetMapping("/getUniversity/{uniCode}")
    public UniversityDTO getUniByCode(@PathVariable("uniCode") String uniCode){
        return universityService.getUniByCode(uniCode);
    }
    @PutMapping ("/update")
    public boolean updateUniversity(@RequestParam("uniCode") String uniCode,@RequestParam("uniName") String uniName){
        UniversityDTO dto=new UniversityDTO(uniCode,uniName);
        return universityService.updateUniversity(dto);
    }
    @PutMapping ("/updateWithImage")
    public boolean updateUniversityWithImage(@RequestParam("uniCode") String uniCode,@RequestParam("uniName") String uniName,@RequestParam("uniImage") MultipartFile uniImage){
        UniversityDTO dto=new UniversityDTO(uniCode,uniName);
        return universityService.updateUniversityWithImage(dto,uniImage);
    }
    @GetMapping("/getNewID")
    @ResponseBody
    public String getNewID() {
        return universityService.getNewID();
    }

//    @PostMapping("/save")
//    public boolean addUniversity(@RequestBody UniversityDTO dto){
//        return universityService.save(dto);
//    }
}
