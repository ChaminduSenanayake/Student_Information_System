package com.uoc.sis.dto;

import com.uoc.sis.entity.Department;
import com.uoc.sis.entity.Registration;

import javax.persistence.*;
import java.util.List;

public class CourseDTO {
    private String courseID;
    private String courseName;
    private int semester;
    private int courseLevel;
    private int credits;
    private String departmentID;
    private String departmentName;
    private List<Registration> registration_list;

    public CourseDTO(String courseID, String courseName, int semester, int courseLevel, int credits, String departmentID, String departmentName) {
        this.courseID = courseID;
        this.courseName = courseName;
        this.semester = semester;
        this.courseLevel = courseLevel;
        this.credits = credits;
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

    public int getCourseLevel() {
        return courseLevel;
    }

    public void setCourseLevel(int courseLevel) {
        this.courseLevel = courseLevel;
    }

    public int getCredits() {
        return credits;
    }

    public void setCredits(int credits) {
        this.credits = credits;
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
