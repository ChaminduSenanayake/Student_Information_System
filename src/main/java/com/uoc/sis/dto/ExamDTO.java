package com.uoc.sis.dto;

import java.util.List;

public class ExamDTO {
    private String examId;
    private String examName;
    private String date;
    private String duration;
    private String courseID;
    private String courseName;
    private List<ResultDTO> resultList;


    public ExamDTO(String examId, String examName, String date, String duration, String courseID, String courseName) {
        this.examId = examId;
        this.examName = examName;
        this.date = date;
        this.duration = duration;
        this.courseID = courseID;
        this.courseName = courseName;
    }

    public ExamDTO(String examId, String examName, String date, String duration, String courseID, String courseName, List<ResultDTO> resultList) {
        this.examId = examId;
        this.examName = examName;
        this.date = date;
        this.duration = duration;
        this.courseID = courseID;
        this.courseName = courseName;
        this.resultList = resultList;
    }

    public String getExamId() {
        return examId;
    }

    public void setExamId(String examId) {
        this.examId = examId;
    }

    public String getExamName() {
        return examName;
    }

    public void setExamName(String examName) {
        this.examName = examName;
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

    public String getCourseID() {
        return courseID;
    }

    public void setCourseID(String courseID) {
        this.courseID = courseID;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public List<ResultDTO> getResultList() {
        return resultList;
    }

    public void setResultList(List<ResultDTO> resultList) {
        this.resultList = resultList;
    }
}
