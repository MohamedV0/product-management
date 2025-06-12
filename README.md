# 📦 Product Management System

<div align="center">
  <img src="./images/product-management.png" alt="Product Management System Logo" width="100">
  <h3>Create and manage your product inventory with ease</h3>
  <p>A modern web application for managing products with advanced filtering and organization features</p>
</div>

## 📋 Project Overview

This project was developed as part of the [Route Academy](https://www.linkedin.com/company/routeacademy/) Full Stack Development Program, a 12-month intensive training program. It represents a JavaScript assignment in the curriculum, focusing on implementing CRUD operations in a web application.

## 💫 Interface Preview

<div align="center">
  <img src="docs/ui-screenshots/Hero.png" alt="Product Management System Interface" width="800">
  
  <a href="docs/ui-screenshots" style="display: inline-block; margin-top: 15px; padding: 8px 16px; background: linear-gradient(45deg, #4CAF50, #2E7D32); color: white; text-decoration: none; border-radius: 6px; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.2); transition: all 0.3s ease;">
    <span style="vertical-align: middle; font-size: 0.9em;">📸 View All Screenshots</span>
  </a>
</div>

## ✨ Features

- ➕ **Add products** with name, price, category, image, and description
- ✅ **Validate inputs** before submission with real-time feedback
- 🏷️ **Categorize products** (Phones, Screens, AirPods, Watches, Other)
- 🔍 **Search functionality** to quickly find products
- 🗂️ **Filter products** by category
- 📊 **Sort products** by date added, name, or price
- 🗑️ **Delete products** with confirmation dialog
- ✏️ **Edit existing products**
- 📱 **Responsive design** for all devices
- 💾 **Local storage** for data persistence

## 🛠️ Technology Stack

<div align="center">

### 🎨 Frontend Technologies
[![Frontend Skills](https://skillicons.dev/icons?i=html,css,js,bootstrap)](https://skillicons.dev)

### 📚 Libraries & Frameworks
[![SweetAlert2](https://img.shields.io/badge/SweetAlert2-8A2BE2?style=for-the-badge&logo=javascript&logoColor=white&style=plastic)](https://sweetalert2.github.io/)
[![Font Awesome](https://img.shields.io/badge/Font_Awesome-528DD7?style=for-the-badge&logo=font-awesome&logoColor=white&style=plastic)](https://fontawesome.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white&style=plastic)](https://getbootstrap.com/)

### 💻 Development Tools
[![VSCode](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white&style=plastic)](https://code.visualstudio.com/)
[![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white&style=plastic)](https://git-scm.com/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white&style=plastic)](https://github.com/)

</div>

## 📁 Project Structure

```
Product Management System/
├── css/
│   ├── all.min.css (Font Awesome)
│   ├── bootstrap.min.css
│   ├── main.css (Custom styles)
│   └── sweetalert-custom.css
├── images/
│   └── product-management.png
├── js/
│   ├── bootstrap.bundle.min.js
│   ├── index.js (Main application logic)
│   └── sweetalert-config.js
├── webfonts/ (Font Awesome icon fonts)
├── docs/
│   ├── project-requirements.md
│   └── ui-screenshots/
│       └── Hero.png
├── index.html
├── README.md
└── .gitignore
```

## 🚀 How to Use

1. Clone the repository
   ```bash
   git clone https://github.com/MohamedV0/Product-Management-System.git
   ```
2. Open `index.html` in your browser
3. Add products by filling out the form and clicking "Add product"
4. Search, filter, and sort your products using the controls
5. Click "Edit" to modify an existing product
6. Click "Delete" to remove a product

## 📊 Code Organization

The JavaScript code follows a modular pattern with separate objects for:

- **DOM**: References to HTML elements
- **CONFIG**: Constants and configuration values
- **ProductManager**: Core functionality for managing products
- **UI**: Handles rendering and display
- **Validator**: Input validation
- **Utilities**: Helper functions

## ✅ Requirements Fulfilled

This implementation meets and extends the original project requirements:

| Requirement | Implementation |
|-------------|----------------|
| Create functionality | ✅ Add new products with name, price, category, image, and description |
| Read functionality | ✅ Display products in a responsive grid layout |
| Update functionality | ✅ Edit existing products and update display |
| Delete functionality | ✅ Remove products with confirmation |
| Data validation | ✅ Regular expression pattern matching for all inputs |
| Clean UI | ✅ Modern dark theme design with Bootstrap and custom CSS |
| Enhanced features | ✅ Categories, search, sort, filter, and responsive design |

---

<div align="center">
  <p>Developed with ❤️ by <a href="https://github.com/MohamedV0">Mohamed Ashraf</a> as part of <a href="https://www.linkedin.com/company/routeacademy/">Route Academy</a> Full Stack Program</p>
  <p>
    <a href="https://github.com/MohamedV0"><img src="https://img.shields.io/badge/GitHub-MohamedV0-181717?style=flat&logo=github&logoColor=white" alt="GitHub"></a>
    <a href="mailto:mohamed.ashraf.v0@gmail.com"><img src="https://img.shields.io/badge/Contact-Email-EA4335?style=flat&logo=gmail&logoColor=white" alt="Email"></a>
    <a href="https://www.linkedin.com/in/mohamed-ashraf-v0/"><img src="https://img.shields.io/badge/LinkedIn-Profile-0A66C2?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
    <a href="https://mohamedv0.netlify.app/"><img src="https://img.shields.io/badge/Portfolio-Website-00C7B7?style=flat&logo=netlify&logoColor=white" alt="Portfolio"></a>
  </p>
</div>