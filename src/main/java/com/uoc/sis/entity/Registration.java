package com.uoc.sis.entity;

import javax.persistence.*;

@Entity
public class Registration {
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumns(@JoinColumn(name = "registration_no",referencedColumnName = "registration_no",insertable = false,updatable = false))
    private Student student;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumns(@JoinColumn(name = "course_id",referencedColumnName = "course_id",insertable = false,updatable = false))
    private Course course;

    @EmbeddedId
    private Registration_pk registration_pk;

    public Registration() {
    }

    public Registration(Student student, Course course) {
        this.student = student;
        this.course = course;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Registration_pk getRegistration_pk() {
        return registration_pk;
    }

    public void setRegistration_pk(Registration_pk registration_pk) {
        this.registration_pk = registration_pk;
    }
}
