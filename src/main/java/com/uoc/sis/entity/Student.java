package com.uoc.sis.entity;

import javax.persistence.*;
import java.util.List;

@Entity
public class Student {
    @Id
    private String registration_no;
    private String index_no;
    private String f_name;
    private String m_name;
    private String l_name;
    private String address;
    private String email;
    private String telephone;
    private String NIC;
    private String gender;
    private String level;
    private String parent_name;
    private int parent_tel_no;
    private String password;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumns(@JoinColumn(name = "degree_id", referencedColumnName = "degree_id"))
    private Degree degree;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumns(@JoinColumn(name = "uni_code", referencedColumnName = "uni_code"))
    private University university;

    @OneToMany
    private List<Result> result_list;

    public Student() {
    }

    public Student(String registration_no, String index_no, String f_name, String m_name, String l_name, String address, String email, String telephone, String NIC, String gender, String level, String parent_name, int parent_tel_no, String password, Degree degree, University university) {
        this.registration_no = registration_no;
        this.index_no = index_no;
        this.f_name = f_name;
        this.m_name = m_name;
        this.l_name = l_name;
        this.address = address;
        this.email = email;
        this.telephone = telephone;
        this.NIC = NIC;
        this.gender = gender;
        this.level = level;
        this.parent_name = parent_name;
        this.parent_tel_no = parent_tel_no;
        this.password = password;
        this.degree = degree;
        this.university = university;
    }

    public String getRegistration_no() {
        return registration_no;
    }

    public void setRegistration_no(String registration_no) {
        this.registration_no = registration_no;
    }

    public String getIndex_no() {
        return index_no;
    }

    public void setIndex_no(String index_no) {
        this.index_no = index_no;
    }

    public String getF_name() {
        return f_name;
    }

    public void setF_name(String f_name) {
        this.f_name = f_name;
    }

    public String getM_name() {
        return m_name;
    }

    public void setM_name(String m_name) {
        this.m_name = m_name;
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

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getParent_name() {
        return parent_name;
    }

    public void setParent_name(String parent_name) {
        this.parent_name = parent_name;
    }

    public int getParent_tel_no() {
        return parent_tel_no;
    }

    public void setParent_tel_no(int parent_tel_no) {
        this.parent_tel_no = parent_tel_no;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Degree getDegree() {
        return degree;
    }

    public void setDegree(Degree degree) {
        this.degree = degree;
    }

    public University getUniversity() {
        return university;
    }

    public void setUniversity(University university) {
        this.university = university;
    }

    public List<Result> getResult_list() {
        return result_list;
    }

    public void setResult_list(List<Result> result_list) {
        this.result_list = result_list;
    }
}

