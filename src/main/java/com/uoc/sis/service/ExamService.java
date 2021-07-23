package com.uoc.sis.service;

import com.uoc.sis.dto.CourseDTO;
import com.uoc.sis.dto.DegreeDTO;
import com.uoc.sis.dto.ExamDTO;
import com.uoc.sis.entity.Course;
import com.uoc.sis.entity.Degree;
import com.uoc.sis.entity.Exam;
import com.uoc.sis.entity.Faculty;
import com.uoc.sis.repository.CourseRepository;
import com.uoc.sis.repository.DegreeRepository;
import com.uoc.sis.repository.ExamRepository;
import com.uoc.sis.repository.FacultyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;

@Service
public class ExamService {
    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private ExamRepository examRepository;

    public boolean addExam(ExamDTO dto) {
        Course course=courseRepository.getById(dto.getCourseID());
        Exam exam=new Exam(dto.getExamID(),dto.getExamName(),dto.getDate(),dto.getStartTime(),dto.getEndTime(),course);
        examRepository.save(exam);
        if (examRepository.findById(dto.getExamID()).isPresent()) {
            return true;
        } else {
            return false;
        }
    }

    public boolean updateExam(ExamDTO dto) {
        try {
            Exam objExam = examRepository.getById(dto.getExamID());
            if (objExam != null) {
                Course course=courseRepository.getById(dto.getCourseID());
                Exam exam=new Exam(dto.getExamID(),dto.getExamName(),dto.getDate(),dto.getStartTime(),dto.getEndTime(),course);
                examRepository.save(exam);
                return true;
            } else {
                return false;
            }
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean deleteExam(String examID) {
        if (examRepository.findById(examID).isPresent()) {
            examRepository.deleteById(examID);
            return true;
        } else {
            return false;
        }
    }

    public List<ExamDTO> getAll() {
        List<Exam> all = examRepository.findAll();
        ArrayList<ExamDTO> dtos = new ArrayList<>();
        for (Exam exam : all) {
            Course course=exam.getCourse();
            if(course!=null) {
                dtos.add(new ExamDTO(exam.getExam_id(),exam.getExam_name(),exam.getDate(),exam.getStartTime(),exam.getEndTime(),course.getCourse_id(),course.getCourse_name()));
            }
        }
        return dtos;
    }


    public ExamDTO getExam(String ExamID) {
        try {
            Exam exam = examRepository.getById(ExamID);
            Course course=exam.getCourse();
            return new ExamDTO(exam.getExam_id(),exam.getExam_name(),exam.getDate(),exam.getStartTime(),exam.getEndTime(),course.getCourse_id(),course.getCourse_name());
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String getNewID() {
        String prifix = "E";
        try {
            Exam exam= examRepository.findLastData();
            if (exam != null) {
                String lastId = exam.getExam_id();
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
