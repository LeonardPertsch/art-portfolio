# 🚀 Quick Deploy Checklist - Render.com

Folge diese Schritte für einen schnellen Render-Deploy:

## ☑️ Vor dem Deploy

- [ ] Alle Dateien in Git committet
- [ ] GitHub/GitLab Repository erstellt
- [ ] Code ins Repository gepusht
- [ ] Render.com Account erstellt

## 📦 Dateien Check

Stelle sicher, dass folgende Dateien in deinem Repository sind:

- [ ] `Dockerfile`
- [ ] `docker-compose.yml` (für lokale Tests)
- [ ] `pom.xml`
- [ ] `src/main/resources/application.properties`
- [ ] `.dockerignore`
- [ ] `.gitignore`
- [ ] `render.yaml` (optional - für One-Click Deploy)

## 🎯 Deploy-Optionen

### Option A: Blueprint Deploy (Empfohlen - am einfachsten)

1. [ ] Push `render.yaml` zu deinem Repository
2. [ ] Gehe zu https://dashboard.render.com
3. [ ] Klicke **"New" → "Blueprint"**
4. [ ] Wähle dein Repository
5. [ ] Render erstellt automatisch:
   - PostgreSQL Datenbank
   - Web Service
   - Alle Environment Variables
6. [ ] Warte 5-10 Minuten
7. [ ] ✅ Fertig! Deine URL: `https://art-portfolio.onrender.com`

### Option B: Manuelle Erstellung

#### Schritt 1: Datenbank erstellen
1. [ ] Dashboard → **"New +" → "PostgreSQL"**
2. [ ] Konfiguration:
   - Name: `portfolio-db`
   - Database: `portfoliodb`
   - User: `portfolio`
   - Region: `Frankfurt` (oder nächste)
   - Plan: `Free`
3. [ ] **"Create Database"** klicken
4. [ ] Warten bis Status = `Available`
5. [ ] **Internal Database URL** kopieren (wichtig!)

#### Schritt 2: Web Service erstellen
1. [ ] Dashboard → **"New +" → "Web Service"**
2. [ ] Repository verbinden
3. [ ] Konfiguration:
   - Name: `art-portfolio`
   - Region: `Frankfurt` (gleich wie DB)
   - Branch: `main`
   - Runtime: `Docker`
   - Plan: `Free` (oder `Starter` für $7/mo)

4. [ ] **Advanced** → Environment Variables hinzufügen:

```bash
# Datenbank (Internal URL von Schritt 1 einfügen!)
SPRING_DATASOURCE_URL=<deine-internal-database-url>
SPRING_DATASOURCE_USERNAME=portfolio
SPRING_DATASOURCE_PASSWORD=<dein-db-password>

# App Config
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_JPA_SHOW_SQL=false
SERVER_PORT=8080

# File Upload
SPRING_SERVLET_MULTIPART_MAX_FILE_SIZE=50MB
SPRING_SERVLET_MULTIPART_MAX_REQUEST_SIZE=50MB

# Java
JAVA_OPTS=-XX:MaxRAMPercentage=75.0
```

5. [ ] **"Create Web Service"** klicken
6. [ ] Warten auf ersten Deploy (5-10 Min)
7. [ ] ✅ Fertig!

## 🧪 Nach dem Deploy

- [ ] Öffne deine App-URL
- [ ] Teste die Hauptseite
- [ ] Aktiviere Edit Mode
- [ ] Teste Upload-Funktion
- [ ] Teste About-Bereich
- [ ] Teste CV-Einträge

## 🔧 Wenn etwas nicht funktioniert

### Problem: Build schlägt fehl
```bash
# Prüfe Logs in Render Dashboard
# Häufige Ursachen:
- pom.xml fehlt oder ist fehlerhaft
- Java Version falsch (muss 21 sein)
- Maven Dependencies nicht auflösbar
```

### Problem: App startet nicht
```bash
# Prüfe Environment Variables:
- DATABASE_URL korrekt?
- Verwendest du Internal URL (nicht External)?
- SERVER_PORT=8080 gesetzt?
```

### Problem: Database Connection Error
```bash
# Lösung:
1. Gehe zu PostgreSQL Service
2. Kopiere "Internal Database URL"
3. Füge als SPRING_DATASOURCE_URL ein
4. Stelle sicher Format ist: jdbc:postgresql://...
```

### Problem: Uploads funktionieren nicht
```bash
# Render Free Plan:
- Uploads gehen verloren bei Restart
- Für Production: Nutze Render Disk ($1/GB/mo)
- Oder: Integriere Cloudinary (kostenlos 25GB)
```

## 💡 Tipps

### Free Tier Limitations
- App schläft nach 15 Min Inaktivität
- Erster Request nach Schlaf: 30-60 Sek
- 750 Stunden/Monat (ca. 50% Uptime)

### Für Production (Starter Plan $7/mo)
- App schläft nie
- Schnellere Performance
- Mehr RAM
- Bessere für echte Websites

### Custom Domain
1. [ ] Gehe zu deinem Web Service
2. [ ] **Settings → Custom Domain**
3. [ ] Füge deine Domain hinzu
4. [ ] Folge DNS-Anweisungen
5. [ ] SSL automatisch aktiviert ✅

### Auto-Deploy aktivieren
- [ ] **Settings → Build & Deploy**
- [ ] **Auto-Deploy** = `Yes`
- [ ] Jeder Git Push deployed automatisch!

## 📊 Monitoring

### Logs anschauen
1. [ ] Gehe zu deinem Service
2. [ ] Klicke auf **"Logs"**
3. [ ] Live-Logs werden angezeigt

### Health Check
```bash
# URL: https://deine-app.onrender.com/actuator/health
# Sollte zurückgeben: {"status":"UP"}
```

## 💰 Kosten

### Free Tier (zum Testen)
- Web Service: $0
- PostgreSQL: $0
- **Total: $0/Monat**

### Production Setup (empfohlen)
- Web Service Starter: $7/mo
- PostgreSQL Starter: $7/mo
- **Total: $14/Monat**

### Optional Add-ons
- Render Disk (1GB): $1/mo
- Render Disk (10GB): $10/mo

## ✅ Success Checklist

Deine App ist erfolgreich deployed wenn:

- [ ] URL öffnet sich ohne Fehler
- [ ] Portfolio-Seite wird angezeigt
- [ ] Edit Mode funktioniert
- [ ] Bilder/Videos können hochgeladen werden
- [ ] About-Sektion kann bearbeitet werden
- [ ] CV-Einträge funktionieren
- [ ] Drag & Drop funktioniert
- [ ] Änderungen bleiben nach Reload erhalten

## 🎉 Fertig!

Gratulation! Dein Portfolio ist jetzt online! 🚀

### Nächste Schritte:
1. Füge deine Inhalte hinzu
2. Teste alle Features
3. Teile die URL mit Freunden
4. (Optional) Custom Domain verbinden
5. (Optional) Upgrade zu Starter Plan

### Support & Hilfe:
- **Render Docs**: https://render.com/docs
- **Deployment Guide**: siehe DEPLOYMENT.md
- **Issues**: Check GitHub Issues

---

**Viel Erfolg! 🎨**