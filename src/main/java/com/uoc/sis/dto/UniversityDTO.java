package com.uoc.sis.dto;

public class UniversityDTO {
    private String uniCode;
    private String uniName;
    private String imagePath;
    private String imageName;

    public UniversityDTO() {
    }

    public UniversityDTO(String uniCode, String uniName) {
        this.uniCode = uniCode;
        this.uniName = uniName;
    }

    public UniversityDTO(String uniCode, String uniName, String imagePath, String imageName) {
        this.uniCode = uniCode;
        this.uniName = uniName;
        this.imagePath = imagePath;
        this.imageName = imageName;
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

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }
}
