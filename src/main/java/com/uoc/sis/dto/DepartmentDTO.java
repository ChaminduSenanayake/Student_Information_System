package com.uoc.sis.dto;

import com.uoc.sis.entity.Faculty;

import javax.persistence.*;

public class DepartmentDTO {
    private String departmentId;
    private String name;
    private String facultyID;
    private String facultyName;

    public DepartmentDTO(String departmentId, String name, String facultyID, String facultyName) {
        this.departmentId = departmentId;
        this.name = name;
        this.facultyID = facultyID;
        this.facultyName = facultyName;
    }

    public String getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(String departmentId) {
        this.departmentId = departmentId;
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
