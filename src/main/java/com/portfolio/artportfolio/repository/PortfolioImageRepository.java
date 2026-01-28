package com.portfolio.artportfolio.repository;

import com.portfolio.artportfolio.model.PortfolioImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PortfolioImageRepository extends JpaRepository<PortfolioImage, Long> {
    List<PortfolioImage> findAllByOrderByDisplayOrderAsc();
}
