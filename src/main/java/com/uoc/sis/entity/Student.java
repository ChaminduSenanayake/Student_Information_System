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
    private String gender;
    private String level;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumns(@JoinColumn(name = "degree_id",referencedColumnName = "degree_id",insertable = false,updatable = false))
    private Degree degree;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumns(@JoinColumn(name = "uni_code",referencedColumnName = "uni_code",insertable = false,updatable = false))
    private University university;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Result> result_list;

    public Student() {
    }

    public Student(String registration_no, String index_no, String f_name, String m_name, String l_name, String address, String email, String telephone, String gender, String level, Degree degree, University university) {
        this.registration_no = registration_no;
        this.index_no = index_no;
        this.f_name = f_name;
        this.m_name = m_name;
        this.l_name = l_name;
        this.address = address;
        this.email = email;
        this.telephone = telephone;
        this.gender = gender;
        this.level = level;
        this.degree = degree;
        this.university = university;
    }

    public Student(String registration_no, String index_no, String f_name, String m_name, String l_name, String address, String email, String telephone, String gender, String level, Degree degree, University university, List<Result> result_list) {
        this.registration_no = registration_no;
        this.index_no = index_no;
        this.f_name = f_name;
        this.m_name = m_name;
        this.l_name = l_name;
        this.address = address;
        this.email = email;
        this.telephone = telephone;
        this.gender = gender;
        this.level = level;
        this.degree = degree;
        this.university = university;
        this.result_list = result_list;
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
