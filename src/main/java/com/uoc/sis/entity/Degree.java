package com.uoc.sis.entity;

import javax.persistence.*;

@Entity
public class Degree {
    @Id
    private String degree_id;
    private String degree_name;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumns(@JoinColumn(name = "faculty_id",referencedColumnName = "faculty_id",insertable = false,updatable = false))
    private Faculty faculty;

    public Degree() {
    }

    public Degree(String degree_id, String degree_name, Faculty faculty) {
        this.degree_id = degree_id;
        this.degree_name = degree_name;
        this.faculty = faculty;
    }

    public String getDegree_id() {
        return degree_id;
    }

    public void setDegree_id(String degree_id) {
        this.degree_id = degree_id;
    }

    public String getDegree_name() {
        return degree_name;
    }

    public void setDegree_name(String degree_name) {
        this.degree_name = degree_name;
    }

    public Faculty getFaculty() {
        return faculty;
    }

    public void setFaculty(Faculty faculty) {
        this.faculty = faculty;
    }
}
