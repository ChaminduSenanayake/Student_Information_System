package com.uoc.sis.repository;

import com.uoc.sis.entity.Degree;
import com.uoc.sis.entity.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DegreeRepository extends JpaRepository<Degree,String> {
    @Query(value = "select * from Degree order by degree_id desc limit 1;",nativeQuery = true)
    Degree findLastData();
}
