package com.uoc.sis.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Faculty {
    @Id
    private String faculty_id;
    private String faculty_name;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumns(@JoinColumn(name = "uni_code",referencedColumnName = "uni_code",insertable = false,updatable = false))
    private University university;

    public Faculty() {
    }

    public Faculty(String faculty_id, String faculty_name, University university) {
        this.faculty_id = faculty_id;
        this.faculty_name = faculty_name;
        this.university = university;
    }

    public String getFaculty_id() {
        return faculty_id;
    }

    public void setFaculty_id(String faculty_id) {
        this.faculty_id = faculty_id;
    }

    public String getFaculty_name() {
        return faculty_name;
    }

    public void setFaculty_name(String faculty_name) {
        this.faculty_name = faculty_name;
    }

    public University getUniversity() {
        return university;
    }

    public void setUniversity(University university) {
        this.university = university;
    }
}
