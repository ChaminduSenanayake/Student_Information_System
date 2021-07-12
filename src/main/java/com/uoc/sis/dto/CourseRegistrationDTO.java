package com.uoc.sis.dto;

import com.uoc.sis.entity.Course;
import com.uoc.sis.entity.Student;


public class CourseRegistrationDTO {
    private Student studentID;
    private Course courseID;

    public CourseRegistrationDTO(Student studentID, Course courseID) {
        this.studentID = studentID;
        this.courseID = courseID;
    }

    public Student getStudentID() {
        return studentID;
    }

    public void setStudentID(Student studentID) {
        this.studentID = studentID;
    }

    public Course getCourseID() {
        return courseID;
    }

    public void setCourseID(Course courseID) {
        this.courseID = courseID;
    }
}
