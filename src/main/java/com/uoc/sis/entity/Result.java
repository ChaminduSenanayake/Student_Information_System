package com.uoc.sis.entity;

import javax.persistence.*;

@Entity
public class Result {
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumns(@JoinColumn(name = "registration_no",referencedColumnName = "registration_no",insertable = false,updatable = false))
    private Student student;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumns(@JoinColumn(name = "exam_id",referencedColumnName = "exam_id",insertable = false,updatable = false))
    private Exam exam;

    private String grade;

    public Result() {
    }

    public Result(Student student, Exam exam, String grade) {
        this.student = student;
        this.exam = exam;
        this.grade = grade;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Exam getExam() {
        return exam;
    }

    public void setExam(Exam exam) {
        this.exam = exam;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }
}
