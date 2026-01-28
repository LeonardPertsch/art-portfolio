package com.portfolio.artportfolio.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "cv_entries")
public class CvEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "entry_year")
    private String year;

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    @Column(name = "entry_type")
    private String entryType; // EDUCATION, EXHIBITION, AWARD, EXPERIENCE

    @Column(name = "display_order")
    private Integer displayOrder;
}