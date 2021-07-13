package com.uoc.sis.repository;

import com.uoc.sis.entity.Result;
import com.uoc.sis.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultRepository extends JpaRepository<Result,String> {
    @Query(value = "select * from Result where registration_no=:regNo and exam_id=:examID;",nativeQuery = true)
    Result getByCombineID(@Param("regNo")String regNo,@Param("examID")String examID);

    @Query(value = "delete from Result where registration_no=:regNo and exam_id=:examID;",nativeQuery = true)
    Result deleteResult(@Param("regNo")String regNo,@Param("examID")String examID);

    @Query(value = "select * from Result,Exam where Result.exam_id=Exam.exam_id and Exam.course_id=:courseID and Exam.date=:examDate;",nativeQuery = true)
    List<Result> getResultByCourseIDandDate(@Param("courseID")String courseID, @Param("examDate")String examDate);

    @Query(value = "select * from Result Result.registration_no=:registrationNo;",nativeQuery = true)
    List<Result> getResultByCourseIDandDate(@Param("registrationNo")String registrationNo);
}
