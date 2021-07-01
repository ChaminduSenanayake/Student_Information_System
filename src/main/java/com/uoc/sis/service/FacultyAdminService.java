package com.uoc.sis.service;

import com.uoc.sis.dto.FacultyAdminDTO;
import com.uoc.sis.dto.FacultyDTO;
import com.uoc.sis.entity.Faculty;
import com.uoc.sis.entity.FacultyAdmin;
import com.uoc.sis.entity.University;
import com.uoc.sis.repository.FacultyAdminRepository;
import com.uoc.sis.repository.FacultyRepository;
import com.uoc.sis.repository.UniversityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;

@Service
public class FacultyAdminService {
    @Autowired
    private FacultyRepository facultyRepository;
    @Autowired
    private FacultyAdminRepository facultyAdminRepository;

    public boolean addFacultyAdmin(FacultyAdminDTO dto) {
        Faculty faculty=facultyRepository.getById(dto.getFacultyID());
        FacultyAdmin admin=new FacultyAdmin(dto.getFacultyAdminID(),dto.getfName(),dto.getlName(),dto.getAddress(),dto.getTelephone(),dto.getEmail(),dto.getUserName(),dto.getPassword(),faculty);
        facultyAdminRepository.save(admin);
        if (facultyAdminRepository.findById(dto.getFacultyAdminID()).isPresent()) {
            return true;
        } else {
            return false;
        }
    }

    public boolean updateFacultyAdmin(FacultyAdminDTO dto) {
        try {
            FacultyAdmin objFacAdmin = facultyAdminRepository.getById(dto.getFacultyAdminID());
            if (objFacAdmin != null) {
                Faculty faculty=facultyRepository.getById(dto.getFacultyID());
                FacultyAdmin admin=new FacultyAdmin(dto.getFacultyAdminID(),dto.getfName(),dto.getlName(),dto.getAddress(),dto.getTelephone(),dto.getEmail(),dto.getUserName(),dto.getPassword(),faculty);
                facultyAdminRepository.save(admin);
                return true;
            } else {
                return false;
            }
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean deleteFacultyAdmin(String facultyAdminID) {
        if (facultyAdminRepository.findById(facultyAdminID).isPresent()) {
            facultyAdminRepository.deleteById(facultyAdminID);
            return true;
        } else {
            return false;
        }
    }

    public List<FacultyAdminDTO> getAll() {
        List<FacultyAdmin> all = facultyAdminRepository.findAll();
        ArrayList<FacultyAdminDTO> dtos = new ArrayList<>();
        for (FacultyAdmin fa : all) {
            Faculty faculty=fa.getFaculty();
            dtos.add(new FacultyAdminDTO(fa.getFacultyAdmin_id(),fa.getF_name(),fa.getL_name(),fa.getAddress(),fa.getTelephone(),fa.getEmail(),fa.getUserName(),null,faculty.getFaculty_id()));
        }
        return dtos;
    }

    public FacultyAdminDTO getFacultyAdminByID(String facultyAdminID) {
        try {
            FacultyAdmin fa = facultyAdminRepository.getById(facultyAdminID);
            Faculty faculty=fa.getFaculty();
            return new FacultyAdminDTO(fa.getFacultyAdmin_id(),fa.getF_name(),fa.getL_name(),fa.getAddress(),fa.getTelephone(),fa.getEmail(),fa.getUserName(),null,faculty.getFaculty_id());
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String getNewID() {
        String prifix = "FA";
        try {
            Faculty fac = facultyAdminRepository.findLastData();
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
