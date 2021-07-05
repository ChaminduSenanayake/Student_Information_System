package com.uoc.sis.entity;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class Registration_pk implements Serializable {
    private String registration_no;
    private String course_id;

    public Registration_pk() {
    }

    public Registration_pk(String registration_no, String course_id) {
        this.registration_no = registration_no;
        this.course_id = course_id;
    }
}
