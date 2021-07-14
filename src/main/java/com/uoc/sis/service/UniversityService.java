package com.uoc.sis.service;

import com.uoc.sis.dto.UniversityDTO;
import com.uoc.sis.dto.UploadFileResponseDTO;
import com.uoc.sis.entity.University;
import com.uoc.sis.exceptions.OtherException;
import com.uoc.sis.repository.UniversityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;

@Service
public class UniversityService {
    @Autowired
    private UniversityRepository universityRepository;

    @Autowired
    private FileStorageService fileStorageService;

    public boolean addUniversity(UniversityDTO dto, MultipartFile uniImage){
        String fileName=uniImage.getOriginalFilename();
        String[] arr=fileName.split("\\."); // Split file name into array
        fileName=dto.getUniCode()+"."+arr[arr.length-1]; // get last item ass expression and create name
        String folderName="university";
        UploadFileResponseDTO uploadDTO=fileStorageService.storeImage(uniImage,folderName,fileName);
        University university;
        if(!uploadDTO.getFileName().equals(null)){
            university=new University(dto.getUniCode(),dto.getUniName(),uploadDTO.getFileDownloadUri(),uploadDTO.getFileName());
        }else {
            university=new University(dto.getUniCode(),dto.getUniName(),null,null);
        }
        universityRepository.save(university);
        if(universityRepository.findById(dto.getUniCode()).isPresent()){
            return true;
        }else {
            return false;
        }

    }

    public boolean updateUniversity(UniversityDTO dto){
        try {
            University objUni = universityRepository.getById(dto.getUniCode());
            if(objUni!=null) {
                University university = new University(dto.getUniCode(), dto.getUniName(), objUni.getImage_path(), objUni.getImage_name());
                University uni = universityRepository.save(university);
                return true;
            }else {
                return false;
            }
        }catch (EntityNotFoundException e){
            e.printStackTrace();
        }
        return false;
    }
    public boolean updateUniversityWithImage(UniversityDTO dto, MultipartFile uniImage){
        String fileName=uniImage.getOriginalFilename();
        String[] arr=fileName.split("\\."); // Split file name into array
        fileName=dto.getUniCode()+"."+arr[arr.length-1]; // get last item ass expression and create name
        String folderName="university";

        try{
            fileStorageService.deleteImage(folderName,fileName);
        }catch (Exception e){
            e.printStackTrace();
        }

        UploadFileResponseDTO uploadDTO=fileStorageService.storeImage(uniImage,folderName,fileName);

        University university=new University(dto.getUniCode(),dto.getUniName(),uploadDTO.getFileDownloadUri(),uploadDTO.getFileName());
        University uni=universityRepository.save(university);
        if(uni.getUni_code().equals(dto.getUniCode())){
            return true;
        }else {
            return false;
        }
    }

    public boolean deleteUniversity(String uniCode){
        try {
            University uni = universityRepository.getById(uniCode);
            String folderName = "university";
            String fileName= uni.getImage_name();
            fileStorageService.deleteImage(folderName,fileName);
            if (universityRepository.findById(uniCode).isPresent()) {
                universityRepository.deleteById(uniCode);
                return true;
            }
        }catch (EntityNotFoundException e){
            e.printStackTrace();
        }
        return false;
    }

    public List<UniversityDTO> getAllUniversities(){
        List<University> all = universityRepository.findAll();
        ArrayList<UniversityDTO> dtos = new ArrayList<>();
        for (University uni : all) {
            dtos.add(new UniversityDTO(uni.getUni_code(),uni.getUni_name(),uni.getImage_path(),uni.getImage_name()));
        }
        return dtos;
    }

    public UniversityDTO getUniByCode(String uniCode){
        try {
            University uni=universityRepository.getById(uniCode);
            return new UniversityDTO(uni.getUni_code(),uni.getUni_name(),uni.getImage_path(),uni.getImage_name());
        }catch (EntityNotFoundException e){
            e.printStackTrace();
        }
       return null;
    }
    public UniversityDTO getUniByFacultyID(String facultyID){
        try {
            University uni=universityRepository.getByFacultyId(facultyID);
            return new UniversityDTO(uni.getUni_code(),uni.getUni_name(),uni.getImage_path(),uni.getImage_name());
        }catch (EntityNotFoundException e){
            e.printStackTrace();
        }
        return null;
    }


    public String getNewID(){
        String prifix="U";
        try {
            University uni=universityRepository.findLastData();
            if (uni!=null) {
                String lastId = uni.getUni_code();
                int id = Integer.parseInt(lastId.split(prifix)[1]);
                id++;
                NumberFormat numberFormat = NumberFormat.getIntegerInstance();
                numberFormat.setMinimumIntegerDigits(3);
                numberFormat.setGroupingUsed(false);
                String newID = numberFormat.format(id);
                return prifix + newID;
            } else {
                return prifix+"001";
            }
        }catch (NullPointerException e){
            e.printStackTrace();
        }
        return "0";
    }

}
