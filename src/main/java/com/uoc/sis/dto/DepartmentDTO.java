package com.uoc.sis.dto;

import com.uoc.sis.entity.Faculty;

import javax.persistence.*;

public class DepartmentDTO {
    private String departmentID;
    private String name;
    private String facultyID;
    private String facultyName;

    public DepartmentDTO(String departmentID, String name, String facultyID, String facultyName) {
        this.departmentID = departmentID;
        this.name = name;
        this.facultyID = facultyID;
        this.facultyName = facultyName;
    }

    public String getDepartmentID() {
        return departmentID;
    }

    public void setDepartmentID(String departmentID) {
        this.departmentID = departmentID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFacultyID() {
        return facultyID;
    }

    public void setFacultyID(String facultyID) {
        this.facultyID = facultyID;
    }

    public String getFacultyName() {
        return facultyName;
    }

    public void setFacultyName(String facultyName) {
        this.facultyName = facultyName;
    }
}
