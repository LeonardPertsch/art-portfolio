package com.portfolio.artportfolio.controller;

import com.portfolio.artportfolio.model.AboutSection;
import com.portfolio.artportfolio.model.CvEntry;
import com.portfolio.artportfolio.model.PortfolioImage;
import com.portfolio.artportfolio.service.PortfolioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Add if needed for development
public class ApiController {

    private final PortfolioService portfolioService;

    // Image Endpoints
    @GetMapping("/images")
    public List<PortfolioImage> getAllImages() {
        return portfolioService.getAllImages();
    }

    @PostMapping("/images/upload")
    public ResponseEntity<?> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "description", required = false) String description) {
        try {
            PortfolioImage image = portfolioService.uploadImage(file, title, description);
            return ResponseEntity.ok(image);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Upload failed: " + e.getMessage());
        }
    }

    @PutMapping("/images/{id}")
    public ResponseEntity<?> updateImage(
            @PathVariable Long id,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "description", required = false) String description) {
        try {
            PortfolioImage image = portfolioService.updateImage(id, title, description);
            return ResponseEntity.ok(image);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Update failed: " + e.getMessage());
        }
    }

    @DeleteMapping("/images/{id}")
    public ResponseEntity<?> deleteImage(@PathVariable Long id) {
        try {
            portfolioService.deleteImage(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Image deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Delete failed: " + e.getMessage());
        }
    }

    @PutMapping("/images/reorder")
    public ResponseEntity<?> reorderImages(@RequestBody List<Long> imageIds) {
        try {
            portfolioService.reorderImages(imageIds);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Reorder failed: " + e.getMessage());
        }
    }

    // About Section Endpoints
    @GetMapping("/about")
    public AboutSection getAboutSection() {
        return portfolioService.getAboutSection();
    }

    // FIXED: Use @RequestBody to accept JSON data instead of @RequestParam
    @PutMapping("/about")
    public ResponseEntity<?> updateAboutSection(@RequestBody Map<String, String> aboutData) {
        try {
            String title = aboutData.get("title");
            String content = aboutData.get("content");
            String email = aboutData.get("email");
            String phone = aboutData.get("phone");
            String additionalContact = aboutData.get("additionalContact");

            AboutSection section = portfolioService.updateAboutSectionWithContact(
                    title, content, email, phone, additionalContact
            );
            return ResponseEntity.ok(section);
        } catch (Exception e) {
            e.printStackTrace(); // Log the error
            return ResponseEntity.badRequest().body("Update failed: " + e.getMessage());
        }
    }

    // CV Endpoints
    @GetMapping("/cv")
    public List<CvEntry> getAllCvEntries() {
        return portfolioService.getAllCvEntries();
    }

    @PostMapping("/cv")
    public ResponseEntity<?> createCvEntry(
            @RequestParam("year") String year,
            @RequestParam("title") String title,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam("entryType") String entryType) {
        try {
            CvEntry entry = portfolioService.createCvEntry(year, title, description, entryType);
            return ResponseEntity.ok(entry);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Creation failed: " + e.getMessage());
        }
    }

    @PutMapping("/cv/{id}")
    public ResponseEntity<?> updateCvEntry(
            @PathVariable Long id,
            @RequestParam("year") String year,
            @RequestParam("title") String title,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam("entryType") String entryType) {
        try {
            CvEntry entry = portfolioService.updateCvEntry(id, year, title, description, entryType);
            return ResponseEntity.ok(entry);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Update failed: " + e.getMessage());
        }
    }

    @DeleteMapping("/cv/{id}")
    public ResponseEntity<?> deleteCvEntry(@PathVariable Long id) {
        try {
            portfolioService.deleteCvEntry(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "CV entry deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Delete failed: " + e.getMessage());
        }
    }

    @PutMapping("/cv/reorder")
    public ResponseEntity<?> reorderCvEntries(@RequestBody List<Long> cvIds) {
        try {
            portfolioService.reorderCvEntries(cvIds);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Reorder failed: " + e.getMessage());
        }
    }
}