package com.uoc.sis.entity;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class Result_pk implements Serializable {
    private String registration_no;
    private String exam_id;

    public Result_pk() {
    }

    public Result_pk(String registration_no, String exam_id) {
        this.registration_no = registration_no;
        this.exam_id = exam_id;
    }
}
