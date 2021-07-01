package com.uoc.sis.entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
public class University {
    @Id
    private String uni_code;
    private String uni_name;
    private String image_path;
    private String image_name;

    public University() {
    }

    public University(String uni_code, String uni_name, String image_path, String image_name) {
        this.uni_code = uni_code;
        this.uni_name = uni_name;
        this.image_path = image_path;
        this.image_name = image_name;
    }

    public String getUni_code() {
        return uni_code;
    }

    public void setUni_code(String uni_code) {
        this.uni_code = uni_code;
    }

    public String getUni_name() {
        return uni_name;
    }

    public void setUni_name(String uni_name) {
        this.uni_name = uni_name;
    }

    public String getImage_path() {
        return image_path;
    }

    public void setImage_path(String image_path) {
        this.image_path = image_path;
    }

    public String getImage_name() {
        return image_name;
    }

    public void setImage_name(String image_name) {
        this.image_name = image_name;
    }
}
