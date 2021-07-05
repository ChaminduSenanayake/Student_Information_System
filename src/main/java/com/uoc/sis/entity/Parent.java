package com.uoc.sis.entity;

import javax.persistence.*;

@Entity
public class Parent {
    @Id
    private String parent_id;
    private String parent_name;
    private int parent_tel_no;


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumns(@JoinColumn(name = "registration_no",referencedColumnName = "registration_no",insertable = false,updatable = false))
    private Student student;

    public Parent() {
    }

    public Parent(String parent_id, String parent_name, int parent_tel_no, Student student) {
        this.parent_id = parent_id;
        this.parent_name = parent_name;
        this.parent_tel_no = parent_tel_no;
        this.student = student;
    }

    public String getParent_id() {
        return parent_id;
    }

    public void setParent_id(String parent_id) {
        this.parent_id = parent_id;
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

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }
}
