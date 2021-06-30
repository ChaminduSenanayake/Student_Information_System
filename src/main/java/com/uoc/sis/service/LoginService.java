package com.uoc.sis.service;

import com.uoc.sis.dto.LoginDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Service
public class LoginService {
    public LoginDTO login(LoginDTO loginDTO) {
        String mainAdminUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/v1/")
                .path("/university/")
                .toUriString();
        String userType = "Admin";
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
            default:
                loginDTO.setUserName(null);
                loginDTO.setPassword(null);
                return loginDTO;
        }

    }

}
