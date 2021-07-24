package com.uoc.sis.repository;

import com.uoc.sis.entity.Course;
import com.uoc.sis.entity.Degree;
import com.uoc.sis.entity.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DegreeRepository extends JpaRepository<Degree,String> {
    @Query(value = "select * from Degree order by degree_id desc limit 1;",nativeQuery = true)
    Degree findLastData();

    @Query(value = "select * from Degree where faculty_id=:facultyID",nativeQuery = true)
    List<Degree> findAllByFacultyID(@Param("facultyID") String facultyID);
}
