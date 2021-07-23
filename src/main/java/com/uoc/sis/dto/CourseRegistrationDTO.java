package com.uoc.sis.dto;

import com.uoc.sis.entity.Course;
import com.uoc.sis.entity.Student;


public class CourseRegistrationDTO {
    private String registrationNo;
    private String courseID;
    private String courseName;
    private String level;
    private int credits;

    public CourseRegistrationDTO(String registrationNo, String courseID, String courseName, String level, int credits) {
        this.registrationNo = registrationNo;
        this.courseID = courseID;
        this.courseName = courseName;
        this.level = level;
        this.credits = credits;
    }

    public String getRegistrationNo() {
        return registrationNo;
    }

    public void setRegistrationNo(String registrationNo) {
        this.registrationNo = registrationNo;
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

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public int getCredits() {
        return credits;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }
}
