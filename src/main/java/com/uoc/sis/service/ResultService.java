package com.uoc.sis.service;

import com.uoc.sis.dto.DegreeDTO;
import com.uoc.sis.dto.ResultDTO;
import com.uoc.sis.entity.*;
import com.uoc.sis.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;

@Service
public class ResultService {
    @Autowired
    private ResultRepository resultRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private ExamRepository examRepository;
    @Autowired
    private CourseRepository courseRepository;


    public boolean addResult(ResultDTO dto) {
        Exam exam = examRepository.getById(dto.getExamID());
        Student student=studentRepository.getById(dto.getRegistrationNo());
        Result result =new Result(student,exam,dto.getGrade());
        resultRepository.save(result);
        Result isPresent=resultRepository.getByCombineID(dto.getRegistrationNo(),dto.getExamID());
        if (isPresent!=null) {
            return true;
        } else {
            return false;
        }
    }
//    public boolean addResultList(List<ResultDTO> dto) {
//        Exam exam = examRepository.getById(dto.getExamID());
//        Student student=studentRepository.getById(dto.getRegistrationNo());
//        Result result =new Result(student,exam,dto.getGrade());
//        resultRepository.save(result);
//        Result isPresent=resultRepository.getByCombineID(dto.getRegistrationNo(),dto.getExamID());
//        if (isPresent!=null) {
//            return true;
//        } else {
//            return false;
//        }
//    }



    public boolean updateResult(ResultDTO dto) {
        try {
            Result result=resultRepository.getByCombineID(dto.getRegistrationNo(),dto.getExamID());
            if (result != null) {
                Exam exam = examRepository.getById(dto.getExamID());
                Student student=studentRepository.getById(dto.getRegistrationNo());
                Result newResult =new Result(student,exam,dto.getGrade());
                resultRepository.save(newResult);
                return true;
            } else {
                return false;
            }
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean deleteResult(String registrationNo,String examID) {
        Result result=resultRepository.getByCombineID(registrationNo,examID);
        if (result != null) {
            resultRepository.deleteResult(registrationNo,examID);
            return true;
        } else {
            return false;
        }
    }

    public List<ResultDTO> getAll() {
        List<Result> all = resultRepository.findAll();
        ArrayList<ResultDTO> dtos = new ArrayList<>();
        for (Result result : all) {
            Student student=result.getStudent();
            Exam exam=result.getExam();
            if(student!=null && exam!=null) {
                Course course=courseRepository.getById(exam.getCourse().getCourse_id());
                dtos.add(new ResultDTO(student.getRegistration_no(),exam.getExam_id(),course.getCourse_id() ,course.getCourse_name(),course.getCourse_level(),result.getGrade()));
            }
        }
        return dtos;
    }


    public  List<ResultDTO>  getResultsByCourseIDandDate(String courseID,String date) {
        List<Result> all = resultRepository.getResultByCourseIDandDate(courseID,date);
        ArrayList<ResultDTO> dtos = new ArrayList<>();
        for (Result result : all) {
            Student student=result.getStudent();
            Exam exam=result.getExam();
            if(student!=null && exam!=null) {
                Course course=courseRepository.getById(exam.getCourse().getCourse_id());
                dtos.add(new ResultDTO(student.getRegistration_no(),exam.getExam_id(),course.getCourse_id() ,course.getCourse_name(),course.getCourse_level(),result.getGrade()));
            }
        }
        return dtos;
    }

    public  List<ResultDTO>  getResultsByStudentRegistrationNo(String registrationNo) {
        List<Result> all = resultRepository.getResultByCourseIDandDate(registrationNo);
        ArrayList<ResultDTO> dtos = new ArrayList<>();
        for (Result result : all) {
            Student student=result.getStudent();
            Exam exam=result.getExam();
            if(student!=null && exam!=null) {
                Course course=courseRepository.getById(exam.getCourse().getCourse_id());
                dtos.add(new ResultDTO(student.getRegistration_no(),exam.getExam_id(),course.getCourse_id() ,course.getCourse_name(),course.getCourse_level(),result.getGrade()));
            }
        }
        return dtos;
    }

}
