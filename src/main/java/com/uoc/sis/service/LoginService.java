package com.uoc.sis.service;

import com.uoc.sis.dto.FacultyAdminDTO;
import com.uoc.sis.dto.LoginDTO;
import com.uoc.sis.dto.StudentDTO;
import com.uoc.sis.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Service
public class LoginService {

    @Autowired
    private FacultyAdminService adminService;

    @Autowired
    private StudentService studentService;

    public LoginDTO login(LoginDTO loginDTO) {
        String mainAdminUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/v1/")
                .path("/university/")
                .toUriString();

        String facultyAdminUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/v1/")
                .path("/student/")
                .toUriString();

        String studentUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/v1/")
                .path("/studentProfile/")
                .toUriString();

        String userName=loginDTO.getUserName();

        String userType = "mainAdmin";
        if(userName.equals("Admin")){
            userType="mainAdmin";
        }else{
            userType = (userName.split("@")[1]).split("\\.")[0];
        }
        switch (userType) {
            case "mainAdmin":
                if (loginDTO.getUserName().equals("Admin") && loginDTO.getPassword().equals("1234")) {
                    loginDTO.setUrl(mainAdminUrl);
                } else if (loginDTO.getUserName().equals("Admin") && !loginDTO.getPassword().equals("1234")) {
                    loginDTO.setPassword(null);
                } else {
                    loginDTO.setUserName(null);
                    loginDTO.setPassword(null);
                }
                return loginDTO;
            case "admin":
                FacultyAdminDTO dto=adminService.getFacultyAdminByUserName(loginDTO.getUserName());
                if (dto!=null && loginDTO.getPassword().equals(dto.getPassword())) {
                    loginDTO.setUrl(facultyAdminUrl);
                } else if (dto!=null &&  !loginDTO.getPassword().equals(dto.getPassword())) {
                    loginDTO.setPassword(null);
                } else {
                    loginDTO.setUserName(null);
                    loginDTO.setPassword(null);
                }
                return loginDTO;
            case "stu":
                String regNo=userName.split("@")[0];
                StudentDTO studentDTO=studentService.getStudentByRegNo(regNo);
                if (studentDTO!=null && loginDTO.getPassword().equals(studentDTO.getPassword())) {
                    loginDTO.setUrl(studentUrl);
                } else if (studentDTO!=null &&  !loginDTO.getPassword().equals(studentDTO.getPassword())) {
                    loginDTO.setPassword(null);
                } else {
                    loginDTO.setUserName(null);
                    loginDTO.setPassword(null);
                }
                return loginDTO;
            default:
                loginDTO.setUserName(null);
                loginDTO.setPassword(null);
                return loginDTO;
        }

    }

}
