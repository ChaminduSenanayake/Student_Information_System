package com.uoc.sis.service;

import com.uoc.sis.dto.FacultyDTO;
import com.uoc.sis.dto.UniversityDTO;
import com.uoc.sis.entity.Faculty;
import com.uoc.sis.entity.University;
import com.uoc.sis.repository.FacultyRepository;
import com.uoc.sis.repository.UniversityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;

@Service
public class FacultyService {
    @Autowired
    private FacultyRepository facultyRepository;
    @Autowired
    private UniversityRepository universityRepository;

    public boolean addFaculty(FacultyDTO dto) {
        University university = universityRepository.getById(dto.getUniCode());
        Faculty faculty = new Faculty(dto.getFacultyID(), dto.getFacultyName(), university);
        facultyRepository.save(faculty);
        if (facultyRepository.findById(dto.getFacultyID()).isPresent()) {
            return true;
        } else {
            return false;
        }
    }

    public boolean updateFaculty(FacultyDTO dto) {
        try {
            Faculty objFac = facultyRepository.getById(dto.getFacultyID());
            if (objFac != null) {
                University university = universityRepository.getById(dto.getUniCode());
                Faculty faculty = new Faculty(dto.getFacultyID(), dto.getFacultyName(), university);
                facultyRepository.save(faculty);
                return true;
            } else {
                return false;
            }
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean deleteFaculty(String facultyID) {
        if (facultyRepository.findById(facultyID).isPresent()) {
            facultyRepository.deleteById(facultyID);
            return true;
        } else {
            return false;
        }
    }

    public List<FacultyDTO> getAllFaculties() {
        List<Faculty> all = facultyRepository.findAll();
        ArrayList<FacultyDTO> dtos = new ArrayList<>();
        for (Faculty fac : all) {
            University university = fac.getUniversity();
            dtos.add(new FacultyDTO(fac.getFaculty_id(), fac.getFaculty_name(), university.getUni_code()));
        }
        return dtos;
    }

    public FacultyDTO getFacultyByID(String facultyID) {
        try {
            Faculty faculty = facultyRepository.getById(facultyID);
            University uni=faculty.getUniversity();
            return new FacultyDTO(faculty.getFaculty_id(),faculty.getFaculty_name(),uni.getUni_code());
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String getNewID() {
        String prifix = "F";
        try {
            Faculty fac = facultyRepository.findLastData();
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
