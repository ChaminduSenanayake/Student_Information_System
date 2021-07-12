package com.uoc.sis.dto;

import com.uoc.sis.entity.Faculty;

import javax.persistence.*;

public class DepartmentDTO {
    private String departmentId;
    private String name;
    private Faculty facultyID;

    public DepartmentDTO(String departmentId, String name, Faculty facultyID) {
        this.departmentId = departmentId;
        this.name = name;
        this.facultyID = facultyID;
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

    public Faculty getFacultyID() {
        return facultyID;
    }

    public void setFacultyID(Faculty facultyID) {
        this.facultyID = facultyID;
    }
}
