package com.uoc.sis.repository;

import com.uoc.sis.entity.Faculty;
import com.uoc.sis.entity.FacultyAdmin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FacultyAdminRepository extends JpaRepository<FacultyAdmin,String> {
    @Query(value = "select * from FacultyAdmin order by facultyAdmin_id desc limit 1;",nativeQuery = true)
    FacultyAdmin findLastData();

    @Query(value = "select * from FacultyAdmin where user_name=:userName",nativeQuery = true)
    FacultyAdmin getByUserName(@Param("userName") String userName);
}
