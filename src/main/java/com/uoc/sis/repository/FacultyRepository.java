package com.uoc.sis.repository;

import com.uoc.sis.entity.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacultyRepository extends JpaRepository<Faculty,String> {
    @Query(value = "select * from Faculty order by faculty_id desc limit 1;",nativeQuery = true)
    Faculty findLastData();

    @Query(value = "select * from Faculty where uni_code=:uniCode",nativeQuery = true)
    List<Faculty> getByUniCode(@Param("uniCode") String uniCode);
}
