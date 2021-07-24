package com.uoc.sis.dto;


public class ResultDTO {
    private String registrationNo;
    private String examID;
    private String courceID;
    private String courceName;
    private int level;
    private String grade;

    public ResultDTO(String registrationNo, String examID, String courceID, String courceName, int level, String grade) {
        this.registrationNo = registrationNo;
        this.examID = examID;
        this.courceID = courceID;
        this.courceName = courceName;
        this.level = level;
        this.grade = grade;
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
}

