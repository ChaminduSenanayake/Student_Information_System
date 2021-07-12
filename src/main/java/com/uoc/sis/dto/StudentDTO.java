package com.uoc.sis.dto;


import java.util.List;

public class StudentDTO {
    private String registrationNo;
    private String indexNo;
    private String fName;
    private String mName;
    private String lName;
    private String address;
    private String email;
    private String telephone;
    private String gender;
    private String level;
    private String parentName;
    private int parentTelNo;
    private String degreeID;
    private String degreeName;
    private String universityID;
    private String universityName;
    private List<ResultDTO> resultList;

    public StudentDTO(String registrationNo, String indexNo, String fName, String mName, String lName, String address, String email, String telephone, String gender, String level, String parentName, int parentTelNo, String degreeID, String degreeName, String universityID, String universityName) {
        this.registrationNo = registrationNo;
        this.indexNo = indexNo;
        this.fName = fName;
        this.mName = mName;
        this.lName = lName;
        this.address = address;
        this.email = email;
        this.telephone = telephone;
        this.gender = gender;
        this.level = level;
        this.parentName = parentName;
        this.parentTelNo = parentTelNo;
        this.degreeID = degreeID;
        this.degreeName = degreeName;
        this.universityID = universityID;
        this.universityName = universityName;
    }

    public StudentDTO(String registrationNo, String indexNo, String fName, String mName, String lName, String address, String email, String telephone, String gender, String level, String parentName, int parentTelNo, String degreeID, String degreeName, String universityID, String universityName, List<ResultDTO> resultList) {
        this.registrationNo = registrationNo;
        this.indexNo = indexNo;
        this.fName = fName;
        this.mName = mName;
        this.lName = lName;
        this.address = address;
        this.email = email;
        this.telephone = telephone;
        this.gender = gender;
        this.level = level;
        this.parentName = parentName;
        this.parentTelNo = parentTelNo;
        this.degreeID = degreeID;
        this.degreeName = degreeName;
        this.universityID = universityID;
        this.universityName = universityName;
        this.resultList = resultList;
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

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
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

    public String getUniversityID() {
        return universityID;
    }

    public void setUniversityID(String universityID) {
        this.universityID = universityID;
    }

    public String getUniversityName() {
        return universityName;
    }

    public void setUniversityName(String universityName) {
        this.universityName = universityName;
    }

    public List<ResultDTO> getResultList() {
        return resultList;
    }

    public void setResultList(List<ResultDTO> resultList) {
        this.resultList = resultList;
    }
}
