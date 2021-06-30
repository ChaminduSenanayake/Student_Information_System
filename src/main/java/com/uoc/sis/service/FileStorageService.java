package com.uoc.sis.service;

import com.uoc.sis.dto.UploadFileResponseDTO;
import com.uoc.sis.exceptions.FileStorageException;
import com.uoc.sis.exceptions.MyFileNotFoundException;
import com.uoc.sis.exceptions.OtherException;
import com.uoc.sis.util.FileStorageProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileStorageService {
    private final Path fileStorageLocation;

    @Autowired
    public FileStorageService(FileStorageProperties fileStorageProperties) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }




    public UploadFileResponseDTO storeImage(MultipartFile file, String folder,String fileName) {

        try {
            // Check if the file's name contains invalid characters
            if (fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }
            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = getFileUploadPath(folder).resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);


            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/api/v1/")
                    .path("/getImages/")
                    .path( folder + "/" + fileName)
                    .toUriString();

            UploadFileResponseDTO uploadFileResponse = new UploadFileResponseDTO(
                    fileName,
                    fileDownloadUri,
                    targetLocation.toString(),
                    file.getContentType(),
                    file.getSize()
            );
            return uploadFileResponse;
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public Resource loadImages(String folderName, String fileName) {
        try {
            Path filePath = getFileUploadPath(folderName).resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()) {
                return resource;
            } else {
                throw new MyFileNotFoundException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new MyFileNotFoundException("File not found " + fileName, ex);
        }
    }

    private Path getFileUploadPath(String folder) {
        Path fileStorageLocation = Paths.get(this.fileStorageLocation + "/" + folder)
                .toAbsolutePath().normalize();
        try {
            Files.createDirectories(fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
        }
        return fileStorageLocation;
    }

    public boolean deleteImage(String folderName, String fileName) {
        try {
            Path filePath = getFileUploadPath(folderName).resolve(fileName).normalize();
            Files.delete(filePath);
//            Resource resource = new UrlResource(filePath.toUri());
//            if (!resource.exists()) {
//                return true;
//            } else {
//                return false;
//            }
        } catch (Exception e) {
            throw new OtherException("Could not delete file", e);
        }
        return false;
    }
}
