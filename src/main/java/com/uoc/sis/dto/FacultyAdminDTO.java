package com.uoc.sis.dto;

import com.uoc.sis.entity.Faculty;

import javax.persistence.CascadeType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;

public class FacultyAdminDTO {
    private String facultyAdminID;
    private String fName;
    private String lName;
    private String address;
    private int telephone;
    private String email;
    private String userName;
    private String password;
    private String facultyID;

    public FacultyAdminDTO(String facultyAdminID, String fName, String lName, String address, int telephone, String email, String userName, String password, String facultyID) {
        this.facultyAdminID = facultyAdminID;
        this.fName = fName;
        this.lName = lName;
        this.address = address;
        this.telephone = telephone;
        this.email = email;
        this.userName = userName;
        this.password = password;
        this.facultyID = facultyID;
    }

    public String getFacultyAdminID() {
        return facultyAdminID;
    }

    public void setFacultyAdminID(String facultyAdminID) {
        this.facultyAdminID = facultyAdminID;
    }

    public String getfName() {
        return fName;
    }

    public void setfName(String fName) {
        this.fName = fName;
    }

    public String getlName() {
        return lName;
    }

    public void setlName(String lName) {
        this.lName = lName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getTelephone() {
        return telephone;
    }

    public void setTelephone(int telephone) {
        this.telephone = telephone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFacultyID() {
        return facultyID;
    }

    public void setFacultyID(String facultyID) {
        this.facultyID = facultyID;
    }
}
