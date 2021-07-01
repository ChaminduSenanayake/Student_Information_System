package com.uoc.sis.repository;

import com.uoc.sis.entity.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface FacultyRepository extends JpaRepository<Faculty,String> {
    @Query(value = "select * from Faculty order by faculty_id desc limit 1;",nativeQuery = true)
    Faculty findLastData();
}
