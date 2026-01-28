package com.portfolio.artportfolio.config;

import com.portfolio.artportfolio.model.AboutSection;
import com.portfolio.artportfolio.model.CvEntry;
import com.portfolio.artportfolio.repository.AboutSectionRepository;
import com.portfolio.artportfolio.repository.CvEntryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final AboutSectionRepository aboutRepository;
    private final CvEntryRepository cvRepository;

    @Override
    public void run(String... args) {
        // Initialize About Section if empty
        if (aboutRepository.count() == 0) {
            AboutSection about = new AboutSection();
            about.setTitle("About Me");
            about.setContent(
                "Welcome to my portfolio. I am a passionate artist exploring the intersection of " +
                "traditional techniques and contemporary themes. My work focuses on capturing " +
                "moments of quiet introspection and the beauty found in everyday life.\n\n" +
                "Through my art, I aim to create spaces for reflection and emotional connection. " +
                "Each piece is an invitation to pause and observe the world from a different perspective.\n\n" +
                "Feel free to browse through my selected works and don't hesitate to reach out " +
                "if you'd like to discuss collaborations or commissions."
            );
            aboutRepository.save(about);
        }

        // Initialize CV Entries if empty
        if (cvRepository.count() == 0) {
            CvEntry entry1 = new CvEntry();
            entry1.setYear("2024");
            entry1.setTitle("Master of Fine Arts");
            entry1.setDescription("Academy of Fine Arts, Dresden");
            entry1.setEntryType("EDUCATION");
            entry1.setDisplayOrder(0);
            cvRepository.save(entry1);

            CvEntry entry2 = new CvEntry();
            entry2.setYear("2023");
            entry2.setTitle("Solo Exhibition: Reflections");
            entry2.setDescription("Contemporary Art Gallery, Berlin");
            entry2.setEntryType("EXHIBITION");
            entry2.setDisplayOrder(1);
            cvRepository.save(entry2);

            CvEntry entry3 = new CvEntry();
            entry3.setYear("2022");
            entry3.setTitle("Young Artist Award");
            entry3.setDescription("German Art Foundation");
            entry3.setEntryType("AWARD");
            entry3.setDisplayOrder(2);
            cvRepository.save(entry3);

            CvEntry entry4 = new CvEntry();
            entry4.setYear("2021");
            entry4.setTitle("Bachelor of Fine Arts");
            entry4.setDescription("University of the Arts, Leipzig");
            entry4.setEntryType("EDUCATION");
            entry4.setDisplayOrder(3);
            cvRepository.save(entry4);

            CvEntry entry5 = new CvEntry();
            entry5.setYear("2020");
            entry5.setTitle("Group Exhibition: New Voices");
            entry5.setDescription("Contemporary Art Museum, Munich");
            entry5.setEntryType("EXHIBITION");
            entry5.setDisplayOrder(4);
            cvRepository.save(entry5);
        }
    }
}
