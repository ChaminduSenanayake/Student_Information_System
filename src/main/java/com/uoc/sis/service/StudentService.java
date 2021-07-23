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

    public boolean addStudent(StudentDTO dto) {
        Degree degree =degreeRepository.getById(dto.getDegreeID());
        University university=universityRepository.getById(dto.getUnicode());
        Student student=new Student(dto.getRegistrationNo(),dto.getIndexNo(),dto.getfName(),dto.getmName(),dto.getlName(),dto.getAddress(),dto.getEmail(),dto.getTelephone(),dto.getNIC(),dto.getGender(),dto.getLevel(),dto.getParentName(),dto.getParentTelNo(),dto.getPassword(),degree,university);
        studentRepository.save(student);
        if (studentRepository.findById(dto.getRegistrationNo()).isPresent()) {
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
                Student student=new Student(dto.getRegistrationNo(),dto.getIndexNo(),dto.getfName(),dto.getmName(),dto.getlName(),dto.getAddress(),dto.getEmail(),dto.getTelephone(),dto.getNIC(),dto.getGender(),dto.getLevel(),dto.getParentName(),dto.getParentTelNo(),dto.getPassword(),degree,university);
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
            if(s!=null) {
                dtos.add(new StudentDTO(s.getRegistration_no(),s.getIndex_no(),s.getF_name(),s.getM_name(),s.getL_name(),s.getAddress(),s.getEmail(),s.getTelephone(),s.getNIC(),s.getGender(),s.getLevel(),s.getParent_name(),s.getParent_tel_no(),null,degree.getDegree_id(),degree.getDegree_name(),university.getUni_code()));
            }
        }
        return dtos;
    }

    public List<StudentDTO> getAllByFaculty(String facultyID) {
        List<Student> all = studentRepository.findAllByFacultyID(facultyID);
        ArrayList<StudentDTO> dtos = new ArrayList<>();
        for (Student s : all) {
            Degree degree=s.getDegree();
            University university=s.getUniversity();
            System.out.println("----------------"+s.getRegistration_no());
            if(s!=null) {
                dtos.add(new StudentDTO(s.getRegistration_no(),s.getIndex_no(),s.getF_name(),s.getM_name(),s.getL_name(),s.getAddress(),s.getEmail(),s.getTelephone(),s.getNIC(),s.getGender(),s.getLevel(),s.getParent_name(),s.getParent_tel_no(),null,degree.getDegree_id(),degree.getDegree_name(),university.getUni_code()));
            }
        }
        return dtos;
    }


    public StudentDTO getStudentByRegNo(String regNo) {
        try {
            Student s= studentRepository.getById(regNo);
            Degree degree=s.getDegree();
            University university=s.getUniversity();
            return new StudentDTO(s.getRegistration_no(),s.getIndex_no(),s.getF_name(),s.getM_name(),s.getL_name(),s.getAddress(),s.getEmail(),s.getTelephone(),s.getNIC(),s.getGender(),s.getLevel(),s.getParent_name(),s.getParent_tel_no(),s.getPassword(),degree.getDegree_id(),degree.getDegree_name(),university.getUni_code());
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
        }
        return null;
    }


    public String getNewRegistrationNo(String year) {
        String prifix = year+"s";
        try {
            Student student= studentRepository.findLastData(year+"%");
            if (student != null) {
                String lastId = student.getRegistration_no();
                int id = Integer.parseInt(lastId.split(prifix)[1]);
                id++;
                NumberFormat numberFormat = NumberFormat.getIntegerInstance();
                numberFormat.setMinimumIntegerDigits(5);
                numberFormat.setGroupingUsed(false);
                String newID = numberFormat.format(id);
                return prifix + newID;
            } else {
                return prifix + "00001";
            }
        } catch (NullPointerException e) {
            e.printStackTrace();
        }
        return "0";
    }
    public String getNewIndexNo(String uniCode) {
        String prifix = "S";
        try {
            Student student= studentRepository.findLastIndex(uniCode);
            if (student != null) {
                String lastId = student.getIndex_no();
                int id = Integer.parseInt(lastId.split(prifix)[1]);
                id++;
                NumberFormat numberFormat = NumberFormat.getIntegerInstance();
                numberFormat.setMinimumIntegerDigits(5);
                numberFormat.setGroupingUsed(false);
                String newID = numberFormat.format(id);
                return prifix + newID;
            } else {
                return prifix + "00001";
            }
        } catch (NullPointerException e) {
            e.printStackTrace();
        }
        return "0";
    }


}
