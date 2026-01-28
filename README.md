# 🎨 Art Portfolio - Professional Portfolio Website

A modern, full-featured portfolio website for artists, designers, and creative professionals. Built with Spring Boot, PostgreSQL, and featuring an intuitive drag-and-drop interface for content management.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Java](https://img.shields.io/badge/Java-21-orange.svg)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## ✨ Features

### Content Management
- 🖼️ **Image & Video Gallery** - Upload and display images and videos with autoplay loop
- 📝 **About Section** - Rich text editor with contact information
- 🎓 **CV/Resume Section** - Chronological listing of education, exhibitions, awards, and experience
- ✏️ **Edit Mode** - Toggle between view and edit mode with one click
- 🔄 **Drag & Drop** - Reorder portfolio items and CV entries intuitively

### Technical Features
- 🎯 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast Performance** - Optimized loading with lazy loading and caching
- 🐳 **Docker Ready** - Easy deployment with Docker and Docker Compose
- 🔒 **Secure** - Built with Spring Security best practices
- 📊 **Health Monitoring** - Built-in health checks and actuator endpoints

### User Experience
- 🎭 **Interactive Title** - Hover effect on hero title letters
- 🎬 **Video Support** - Automatic video playback with loop
- 📱 **Mobile Optimized** - Touch-friendly interface
- 🌐 **Multi-language Ready** - Easy to add translations

## 🚀 Quick Start

### Prerequisites

- Java 21 or higher
- Maven 3.9+
- Docker & Docker Compose (for containerized deployment)
- PostgreSQL 16 (if running without Docker)

### Option 1: Docker Compose (Recommended)

```bash
# Clone the repository
git clone <your-repo-url>
cd art-portfolio

# Start with Docker Compose
docker-compose up --build

# Or use the start script
./start.sh
```

The application will be available at `http://localhost:8080`

### Option 2: Local Development

```bash
# 1. Start PostgreSQL
docker run -d \
  --name portfolio-db \
  -e POSTGRES_DB=portfoliodb \
  -e POSTGRES_USER=portfolio \
  -e POSTGRES_PASSWORD=portfolio \
  -p 5432:5432 \
  postgres:16-alpine

# 2. Build and run the application
mvn clean install
mvn spring-boot:run

# Or
./mvnw clean install
./mvnw spring-boot:run
```

## 📖 Documentation

- **[Deployment Guide](DEPLOYMENT.md)** - Complete guide for deploying to Render.com
- **[API Documentation](#api-endpoints)** - REST API reference
- **[Configuration](#configuration)** - Environment variables and settings

## 🎯 Usage

### Accessing the Application

1. **View Mode** (Default)
    - Navigate to `http://localhost:8080`
    - Browse portfolio, read about section, view CV

2. **Edit Mode**
    - Click "Edit Mode" button in top-right corner
    - All edit controls become visible
    - Upload images/videos, edit text, reorder items

### Managing Content

#### Upload Images/Videos
1. Enable Edit Mode
2. Click "+ Add Image/Video"
3. Select file (supports: JPG, PNG, GIF, MP4, WebM, MOV)
4. Add title and description (optional)
5. Click "Upload"

#### Edit About Section
1. Enable Edit Mode
2. Click "Edit" button in About section
3. Update title, content, and contact information
4. Click "Save"

#### Manage CV Entries
1. Enable Edit Mode
2. Click "+ Add Entry" in CV section
3. Fill in year, title, description, and type
4. Click "Save"

#### Reorder Items
1. Enable Edit Mode
2. Drag and drop items to reorder
3. Order is saved automatically

## 🔧 Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `SERVER_PORT` | 8080 | Application port |
| `SPRING_DATASOURCE_URL` | jdbc:postgresql://localhost:5432/portfoliodb | Database URL |
| `SPRING_DATASOURCE_USERNAME` | portfolio | Database username |
| `SPRING_DATASOURCE_PASSWORD` | portfolio | Database password |
| `MAX_FILE_SIZE` | 50MB | Maximum file upload size |
| `MAX_REQUEST_SIZE` | 50MB | Maximum request size |
| `LOG_LEVEL_ROOT` | INFO | Root logging level |

### Database Configuration

The application uses PostgreSQL by default. Connection settings:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/portfoliodb
spring.datasource.username=portfolio
spring.datasource.password=portfolio
spring.jpa.hibernate.ddl-auto=update
```

## 📡 API Endpoints

### Images

- `GET /api/images` - Get all images
- `POST /api/images/upload` - Upload new image/video
- `PUT /api/images/{id}` - Update image metadata
- `DELETE /api/images/{id}` - Delete image
- `PUT /api/images/reorder` - Reorder images

### About Section

- `GET /api/about` - Get about section
- `PUT /api/about` - Update about section

### CV Entries

- `GET /api/cv` - Get all CV entries
- `POST /api/cv` - Create CV entry
- `PUT /api/cv/{id}` - Update CV entry
- `DELETE /api/cv/{id}` - Delete CV entry
- `PUT /api/cv/reorder` - Reorder CV entries

### Health Check

- `GET /actuator/health` - Application health status

## 🏗️ Project Structure

```
art-portfolio/
├── src/
│   ├── main/
│   │   ├── java/com/portfolio/artportfolio/
│   │   │   ├── config/          # Configuration classes
│   │   │   ├── controller/      # REST & Web controllers
│   │   │   ├── model/           # JPA entities
│   │   │   ├── repository/      # Data repositories
│   │   │   └── service/         # Business logic
│   │   └── resources/
│   │       ├── static/          # CSS, JS, uploads
│   │       ├── templates/       # Thymeleaf templates
│   │       └── application.properties
│   └── test/                    # Unit tests
├── Dockerfile                   # Container definition
├── docker-compose.yml           # Multi-container setup
├── pom.xml                      # Maven dependencies
├── render.yaml                  # Render deployment config
└── DEPLOYMENT.md               # Deployment guide
```

## 🚢 Deployment

### Deploy to Render.com

1. **Push to Git**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Follow Deployment Guide**
    - See [DEPLOYMENT.md](DEPLOYMENT.md) for complete instructions
    - One-click deploy with `render.yaml`
    - Or manually configure via Render dashboard

3. **Set Environment Variables**
    - Database URL, username, password
    - File upload limits
    - Logging levels

### Deploy to Other Platforms

The Docker setup works with:
- **Heroku** - Use `heroku.yml` or Container Registry
- **AWS ECS** - Use Fargate or EC2
- **Google Cloud Run** - Direct Docker deployment
- **Azure Container Apps** - Container deployment
- **DigitalOcean App Platform** - Docker support

## 🔐 Security Considerations

### For Production

1. **Change default passwords**
   ```bash
   POSTGRES_PASSWORD=<strong-password>
   ```

2. **Use environment variables for secrets**
    - Never commit passwords to Git
    - Use Render Secret Files or similar

3. **Enable HTTPS** (automatic on Render)

4. **Add authentication** (optional)
   ```xml
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-security</artifactId>
   </dependency>
   ```

5. **Configure CORS** if needed
   ```java
   @CrossOrigin(origins = "https://yourdomain.com")
   ```

## 🛠️ Development

### Local Development Setup

```bash
# Install dependencies
mvn clean install

# Run in development mode
mvn spring-boot:run -Dspring-boot.run.profiles=dev

# Run tests
mvn test

# Build production JAR
mvn clean package -DskipTests
```

### Hot Reload

Enable Spring Boot DevTools for automatic restart:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <optional>true</optional>
</dependency>
```

## 📊 Monitoring

### Health Checks

```bash
# Check application health
curl http://localhost:8080/actuator/health

# View metrics (if enabled)
curl http://localhost:8080/actuator/metrics
```

### Logs

```bash
# Docker Compose logs
docker-compose logs -f app

# Specific service
docker-compose logs -f postgres

# Follow logs
tail -f logs/spring.log
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- Thymeleaf for the template engine
- PostgreSQL for the reliable database
- Render.com for easy deployment

## 📧 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help
- Review existing issues for solutions

## 🗺️ Roadmap

- [ ] Multi-language support (i18n)
- [ ] User authentication system
- [ ] Cloud storage integration (S3, Cloudinary)
- [ ] Image optimization and compression
- [ ] Export portfolio to PDF
- [ ] Analytics dashboard
- [ ] Theme customization
- [ ] Blog section

---

**Made with ❤️ for artists and creative professionals**