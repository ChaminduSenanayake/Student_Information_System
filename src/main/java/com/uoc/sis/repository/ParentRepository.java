package com.uoc.sis.repository;

import com.uoc.sis.entity.Degree;
import com.uoc.sis.entity.Parent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ParentRepository extends JpaRepository<Parent,String> {
    @Query(value = "select * from Parent order by parent_id desc limit 1;",nativeQuery = true)
    Parent findLastData();

    @Query(value = "select * from Parent where registration_no:regNo;",nativeQuery = true)
    Parent getByStudentRegNo(@Param("regNo")String regNo);
}
