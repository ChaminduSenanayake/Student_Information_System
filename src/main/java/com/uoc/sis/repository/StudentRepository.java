package com.uoc.sis.repository;

import com.uoc.sis.entity.Faculty;
import com.uoc.sis.entity.Student;
import com.uoc.sis.entity.University;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, String> {
    @Query(value = "select * from Student where registration_no like :year order by registration_no desc limit 1",nativeQuery = true)
    Student findLastData(@Param("year") String year);

    @Query(value = "select * from Student where uni_code=:uniCode order by registration_no desc limit 1",nativeQuery = true)
    Student findLastIndex(@Param("uniCode") String uniCode);

    @Query(value = "select * from Student where degree_id in (select degree_id from Degree where faculty_id=:facultyID)",nativeQuery = true)
    List<Student> findAllByFacultyID(@Param("facultyID") String facultyID);


}
