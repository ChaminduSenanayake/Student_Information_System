package com.uoc.sis.dto;

import com.uoc.sis.entity.Department;
import com.uoc.sis.entity.Registration;

import javax.persistence.*;
import java.util.List;

public class CourseDTO {
    private String courseId;
    private String courseLevel;
    private String courseName;
    private int semester;
    private String departmentID;
    private String DepartmentName;
    private List<Registration> registration_list;

    public CourseDTO(String courseId, String courseLevel, String courseName, int semester, String departmentID, String departmentName) {
        this.courseId = courseId;
        this.courseLevel = courseLevel;
        this.courseName = courseName;
        this.semester = semester;
        this.departmentID = departmentID;
        DepartmentName = departmentName;
    }

    public CourseDTO(String courseId, String courseLevel, String courseName, int semester, String departmentID, String departmentName, List<Registration> registration_list) {
        this.courseId = courseId;
        this.courseLevel = courseLevel;
        this.courseName = courseName;
        this.semester = semester;
        this.departmentID = departmentID;
        DepartmentName = departmentName;
        this.registration_list = registration_list;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getCourseLevel() {
        return courseLevel;
    }

    public void setCourseLevel(String courseLevel) {
        this.courseLevel = courseLevel;
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

    public String getDepartmentID() {
        return departmentID;
    }

    public void setDepartmentID(String departmentID) {
        this.departmentID = departmentID;
    }

    public String getDepartmentName() {
        return DepartmentName;
    }

    public void setDepartmentName(String departmentName) {
        DepartmentName = departmentName;
    }

    public List<Registration> getRegistration_list() {
        return registration_list;
    }

    public void setRegistration_list(List<Registration> registration_list) {
        this.registration_list = registration_list;
    }
}
