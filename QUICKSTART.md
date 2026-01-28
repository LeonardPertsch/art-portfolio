# 🚀 Schnellstart-Anleitung

## Sofort loslegen in 3 Schritten:

### 1️⃣ Projekt öffnen
Öffne das Projekt in deiner IDE (IntelliJ IDEA, Eclipse, VS Code)

### 2️⃣ Starten

**Option A: Mit Start-Script (Einfachste Methode)**
```bash
# Windows
start.bat

# Mac/Linux
./start.sh
```

**Option B: Mit Maven**
```bash
mvn spring-boot:run
```

**Option C: In IntelliJ/Eclipse**
- Rechtsklick auf `ArtPortfolioApplication.java`
- "Run" oder "Debug" wählen

### 3️⃣ Browser öffnen
```
http://localhost:8080
```

---

## ✨ Erste Schritte im Portfolio

### Edit Mode aktivieren
1. Klicke auf **"Edit Mode"** Button (oben rechts)
2. Jetzt sind alle Bearbeitungsfunktionen sichtbar

### Dein erstes Bild hochladen
1. Edit Mode aktivieren
2. Klick auf **"+ Add Image"** in der "Selected Work" Section
3. Wähle ein Bild aus (JPG, PNG, etc.)
4. Optional: Füge Titel und Beschreibung hinzu
5. Klick auf **"Upload"**

### About-Text anpassen
1. Edit Mode aktivieren
2. Scrolle zur "About Me" Section
3. Klick auf **"✎ Edit"** neben dem Titel
4. Schreibe deinen eigenen Text
5. Klick auf **"Save"**

### Lebenslauf hinzufügen
1. Edit Mode aktivieren
2. Scrolle zur "CV" Section
3. Klick auf **"+ Add Entry"**
4. Fülle die Felder aus:
   - **Jahr**: z.B. "2024"
   - **Titel**: z.B. "Master of Fine Arts"
   - **Beschreibung**: Details zur Ausbildung/Ausstellung/Award
   - **Typ**: EDUCATION, EXHIBITION, AWARD oder EXPERIENCE
5. Klick auf **"Save"**

---

## 🎨 Design anpassen

### Farben ändern
Öffne: `src/main/resources/static/css/style.css`

Ändere die Farben im `:root` Block:
```css
:root {
    --primary-color: #2c2c2c;     /* Hauptfarbe (dunkel) */
    --secondary-color: #666;       /* Sekundärfarbe (grau) */
    --accent-color: #d4af37;       /* Akzentfarbe (gold) */
    --background: #fafafa;         /* Hintergrund */
}
```

### Schriftarten ändern
Im HTML `<head>` oder in der CSS-Datei:
```css
--serif: 'Cormorant', serif;    /* Für Überschriften */
--sans: 'Lato', sans-serif;     /* Für Fließtext */
```

---

## 📁 Wichtige Dateien

| Datei | Funktion |
|-------|----------|
| `pom.xml` | Maven Konfiguration & Dependencies |
| `application.properties` | Server & Datenbank Einstellungen |
| `index.html` | HTML Template |
| `style.css` | Alle Styles (Reseda-Design) |
| `main.js` | JavaScript für Interaktivität |
| `ArtPortfolioApplication.java` | Main Application |

---

## 🔧 Häufige Anpassungen

### Port ändern (falls 8080 belegt)
`application.properties`:
```properties
server.port=8081
```

### Upload-Größe erhöhen
`application.properties`:
```properties
spring.servlet.multipart.max-file-size=20MB
spring.servlet.multipart.max-request-size=20MB
```

### Datenbank zurücksetzen
```bash
# Lösche einfach den data/ Ordner
rm -rf data/
```
Beim nächsten Start werden die Demo-Daten neu angelegt.

---

## 🆘 Probleme?

### Maven nicht gefunden?
Installiere Maven: https://maven.apache.org/install.html

### Java nicht gefunden?
Installiere Java 17+: https://adoptium.net/

### Port bereits belegt?
Ändere den Port in `application.properties` oder:
```bash
mvn spring-boot:run -Dspring-boot.run.arguments=--server.port=8081
```

### Bilder werden nicht angezeigt?
- Prüfe ob `src/main/resources/static/uploads/` existiert
- Prüfe Schreibrechte für den Ordner

---

## 📦 Deployment (für Produktion)

### JAR erstellen
```bash
mvn clean package
```
→ Erstellt `target/art-portfolio-1.0.0.jar`

### JAR ausführen
```bash
java -jar target/art-portfolio-1.0.0.jar
```

### Auf Server deployen
1. Kopiere die JAR-Datei auf deinen Server
2. Kopiere den `uploads/` Ordner
3. Kopiere die `data/` Ordner (falls Daten behalten werden sollen)
4. Starte mit: `java -jar art-portfolio-1.0.0.jar`

---

## 💡 Tipps

- **Edit Mode**: Immer wieder deaktivieren wenn nicht benötigt
- **Bilder**: Nutze hochwertige, aber komprimierte Bilder (< 2MB)
- **Backup**: Sichere regelmäßig den `data/` und `uploads/` Ordner
- **Performance**: Bei vielen Bildern (50+) ggf. Lazy Loading optimieren

---

## 🎯 Nächste Schritte

1. ✅ Eigene Bilder hochladen
2. ✅ About-Text personalisieren
3. ✅ Lebenslauf vervollständigen
4. ✅ Farben an deine Brand anpassen
5. ✅ Testen und Freunden zeigen!

**Viel Erfolg mit deinem Portfolio! 🎨**
