package com.uoc.sis.dto;


import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class StudentDTO {
    private String registrationNo;
    private String indexNo;
    private String fName;
    private String mName;
    private String lName;
    private String address;
    private String email;
    private int telephone;
    private String NIC;
    private String gender;
    private int level;
    private String parentName;
    private int parentTelNo;
    private String password;
    private String imagePath;
    private String imageName;
    private String degreeID;
    private String degreeName;
    private String unicode;
    private List<ResultDTO> resultList;

    public StudentDTO(String registrationNo, String indexNo, String fName, String mName, String lName, String address, String email, int telephone, String NIC, String gender, int level, String parentName, int parentTelNo, String password, String imagePath, String imageName, String degreeID, String degreeName, String unicode) {
        this.registrationNo = registrationNo;
        this.indexNo = indexNo;
        this.fName = fName;
        this.mName = mName;
        this.lName = lName;
        this.address = address;
        this.email = email;
        this.telephone = telephone;
        this.NIC = NIC;
        this.gender = gender;
        this.level = level;
        this.parentName = parentName;
        this.parentTelNo = parentTelNo;
        this.password = password;
        this.imagePath = imagePath;
        this.imageName = imageName;
        this.degreeID = degreeID;
        this.degreeName = degreeName;
        this.unicode = unicode;
    }

    public String getRegistrationNo() {
        return registrationNo;
    }

    public void setRegistrationNo(String registrationNo) {
        this.registrationNo = registrationNo;
    }

    public String getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(String indexNo) {
        this.indexNo = indexNo;
    }

    public String getfName() {
        return fName;
    }

    public void setfName(String fName) {
        this.fName = fName;
    }

    public String getmName() {
        return mName;
    }

    public void setmName(String mName) {
        this.mName = mName;
    }

    public String getlName() {
        return lName;
    }

    public void setlName(String lName) {
        this.lName = lName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getTelephone() {
        return telephone;
    }

    public void setTelephone(int telephone) {
        this.telephone = telephone;
    }

    public String getNIC() {
        return NIC;
    }

    public void setNIC(String NIC) {
        this.NIC = NIC;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public String getParentName() {
        return parentName;
    }

    public void setParentName(String parentName) {
        this.parentName = parentName;
    }

    public int getParentTelNo() {
        return parentTelNo;
    }

    public void setParentTelNo(int parentTelNo) {
        this.parentTelNo = parentTelNo;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public String getUnicode() {
        return unicode;
    }

    public void setUnicode(String unicode) {
        this.unicode = unicode;
    }

    public List<ResultDTO> getResultList() {
        return resultList;
    }

    public void setResultList(List<ResultDTO> resultList) {
        this.resultList = resultList;
    }
}
