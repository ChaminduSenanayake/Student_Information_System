package com.uoc.sis.dto;

public class DegreeDTO {
    private String degreeID;
    private String degreeName;
    private String facultyID;

    public DegreeDTO(String degreeID, String degreeName, String facultyID) {
        this.degreeID = degreeID;
        this.degreeName = degreeName;
        this.facultyID = facultyID;
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
