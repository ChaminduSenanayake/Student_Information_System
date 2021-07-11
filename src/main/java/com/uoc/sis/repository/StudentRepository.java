package com.uoc.sis.repository;

import com.uoc.sis.entity.Faculty;
import com.uoc.sis.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, String> {
    @Query(value = "select * from Student order by registration_no desc limit 1;",nativeQuery = true)
    Student findLastData();
}
