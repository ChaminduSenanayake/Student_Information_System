package com.uoc.sis.service;

import com.uoc.sis.dto.FacultyAdminDTO;
import com.uoc.sis.dto.LoginDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Service
public class LoginService {

    @Autowired
    private FacultyAdminService adminService;

    public LoginDTO login(LoginDTO loginDTO) {
        String mainAdminUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/v1/")
                .path("/university/")
                .toUriString();

        String facultyAdminUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/v1/")
                .path("/student/")
                .toUriString();

        String userName=loginDTO.getUserName();
        System.out.println("---------------"+userName);
        String userType = "Admin";
        if(!userName.equals("Admin")){
//            ((userName.split("@"))[0].split("."))[0]
            userType="fac";
        }
        System.out.println("---------------"+userType);
        switch (userType) {
            case "Admin":
                if (loginDTO.getUserName().equals("Admin") && loginDTO.getPassword().equals("1234")) {
                    loginDTO.setUrl(mainAdminUrl);
                } else if (loginDTO.getUserName().equals("Admin") && !loginDTO.getPassword().equals("1234")) {
                    loginDTO.setPassword(null);
                } else {
                    loginDTO.setUserName(null);
                    loginDTO.setPassword(null);
                }
                return loginDTO;
            case "fac":
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
            default:
                loginDTO.setUserName(null);
                loginDTO.setPassword(null);
                return loginDTO;
        }

    }

}
