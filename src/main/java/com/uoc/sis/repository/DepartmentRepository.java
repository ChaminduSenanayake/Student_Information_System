package com.uoc.sis.repository;

import com.uoc.sis.entity.Course;
import com.uoc.sis.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Department,String> {
    @Query(value = "select * from Department order by department_id desc limit 1;",nativeQuery = true)
    Department findLastData();
}
