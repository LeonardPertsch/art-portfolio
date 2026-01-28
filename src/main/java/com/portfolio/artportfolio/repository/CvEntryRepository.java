package com.portfolio.artportfolio.repository;

import com.portfolio.artportfolio.model.CvEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CvEntryRepository extends JpaRepository<CvEntry, Long> {
    List<CvEntry> findAllByOrderByDisplayOrderAsc();
}
