package com.uoc.sis.entity;

import javax.persistence.*;
import java.util.List;

@Entity
public class Exam {
    @Id
    private String exam_id;
    private String exam_name;
    private String date;
    private String startTime;
    private String endTime;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumns(@JoinColumn(name = "course_id",referencedColumnName = "course_id"))
    private Course course;

    @OneToMany
    private List<Result> result_list;

    public Exam() {
    }

    public Exam(String exam_id, String exam_name, String date, String startTime, String endTime, Course course) {
        this.exam_id = exam_id;
        this.exam_name = exam_name;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.course = course;
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

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public List<Result> getResult_list() {
        return result_list;
    }

    public void setResult_list(List<Result> result_list) {
        this.result_list = result_list;
    }
}
