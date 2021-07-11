package com.uoc.sis.repository;

import com.uoc.sis.entity.Degree;
import com.uoc.sis.entity.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ExamRepository extends JpaRepository<Exam,String> {
    @Query(value = "select * from Exam order by exam_id desc limit 1;",nativeQuery = true)
    Exam findLastData();
}
