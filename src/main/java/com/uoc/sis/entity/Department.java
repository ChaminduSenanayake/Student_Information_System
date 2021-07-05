package com.uoc.sis.entity;

import javax.persistence.*;

@Entity
public class Department {
    @Id
    private String department_id;
    private String name;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumns(@JoinColumn(name = "faculty_id",referencedColumnName = "faculty_id",insertable = false,updatable = false))
    private Faculty faculty;

    public Department() {
    }

    public Department(String department_id, String name, Faculty faculty) {
        this.department_id = department_id;
        this.name = name;
        this.faculty = faculty;
    }

    public String getDepartment_id() {
        return department_id;
    }

    public void setDepartment_id(String department_id) {
        this.department_id = department_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Faculty getFaculty() {
        return faculty;
    }

    public void setFaculty(Faculty faculty) {
        this.faculty = faculty;
    }
}
