package com.uoc.sis.repository;

import com.uoc.sis.entity.Course;
import com.uoc.sis.entity.Degree;
import com.uoc.sis.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course,String> {
    @Query(value = "select * from Course order by course_id desc limit 1;",nativeQuery = true)
    Course findLastData();

    @Query(value = "select * from Course where department_id in (select department_id from department where faculty_id=:facultyID)",nativeQuery = true)
    List<Course> findAllByFacultyID(@Param("facultyID") String facultyID);

    @Query(value = "select * from Course where course_id in (select course_id from Exam where exam_id=:examID)",nativeQuery = true)
    Course getByExamId(@Param("examID") String examID);


}
