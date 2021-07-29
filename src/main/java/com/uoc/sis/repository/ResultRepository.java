package com.uoc.sis.repository;

import com.uoc.sis.entity.Result;
import com.uoc.sis.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface ResultRepository extends JpaRepository<Result,String> {
    @Query(value = "select * from Result where registration_no=:regNo and exam_id=:examID",nativeQuery = true)
    Result getByCombineID(@Param("regNo")String regNo,@Param("examID")String examID);

    @Modifying
    @Transactional
    @Query(value = "delete from Result where registration_no=:regNo and exam_id=:examID",nativeQuery = true)
    void deleteResult(@Param("regNo")String regNo,@Param("examID")String examID);

    @Query(value = "select * from Result where exam_id=:examID",nativeQuery = true)
    List<Result> findAllByExamID(@Param("examID")String examID);

    @Query(value = "select * from Result where registration_no=:registrationNo",nativeQuery = true)
    List<Result> findAllByRegNo(@Param("registrationNo")String registrationNo);

}


