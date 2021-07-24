package com.uoc.sis.entity;

import javax.persistence.*;

@Entity
public class Result {
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumns(@JoinColumn(name = "registration_no",referencedColumnName = "registration_no",insertable = false,updatable = false))
    private Student student;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumns(@JoinColumn(name = "exam_id",referencedColumnName = "exam_id",insertable = false,updatable = false))
    private Exam exam;

    @EmbeddedId
    private Result_pk result_pk;

    private String grade;

    public Result() {
    }

    public Result(Student student, Exam exam, Result_pk result_pk, String grade) {
        this.student = student;
        this.exam = exam;
        this.result_pk = result_pk;
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
