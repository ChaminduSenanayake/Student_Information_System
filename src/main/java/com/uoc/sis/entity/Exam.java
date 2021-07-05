package com.uoc.sis.entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class Exam {
    @Id
    private String exam_id;
    private String exam_name;
    private String date;
    private String duration;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Result> result_list;

    public Exam() {
    }

    public Exam(String exam_id, String exam_name, String date, String duration) {
        this.exam_id = exam_id;
        this.exam_name = exam_name;
        this.date = date;
        this.duration = duration;
    }

    public Exam(String exam_id, String exam_name, String date, String duration, List<Result> result_list) {
        this.exam_id = exam_id;
        this.exam_name = exam_name;
        this.date = date;
        this.duration = duration;
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
}
