package com.uoc.sis.dto;

public class FacultyDTO {
    private String facultyID;
    private String facultyName;
    private String uniCode;

    public FacultyDTO(String facultyID, String facultyName, String uniCode) {
        this.facultyID = facultyID;
        this.facultyName = facultyName;
        this.uniCode = uniCode;
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

}
