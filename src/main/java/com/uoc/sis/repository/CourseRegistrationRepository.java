package com.uoc.sis.repository;

import com.uoc.sis.entity.Degree;
import com.uoc.sis.entity.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRegistrationRepository extends JpaRepository<Registration,String> {

}
