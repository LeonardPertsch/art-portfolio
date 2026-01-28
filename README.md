# Art Portfolio - Spring Boot Application

Ein elegantes Portfolio-System für Kunststudenten im Stil des Squarespace Reseda Templates.

## Features

- 📸 **Bild-Upload**: Hochladen und Verwalten von Portfolio-Bildern
- ✏️ **Live-Editing**: Texte und Inhalte direkt bearbeiten während die App läuft
- 📝 **About-Section**: Persönlicher Text über sich selbst
- 🎓 **Lebenslauf**: CV mit Ausbildung, Ausstellungen, Awards und Erfahrungen
- 🎨 **Reseda-Design**: Elegantes, minimalistisches Grid-Layout
- 💾 **Persistente Daten**: H2-Datenbank speichert alle Änderungen

## Voraussetzungen

- Java 17 oder höher
- Maven 3.6+

## Installation & Start

### Option 1: Mit Maven (empfohlen)

```bash
# Im Projektverzeichnis
mvn spring-boot:run
```

### Option 2: JAR erstellen und ausführen

```bash
# JAR bauen
mvn clean package

# JAR ausführen
java -jar target/art-portfolio-1.0.0.jar
```

## Zugriff

Nach dem Start ist die Anwendung erreichbar unter:
- **Portfolio**: http://localhost:8080
- **H2 Console** (zum Debuggen): http://localhost:8080/h2-console

## Verwendung

### Edit Mode aktivieren

1. Klicke auf den **"Edit Mode"** Button oben rechts
2. Jetzt werden alle Bearbeitungsfunktionen sichtbar

### Bilder hochladen

1. Edit Mode aktivieren
2. Klick auf **"+ Add Image"** in der Work-Section
3. Bild auswählen, optional Titel und Beschreibung hinzufügen
4. Upload

### Texte bearbeiten

1. Edit Mode aktivieren
2. Klick auf **"✎ Edit"** bei About-Section
3. Titel und Content anpassen
4. Speichern

### Lebenslauf verwalten

1. Edit Mode aktivieren
2. Klick auf **"+ Add Entry"** in der CV-Section
3. Jahr, Titel, Beschreibung und Typ auswählen
4. Speichern

## Datenstruktur

Die Daten werden in einer H2-Datenbank gespeichert:
- **portfolio_images**: Alle Portfolio-Bilder
- **about_section**: About-Text
- **cv_entries**: Lebenslauf-Einträge

Die Datenbank-Datei befindet sich in: `./data/portfolio.mv.db`

## Dateispeicherung

Hochgeladene Bilder werden gespeichert in:
```
src/main/resources/static/uploads/
```

## API Endpoints

### Images
- `GET /api/images` - Alle Bilder abrufen
- `POST /api/images/upload` - Bild hochladen
- `PUT /api/images/{id}` - Bild bearbeiten
- `DELETE /api/images/{id}` - Bild löschen

### About Section
- `GET /api/about` - About-Text abrufen
- `PUT /api/about` - About-Text aktualisieren

### CV Entries
- `GET /api/cv` - Alle CV-Einträge abrufen
- `POST /api/cv` - CV-Eintrag erstellen
- `PUT /api/cv/{id}` - CV-Eintrag bearbeiten
- `DELETE /api/cv/{id}` - CV-Eintrag löschen

## Technologie-Stack

- **Backend**: Spring Boot 3.2.1
- **Database**: H2 (embedded)
- **Template Engine**: Thymeleaf
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Fonts**: Cormorant (Serif), Lato (Sans-Serif)

## Anpassungen

### Farben ändern

In `src/main/resources/static/css/style.css`:
```css
:root {
    --primary-color: #2c2c2c;
    --secondary-color: #666;
    --accent-color: #d4af37;
    /* ... */
}
```

### Port ändern

In `src/main/resources/application.properties`:
```properties
server.port=8080
```

## Projektstruktur

```
art-portfolio/
├── src/
│   └── main/
│       ├── java/com/portfolio/artportfolio/
│       │   ├── controller/      # REST & Web Controller
│       │   ├── model/           # Entities
│       │   ├── repository/      # Data Access
│       │   ├── service/         # Business Logic
│       │   └── ArtPortfolioApplication.java
│       └── resources/
│           ├── static/
│           │   ├── css/        # Stylesheets
│           │   ├── js/         # JavaScript
│           │   └── uploads/    # Hochgeladene Bilder
│           ├── templates/      # Thymeleaf Templates
│           └── application.properties
├── pom.xml
└── README.md
```

## Troubleshooting

### Port bereits belegt
```bash
# Anderen Port verwenden
mvn spring-boot:run -Dspring-boot.run.arguments=--server.port=8081
```

### Bilder werden nicht angezeigt
- Prüfe, ob der `uploads`-Ordner existiert
- Prüfe Dateiberechtigungen

### Datenbank zurücksetzen
```bash
# Lösche die Datenbankdatei
rm -rf data/
```

## License

MIT License - frei verwendbar für persönliche und kommerzielle Projekte.
