package com.uoc.sis.repository;

import com.uoc.sis.entity.Course;
import com.uoc.sis.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepartmentRepository extends JpaRepository<Department,String> {
    @Query(value = "select * from Department order by department_id desc limit 1;",nativeQuery = true)
    Department findLastData();

    @Query(value = "select * from Department where faculty_id=:facultyID",nativeQuery = true)
    List<Department> findAllByFacultyID(@Param("facultyID") String facultyID);
}
