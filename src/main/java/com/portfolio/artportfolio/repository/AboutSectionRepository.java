package com.portfolio.artportfolio.repository;

import com.portfolio.artportfolio.model.AboutSection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AboutSectionRepository extends JpaRepository<AboutSection, Long> {
}
