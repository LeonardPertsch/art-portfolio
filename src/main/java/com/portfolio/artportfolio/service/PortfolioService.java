package com.portfolio.artportfolio.service;

import com.portfolio.artportfolio.model.AboutSection;
import com.portfolio.artportfolio.model.CvEntry;
import com.portfolio.artportfolio.model.PortfolioImage;
import com.portfolio.artportfolio.repository.AboutSectionRepository;
import com.portfolio.artportfolio.repository.CvEntryRepository;
import com.portfolio.artportfolio.repository.PortfolioImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PortfolioService {

    private final PortfolioImageRepository imageRepository;
    private final AboutSectionRepository aboutRepository;
    private final CvEntryRepository cvRepository;

    private final String uploadDir = "src/main/resources/static/uploads/";

    // Portfolio Images
    public List<PortfolioImage> getAllImages() {
        return imageRepository.findAllByOrderByDisplayOrderAsc();
    }

    @Transactional
    public PortfolioImage uploadImage(MultipartFile file, String title, String description) throws IOException {
        // Create upload directory if not exists
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generate unique filename
        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String filename = UUID.randomUUID().toString() + extension;

        // Save file
        Path filePath = uploadPath.resolve(filename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Save to database
        PortfolioImage image = new PortfolioImage();
        image.setFilename(filename);
        image.setFilepath("/uploads/" + filename);
        image.setTitle(title);
        image.setDescription(description);
        image.setDisplayOrder(imageRepository.findAll().size());

        return imageRepository.save(image);
    }

    @Transactional
    public void deleteImage(Long id) throws IOException {
        PortfolioImage image = imageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Image not found"));

        // Delete file
        Path filePath = Paths.get(uploadDir + image.getFilename());
        Files.deleteIfExists(filePath);

        // Delete from database
        imageRepository.delete(image);
    }

    @Transactional
    public PortfolioImage updateImage(Long id, String title, String description) {
        PortfolioImage image = imageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Image not found"));

        image.setTitle(title);
        image.setDescription(description);

        return imageRepository.save(image);
    }

    // About Section
    public AboutSection getAboutSection() {
        List<AboutSection> sections = aboutRepository.findAll();
        if (sections.isEmpty()) {
            AboutSection defaultSection = new AboutSection();
            defaultSection.setTitle("About Me");
            defaultSection.setContent("Welcome to my portfolio. Add your story here.");
            return aboutRepository.save(defaultSection);
        }
        return sections.get(0);
    }

    @Transactional
    public AboutSection updateAboutSection(String title, String content) {
        AboutSection section = getAboutSection();
        section.setTitle(title);
        section.setContent(content);
        return aboutRepository.save(section);
    }

    @Transactional
    public AboutSection updateAboutSectionWithContact(String title, String content, String email, String phone, String additionalContact) {
        AboutSection section = getAboutSection();
        section.setTitle(title);
        section.setContent(content);
        section.setEmail(email);
        section.setPhone(phone);
        section.setAdditionalContact(additionalContact);
        return aboutRepository.save(section);
    }

    // CV Entries
    public List<CvEntry> getAllCvEntries() {
        return cvRepository.findAllByOrderByDisplayOrderAsc();
    }

    @Transactional
    public CvEntry createCvEntry(String year, String title, String description, String entryType) {
        CvEntry entry = new CvEntry();
        entry.setYear(year);
        entry.setTitle(title);
        entry.setDescription(description);
        entry.setEntryType(entryType);
        entry.setDisplayOrder(cvRepository.findAll().size());
        return cvRepository.save(entry);
    }

    @Transactional
    public CvEntry updateCvEntry(Long id, String year, String title, String description, String entryType) {
        CvEntry entry = cvRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("CV Entry not found"));

        entry.setYear(year);
        entry.setTitle(title);
        entry.setDescription(description);
        entry.setEntryType(entryType);

        return cvRepository.save(entry);
    }

    @Transactional
    public void deleteCvEntry(Long id) {
        cvRepository.deleteById(id);
    }

    @Transactional
    public void reorderImages(List<Long> imageIds) {
        for (int i = 0; i < imageIds.size(); i++) {
            Long id = imageIds.get(i);
            PortfolioImage image = imageRepository.findById(id).orElse(null);
            if (image != null) {
                image.setDisplayOrder(i);
                imageRepository.save(image);
            }
        }
    }

    @Transactional
    public void reorderCvEntries(List<Long> cvIds) {
        for (int i = 0; i < cvIds.size(); i++) {
            Long id = cvIds.get(i);
            CvEntry entry = cvRepository.findById(id).orElse(null);
            if (entry != null) {
                entry.setDisplayOrder(i);
                cvRepository.save(entry);
            }
        }
    }
}