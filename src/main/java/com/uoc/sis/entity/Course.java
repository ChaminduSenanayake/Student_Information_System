package com.uoc.sis.entity;

import javax.persistence.*;
import java.util.List;

@Entity
public class Course {
    @Id
    private String course_id;
    private String course_level;
    private String course_name;
    private int semester;
    private int credits;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumns(@JoinColumn(name = "department_id", referencedColumnName = "department_id"))
    private Department department;

    @OneToMany
    private List<Registration> registration_list;

    public Course() {
    }

    public Course(String course_id, String course_level, String course_name, int semester, int credits, Department department) {
        this.course_id = course_id;
        this.course_level = course_level;
        this.course_name = course_name;
        this.semester = semester;
        this.credits = credits;
        this.department = department;
    }

    public String getCourse_id() {
        return course_id;
    }

    public void setCourse_id(String course_id) {
        this.course_id = course_id;
    }

    public String getCourse_level() {
        return course_level;
    }

    public void setCourse_level(String course_level) {
        this.course_level = course_level;
    }

    public String getCourse_name() {
        return course_name;
    }

    public void setCourse_name(String course_name) {
        this.course_name = course_name;
    }

    public int getSemester() {
        return semester;
    }

    public void setSemester(int semester) {
        this.semester = semester;
    }

    public int getCredits() {
        return credits;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public List<Registration> getRegistration_list() {
        return registration_list;
    }

    public void setRegistration_list(List<Registration> registration_list) {
        this.registration_list = registration_list;
    }
}
