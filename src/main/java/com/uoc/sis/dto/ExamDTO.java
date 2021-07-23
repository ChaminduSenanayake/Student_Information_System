package com.uoc.sis.dto;

import java.util.List;

public class ExamDTO {
    private String examID;
    private String examName;
    private String date;
    private String startTime;
    private String endTime;
    private String courseID;
    private String courseName;
    private List<ResultDTO> resultList;

    public ExamDTO(String examID, String examName, String date, String startTime, String endTime, String courseID, String courseName) {
        this.examID = examID;
        this.examName = examName;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.courseID = courseID;
        this.courseName = courseName;
    }

    public String getExamID() {
        return examID;
    }

    public void setExamID(String examID) {
        this.examID = examID;
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
