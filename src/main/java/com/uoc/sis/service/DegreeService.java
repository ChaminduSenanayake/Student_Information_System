package com.uoc.sis.service;

import com.uoc.sis.dto.DegreeDTO;
import com.uoc.sis.dto.FacultyDTO;
import com.uoc.sis.entity.Degree;
import com.uoc.sis.entity.Faculty;
import com.uoc.sis.entity.University;
import com.uoc.sis.repository.DegreeRepository;
import com.uoc.sis.repository.FacultyRepository;
import com.uoc.sis.repository.UniversityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;

@Service
public class DegreeService {
    @Autowired
    private DegreeRepository degreeRepository;

    @Autowired
    private FacultyRepository facultyRepository;

    public boolean addDegree(DegreeDTO dto) {
        Faculty faculty = facultyRepository.getById(dto.getFacultyID());
        Degree degree=new Degree(dto.getDegreeID(),dto.getDegreeName(),faculty);
        degreeRepository.save(degree);
        if (degreeRepository.findById(dto.getDegreeID()).isPresent()) {
            return true;
        } else {
            return false;
        }
    }

    public boolean updateDegree(DegreeDTO dto) {
        try {
            Degree objDegree = degreeRepository.getById(dto.getDegreeID());
            if (objDegree != null) {
                Faculty faculty=facultyRepository.getById(dto.getFacultyID());
                Degree degree=new Degree(dto.getDegreeID(),dto.getDegreeName(),faculty);
                degreeRepository.save(degree);
                return true;
            } else {
                return false;
            }
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean deleteDegree(String degreeID) {
        if (degreeRepository.findById(degreeID).isPresent()) {
            degreeRepository.deleteById(degreeID);
            return true;
        } else {
            return false;
        }
    }

    public List<DegreeDTO> getAll() {
        List<Degree> all = degreeRepository.findAll();
        ArrayList<DegreeDTO> dtos = new ArrayList<>();
        for (Degree degree : all) {
            dtos.add(new DegreeDTO(degree.getDegree_id(),degree.getDegree_name(),degree.getFaculty().getFaculty_id()));
        }
        return dtos;
    }


    public DegreeDTO getDegreeByID(String degreeID) {
        try {
            Degree degree = degreeRepository.getById(degreeID);
            return new DegreeDTO(degree.getDegree_id(),degree.getDegree_name(),degree.getFaculty().getFaculty_id());
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String getNewID() {
        String prifix = "D";
        try {
            Faculty fac = degreeRepository.findLastData();
            if (fac != null) {
                String lastId = fac.getFaculty_id();
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