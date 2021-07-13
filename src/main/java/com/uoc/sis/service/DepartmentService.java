package com.uoc.sis.service;

import com.uoc.sis.dto.DegreeDTO;
import com.uoc.sis.dto.DepartmentDTO;
import com.uoc.sis.entity.Degree;
import com.uoc.sis.entity.Department;
import com.uoc.sis.entity.Faculty;
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
public class DepartmentService {
    @Autowired
    private FacultyRepository facultyRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    public boolean addDepartment(DepartmentDTO dto) {
        Faculty faculty = facultyRepository.getById(dto.getFacultyID());
        Department department=new Department(dto.getDepartmentId(),dto.getName(),faculty);
        departmentRepository.save(department);
        if (departmentRepository.findById(dto.getDepartmentId()).isPresent()) {
            return true;
        } else {
            return false;
        }
    }

    public boolean updateDepartment(DepartmentDTO dto) {
        try {
            Department objDepartment=departmentRepository.getById(dto.getDepartmentId());
            if (objDepartment != null) {
                Faculty faculty=facultyRepository.getById(dto.getFacultyID());
                Department department=new Department(dto.getDepartmentId(),dto.getName(),faculty);
                departmentRepository.save(department);
                return true;
            } else {
                return false;
            }
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean deleteDepartment(String departmentID) {
        if (departmentRepository.findById(departmentID).isPresent()) {
            departmentRepository.deleteById(departmentID);
            return true;
        } else {
            return false;
        }
    }

    public List<DepartmentDTO> getAll() {
        List<Department> all = departmentRepository.findAll();
        ArrayList<DepartmentDTO> dtos = new ArrayList<>();
        for (Department department : all) {
            Faculty fac=department.getFaculty();
            if(fac!=null) {
                dtos.add(new DepartmentDTO(department.getDepartment_id(), department.getName(), fac.getFaculty_id(), fac.getFaculty_name()));
            }
        }
        return dtos;
    }


    public DepartmentDTO getDepartmentByID(String departmentID) {
        try {
            Department department = departmentRepository.getById(departmentID);
            Faculty fac=department.getFaculty();
            return new DepartmentDTO(department.getDepartment_id(), department.getName(), fac.getFaculty_id(), fac.getFaculty_name());
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String getNewID() {
        String prifix = "DP";
        try {
            Department department= departmentRepository.findLastData();
            if (department != null) {
                String lastId = department.getDepartment_id();
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
