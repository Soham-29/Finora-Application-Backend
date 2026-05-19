# ⚙️ Finora — Backend

Backend REST API for **Finora**, a Smart Money Management app built with **Spring Boot**.

---

## 🔗 Live API

👉 `https://money-manager-application-gofn.onrender.com/api/v1.0`

---

## ✨ Features

- 🔐 JWT-based Authentication (Register / Login)
- 📧 Email Activation on Registration
- 💰 Income & Expense Management
- 🗂️ Category Management
- 🔍 Transaction Filtering
- 📥 Excel Report Generation (Apache POI)
- 📨 Email Report Delivery
- 🐳 Dockerized for easy deployment

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Spring Boot 4.0 | Backend Framework |
| Spring Security | Authentication & Authorization |
| Spring Data JPA | Database ORM |
| JWT (jjwt 0.12.6) | Token-based Authentication |
| PostgreSQL | Production Database |
| MySQL | Local Development Database |
| Spring Mail + Brevo (SendinBlue) | Transactional Email Delivery |
| Apache POI 5.3.0 | Excel Report Generation |
| Cloudinary | Profile Image Storage & CDN |
| Lombok | Boilerplate Reduction |
| Docker | Containerization |
| Java 21 | Language Version |

---

## 🌐 External Services

| Service | Purpose |
|---|---|
| **Brevo (Sendinblue)** | Transactional emails — account activation, report delivery |
| **Cloudinary** | Profile image upload, storage & CDN delivery |

### Brevo Setup
Brevo is used as the SMTP provider for sending emails. Configure it in `application.properties`:

```properties
spring.mail.host=smtp-relay.brevo.com
spring.mail.port=587
spring.mail.username=your_brevo_login_email
spring.mail.password=your_brevo_smtp_key
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

> Get your SMTP key from: Brevo Dashboard → SMTP & API → SMTP tab

### Cloudinary Setup
Cloudinary handles profile photo uploads from the frontend directly.

```properties
# Not needed in backend if uploading directly from frontend
# If backend handles upload, configure:
cloudinary.cloud-name=your_cloud_name
cloudinary.api-key=your_api_key
cloudinary.api-secret=your_api_secret
```

---

## 🚀 Run Locally

### Prerequisites
- Java 21
- Maven
- PostgreSQL or MySQL running locally

### Steps

```bash
# Clone the repository
git clone https://github.com/Soham-29/Finora-Application-Backend.git

cd Finora-Application-Backend
```

Configure `src/main/resources/application.properties`:

```properties
# Database (PostgreSQL)
spring.datasource.url=jdbc:postgresql://localhost:5432/finora
spring.datasource.username=your_username
spring.datasource.password=your_password

# JWT
jwt.secret=your_jwt_secret_key

# Mail
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your_email@gmail.com
spring.mail.password=your_app_password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

```bash
# Run the application
./mvnw spring-boot:run
```

Backend runs at: `http://localhost:8080/api/v1.0`

---

## 🐳 Run with Docker

```bash
# Build Docker image
docker build -t finora-backend .

# Run container
docker run -p 8080:8080 finora-backend
```

---

## 🔌 API Endpoints

### Auth (No token required)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Register a new user |
| POST | `/login` | Login & receive JWT token |
| GET | `/activate` | Activate account via email link |
| GET | `/health` | Health check |
| GET | `/status` | App status |

### Protected (JWT token required)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/income` | Get all income records |
| POST | `/income` | Add new income |
| DELETE | `/income/{id}` | Delete income |
| GET | `/expense` | Get all expense records |
| POST | `/expense` | Add new expense |
| DELETE | `/expense/{id}` | Delete expense |
| GET | `/category` | Get all categories |
| POST | `/category` | Add new category |
| GET | `/filter` | Filter transactions |
| GET | `/report/download` | Download Excel report |
| GET | `/report/email` | Send report via email |

> All protected endpoints require the header: `Authorization: Bearer <token>`

---

## 📂 Project Structure

```
src/main/java/com/project/moneyManager/
├── controller/        # REST API controllers
├── service/           # Business logic
├── repository/        # JPA repositories (DB queries)
├── model/             # Entity classes (DB tables)
├── dto/               # Request & Response objects
├── config/            # Security & JWT configuration
└── util/              # Helper utilities
```

---

## ☁️ Deployment

Deployed on **Render** using Docker.

- Database hosted on **Render PostgreSQL**
- Auto-deploys on push to `master` branch

---

## 🔗 Frontend

- **Frontend Repo:** [Finora-Application-Frontend](https://github.com/Soham-29/Finora-Application-Frontend)
- **Live App:** [https://finoramoneymanager.netlify.app](https://finoramoneymanager.netlify.app)

---

## 👨‍💻 Author

**Soham Kulkarni**
- GitHub: [@Soham-29](https://github.com/Soham-29)
