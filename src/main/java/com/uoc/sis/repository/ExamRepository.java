package com.uoc.sis.repository;

import com.uoc.sis.entity.Course;
import com.uoc.sis.entity.Degree;
import com.uoc.sis.entity.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamRepository extends JpaRepository<Exam,String> {
    @Query(value = "select * from Exam order by exam_id desc limit 1;",nativeQuery = true)
    Exam findLastData();

    @Query(value = "select * from Exam where course_id in (select course_id from course,department where course.department_id=department.department_id and faculty_id=:facultyID)",nativeQuery = true)
    List<Exam> findAllByFacultyID(@Param("facultyID") String facultyID);
}
