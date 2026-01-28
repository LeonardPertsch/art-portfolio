package com.portfolio.artportfolio.controller;

import com.portfolio.artportfolio.model.AboutSection;
import com.portfolio.artportfolio.model.CvEntry;
import com.portfolio.artportfolio.model.PortfolioImage;
import com.portfolio.artportfolio.service.PortfolioService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class PortfolioController {
    
    private final PortfolioService portfolioService;
    
    @GetMapping("/")
    public String home(Model model) {
        List<PortfolioImage> images = portfolioService.getAllImages();
        AboutSection about = portfolioService.getAboutSection();
        List<CvEntry> cvEntries = portfolioService.getAllCvEntries();
        
        model.addAttribute("images", images);
        model.addAttribute("about", about);
        model.addAttribute("cvEntries", cvEntries);
        
        return "index";
    }
}
