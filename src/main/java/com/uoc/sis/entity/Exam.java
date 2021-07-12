package com.uoc.sis.entity;

import javax.persistence.*;
import java.util.List;

@Entity
public class Exam {
    @Id
    private String exam_id;
    private String exam_name;
    private String date;
    private String duration;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumns(@JoinColumn(name = "course_id",referencedColumnName = "course_id",insertable = false,updatable = false))
    private Course course;

    @OneToMany
    private List<Result> result_list;

    public Exam() {
    }

    public Exam(String exam_id, String exam_name, String date, String duration, Course course) {
        this.exam_id = exam_id;
        this.exam_name = exam_name;
        this.date = date;
        this.duration = duration;
        this.course = course;
    }

    public Exam(String exam_id, String exam_name, String date, String duration, Course course, List<Result> result_list) {
        this.exam_id = exam_id;
        this.exam_name = exam_name;
        this.date = date;
        this.duration = duration;
        this.course = course;
        this.result_list = result_list;
    }

    public String getExam_id() {
        return exam_id;
    }

    public void setExam_id(String exam_id) {
        this.exam_id = exam_id;
    }

    public String getExam_name() {
        return exam_name;
    }

    public void setExam_name(String exam_name) {
        this.exam_name = exam_name;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public List<Result> getResult_list() {
        return result_list;
    }

    public void setResult_list(List<Result> result_list) {
        this.result_list = result_list;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
}
