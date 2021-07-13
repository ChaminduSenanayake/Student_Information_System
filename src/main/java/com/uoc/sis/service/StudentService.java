package com.uoc.sis.service;

import com.uoc.sis.dto.DegreeDTO;
import com.uoc.sis.dto.StudentDTO;
import com.uoc.sis.entity.*;
import com.uoc.sis.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private DegreeRepository degreeRepository;

    @Autowired
    private UniversityRepository universityRepository;

    @Autowired
    private ParentRepository parentRepository;

    public boolean addStudent(StudentDTO dto) {
        Degree degree =degreeRepository.getById(dto.getDegreeID());
        University university=universityRepository.getById(dto.getUnicode());
        Student student=new Student(dto.getRegistrationNo(),dto.getIndexNo(),dto.getfName(),dto.getmName(),dto.getlName(),dto.getAddress(),dto.getEmail(),dto.getTelephone(),dto.getGender(),dto.getLevel(),degree,university);
        studentRepository.save(student);
        if (studentRepository.findById(dto.getRegistrationNo()).isPresent()) {
            String parent_id=getNewParentID();
            Parent parent=new Parent(parent_id,dto.getParentName(),dto.getParentTelNo(),student);
            parentRepository.save(parent);
            return true;
        } else {
            return false;
        }
    }

    public boolean updateStudent(StudentDTO dto) {
        try {
            Student objStudent = studentRepository.getById(dto.getRegistrationNo());
            if (objStudent != null) {
                Degree degree =degreeRepository.getById(dto.getDegreeID());
                University university=universityRepository.getById(dto.getUnicode());
                Student student=new Student(dto.getRegistrationNo(),dto.getIndexNo(),dto.getfName(),dto.getmName(),dto.getlName(),dto.getAddress(),dto.getEmail(),dto.getTelephone(),dto.getGender(),dto.getLevel(),degree,university);
                studentRepository.save(student);
                return true;
            } else {
                return false;
            }
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean deleteStudent(String studentID) {
        if (studentRepository.findById(studentID).isPresent()) {
            studentRepository.deleteById(studentID);
            return true;
        } else {
            return false;
        }
    }

    public List<StudentDTO> getAll() {
        List<Student> all = studentRepository.findAll();
        ArrayList<StudentDTO> dtos = new ArrayList<>();
        for (Student s : all) {
            Degree degree=s.getDegree();
            University university=s.getUniversity();
            Parent parent=parentRepository.getByStudentRegNo(s.getRegistration_no());
            if(s!=null) {
                dtos.add(new StudentDTO(s.getRegistration_no(),s.getIndex_no(),s.getF_name(),s.getM_name(),s.getL_name(),s.getAddress(),s.getEmail(),s.getTelephone(),s.getGender(),s.getLevel(),parent.getParent_name(),parent.getParent_tel_no(),degree.getDegree_id(),degree.getDegree_name(),university.getUni_code(),university.getUni_name()));
            }
        }
        return dtos;
    }


    public StudentDTO getStudentByRegNo(String regNo) {
        try {
            Student s= studentRepository.getById(regNo);
            Degree degree=s.getDegree();
            University university=s.getUniversity();
            Parent parent=parentRepository.getByStudentRegNo(s.getRegistration_no());
            return new StudentDTO(s.getRegistration_no(),s.getIndex_no(),s.getF_name(),s.getM_name(),s.getL_name(),s.getAddress(),s.getEmail(),s.getTelephone(),s.getGender(),s.getLevel(),parent.getParent_name(),parent.getParent_tel_no(),degree.getDegree_id(),degree.getDegree_name(),university.getUni_code(),university.getUni_name());
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String getNewID() {
        String prifix = "S";
        try {
            Student student= studentRepository.findLastData();
            if (student != null) {
                String lastId = student.getRegistration_no();
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

    public String getNewParentID() {
        String prifix = "P";
        try {
            Parent parent= parentRepository.findLastData();
            if (parent != null) {
                String lastId = parent.getParent_id();
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
