package com.uoc.sis.dto;

public class FacultyDTO {
    private String facultyID;
    private String facultyName;
    private String uniCode;
    private String uniName;

    public FacultyDTO(String facultyID, String facultyName, String uniCode, String uniName) {
        this.facultyID = facultyID;
        this.facultyName = facultyName;
        this.uniCode = uniCode;
        this.uniName = uniName;
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

    public String getUniCode() {
        return uniCode;
    }

    public void setUniCode(String uniCode) {
        this.uniCode = uniCode;
    }

    public String getUniName() {
        return uniName;
    }

    public void setUniName(String uniName) {
        this.uniName = uniName;
    }
}
