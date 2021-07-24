package com.uoc.sis.dto;


public class ResultDTO {
    private String registrationNo;
    private String examID;
    private String courseID;
    private String courseName;
    private int level;
    private String grade;
    private int credits;

    public ResultDTO(String registrationNo, String examID, String courseID, String courseName, int level, String grade, int credits) {
        this.registrationNo = registrationNo;
        this.examID = examID;
        this.courseID = courseID;
        this.courseName = courseName;
        this.level = level;
        this.grade = grade;
        this.credits = credits;
    }

    public String getRegistrationNo() {
        return registrationNo;
    }

    public void setRegistrationNo(String registrationNo) {
        this.registrationNo = registrationNo;
    }

    public String getExamID() {
        return examID;
    }

    public void setExamID(String examID) {
        this.examID = examID;
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

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public int getCredits() {
        return credits;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }
}

