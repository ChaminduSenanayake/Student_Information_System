package com.uoc.sis.service;

import com.uoc.sis.dto.CourseDTO;
import com.uoc.sis.dto.DegreeDTO;
import com.uoc.sis.dto.DepartmentDTO;
import com.uoc.sis.entity.Course;
import com.uoc.sis.entity.Degree;
import com.uoc.sis.entity.Department;
import com.uoc.sis.entity.Faculty;
import com.uoc.sis.repository.CourseRepository;
import com.uoc.sis.repository.DegreeRepository;
import com.uoc.sis.repository.DepartmentRepository;
import com.uoc.sis.repository.FacultyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;

@Service
public class CourseService {
    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private CourseRepository courseRepository;

    public boolean addCourse(CourseDTO dto) {
        Department department=departmentRepository.getById(dto.getDepartmentID());
        Course course=new Course(dto.getCourseID(),dto.getCourseLevel(),dto.getCourseName(),dto.getSemester(),dto.getCredits(),department);
        courseRepository.save(course);
        if (courseRepository.findById(dto.getCourseID()).isPresent()) {
            return true;
        } else {
            return false;
        }
    }

    public boolean updateCourse(CourseDTO dto) {
        try {
            Course objCourse = courseRepository.getById(dto.getCourseID());
            if (objCourse != null) {
                Department department=departmentRepository.getById(dto.getDepartmentID());
                Course course=new Course(dto.getCourseID(),dto.getCourseLevel(),dto.getCourseName(),dto.getSemester(),dto.getCredits(),department);
                courseRepository.save(course);
                return true;
            } else {
                return false;
            }
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean deleteCourse(String courseID) {
        if (courseRepository.findById(courseID).isPresent()) {
            courseRepository.deleteById(courseID);
            return true;
        } else {
            return false;
        }
    }

    public List<CourseDTO> getAll() {
        List<Course> all = courseRepository.findAll();
        ArrayList<CourseDTO> dtos = new ArrayList<>();
        for (Course course : all) {
            Department department=course.getDepartment();
            if(department!=null) {
                dtos.add(new CourseDTO(course.getCourse_id(),course.getCourse_name(),course.getSemester(),course.getCourse_level(),course.getCredits(),department.getDepartment_id(),department.getName()));
            }
        }
        return dtos;
    }

    public List<CourseDTO> getAllByFacultyID(String facultyID) {
        List<Course> all = courseRepository.findAllByFacultyID(facultyID);
        ArrayList<CourseDTO> dtos = new ArrayList<>();
        for (Course course : all) {
            Department department=course.getDepartment();
            if(department!=null) {
                dtos.add(new CourseDTO(course.getCourse_id(),course.getCourse_name(),course.getSemester(),course.getCourse_level(),course.getCredits(),department.getDepartment_id(),department.getName()));
            }
        }
        return dtos;
    }

    public CourseDTO getCourseByID(String courseID) {
        try {
            Course course = courseRepository.getById(courseID);
            Department department=course.getDepartment();
            return new CourseDTO(course.getCourse_id(),course.getCourse_name(),course.getSemester(),course.getCourse_level(),course.getCredits(),department.getDepartment_id(),department.getName());
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
        }
        return null;
    }

    public CourseDTO getCourseByExamID(String examID) {
        try {
            Course course = courseRepository.getByExamId(examID);
            Department department=course.getDepartment();
            return new CourseDTO(course.getCourse_id(),course.getCourse_name(),course.getSemester(),course.getCourse_level(),course.getCredits(),department.getDepartment_id(),department.getName());
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
        }
        return null;
    }



    public String getNewID() {
        String prifix = "C";
        try {
            Course course= courseRepository.findLastData();
            if (course != null) {
                String lastId = course.getCourse_id();
                int id = Integer.parseInt(lastId.split(prifix)[1]);
                id++;
                NumberFormat numberFormat = NumberFormat.getIntegerInstance();
                numberFormat.setMinimumIntegerDigits(3);
                numberFormat.setGroupingUsed(false);
                String newID = numberFormat.format(id);
                return prifix + newID;
            } else {
                return prifix + "001";
            }
        } catch (NullPointerException e) {
            e.printStackTrace();
        }
        return "0";
    }

}
