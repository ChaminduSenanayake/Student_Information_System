package com.uoc.sis.repository;

import com.uoc.sis.entity.University;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UniversityRepository extends JpaRepository<University,String> {
    @Query(value = "select * from university order by uni_code desc limit 1;",nativeQuery = true)
    University findLastData();
}
