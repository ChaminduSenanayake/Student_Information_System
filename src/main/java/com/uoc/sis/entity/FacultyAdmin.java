package com.uoc.sis.entity;

import javax.persistence.*;

@Entity
public class FacultyAdmin {
    @Id
    private String facultyAdmin_id;
    private String f_name;
    private String l_name;
    private String address;
    private int telephone;
    private String email;
    private String userName;
    private String password;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumns(@JoinColumn(name = "faculty_id",referencedColumnName = "faculty_id",insertable = false,updatable = false))
    private Faculty faculty;

    public FacultyAdmin() {
    }

    public FacultyAdmin(String facultyAdmin_id, String f_name, String l_name, String address, int telephone, String email, String userName, String password, Faculty faculty) {
        this.facultyAdmin_id = facultyAdmin_id;
        this.f_name = f_name;
        this.l_name = l_name;
        this.address = address;
        this.telephone = telephone;
        this.email = email;
        this.userName = userName;
        this.password = password;
        this.faculty = faculty;
    }

    public String getFacultyAdmin_id() {
        return facultyAdmin_id;
    }

    public void setFacultyAdmin_id(String facultyAdmin_id) {
        this.facultyAdmin_id = facultyAdmin_id;
    }

    public String getF_name() {
        return f_name;
    }

    public void setF_name(String f_name) {
        this.f_name = f_name;
    }

    public String getL_name() {
        return l_name;
    }

    public void setL_name(String l_name) {
        this.l_name = l_name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getTelephone() {
        return telephone;
    }

    public void setTelephone(int telephone) {
        this.telephone = telephone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Faculty getFaculty() {
        return faculty;
    }

    public void setFaculty(Faculty faculty) {
        this.faculty = faculty;
    }
}
