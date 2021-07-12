package com.uoc.sis.dto;


public class ResultDTO {
    private String studentID;
    private String examID;
    private String courceID;
    private String courceName;
    private String grade;

    public ResultDTO(String studentID, String examID, String courceID, String courceName, String grade) {
        this.studentID = studentID;
        this.examID = examID;
        this.courceID = courceID;
        this.courceName = courceName;
        this.grade = grade;
    }

    public String getStudentID() {
        return studentID;
    }

    public void setStudentID(String studentID) {
        this.studentID = studentID;
    }

    public String getExamID() {
        return examID;
    }

    public void setExamID(String examID) {
        this.examID = examID;
    }

    public String getCourceID() {
        return courceID;
    }

    public void setCourceID(String courceID) {
        this.courceID = courceID;
    }

    public String getCourceName() {
        return courceName;
    }

    public void setCourceName(String courceName) {
        this.courceName = courceName;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }
}
