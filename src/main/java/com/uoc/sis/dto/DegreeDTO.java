package com.uoc.sis.dto;

public class DegreeDTO {
    private String degreeID;
    private String degreeName;
    private String facultyID;
    private String facultyName;

    public DegreeDTO(String degreeID, String degreeName, String facultyID, String facultyName) {
        this.degreeID = degreeID;
        this.degreeName = degreeName;
        this.facultyID = facultyID;
        this.facultyName = facultyName;
    }

    public String getFacultyName() {
        return facultyName;
    }

    public void setFacultyName(String facultyName) {
        this.facultyName = facultyName;
    }

    public String getDegreeID() {
        return degreeID;
    }

    public void setDegreeID(String degreeID) {
        this.degreeID = degreeID;
    }

    public String getDegreeName() {
        return degreeName;
    }

    public void setDegreeName(String degreeName) {
        this.degreeName = degreeName;
    }

    public String getFacultyID() {
        return facultyID;
    }

    public void setFacultyID(String facultyID) {
        this.facultyID = facultyID;
    }
}
