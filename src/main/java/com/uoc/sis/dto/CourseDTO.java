package com.uoc.sis.dto;

import com.uoc.sis.entity.Department;
import com.uoc.sis.entity.Registration;

import javax.persistence.*;
import java.util.List;

public class CourseDTO {
    private String courseID;
    private String courseName;
    private int semester;
    private String courseLevel;
    private String departmentID;
    private String departmentName;
    private List<Registration> registration_list;

    public CourseDTO(String courseID, String courseName, int semester, String courseLevel, String departmentID, String departmentName) {
        this.courseID = courseID;
        this.courseName = courseName;
        this.semester = semester;
        this.courseLevel = courseLevel;
        this.departmentID = departmentID;
        this.departmentName = departmentName;
    }

    public String getCourseID() {
        return courseID;
    }

    public void setCourseID(String courseID) {
        this.courseID = courseID;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public int getSemester() {
        return semester;
    }

    public void setSemester(int semester) {
        this.semester = semester;
    }

    public String getCourseLevel() {
        return courseLevel;
    }

    public void setCourseLevel(String courseLevel) {
        this.courseLevel = courseLevel;
    }

    public String getDepartmentID() {
        return departmentID;
    }

    public void setDepartmentID(String departmentID) {
        this.departmentID = departmentID;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public List<Registration> getRegistration_list() {
        return registration_list;
    }

    public void setRegistration_list(List<Registration> registration_list) {
        this.registration_list = registration_list;
    }
}
