package com.uoc.sis.repository;

import com.uoc.sis.entity.Degree;
import com.uoc.sis.entity.Registration;
import com.uoc.sis.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRegistrationRepository extends JpaRepository<Registration,String> {
    @Query(value = "select * from Registration where registration_no=:regNo and course_id=:courseID;",nativeQuery = true)
    Registration getByCombineID(@Param("regNo")String regNo, @Param("courseID")String courseID);

    @Query(value = "delete from Registration where registration_no=:regNo and course_id=:courseID;",nativeQuery = true)
    Registration deleteRegistration(@Param("regNo")String regNo,@Param("courseID")String courseID);
}
