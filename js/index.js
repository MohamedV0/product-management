/**
 * Product System Management
 * A simple CRUD application for managing products with filtering, sorting, and validation.
 */

const ProductApp = (function () {
  'use strict';

  // DOM Elements - grouped by functionality
  const DOM = {
    // Form inputs
    productName: document.getElementById("productName"),
    productPrice: document.getElementById("productPrice"),
    productCategory: document.getElementById("productCategory"),
    productDescription: document.getElementById("productDescription"),
    productImage: document.getElementById("productImage"),
    fileName: document.getElementById("fileName"),
    submitBtn: document.getElementById("submitBtn"),

    // Error messages
    productNameError: document.getElementById("productNameError"),
    productPriceError: document.getElementById("productPriceError"),
    productCategoryError: document.getElementById("productCategoryError"),
    productDescriptionError: document.getElementById("productDescriptionError"),
    productImageError: document.getElementById("productImageError"),

    // Display elements
    productsContainer: document.getElementById("productsContainer"),
    emptyState: document.getElementById("emptyState"),

    // Filter elements
    searchInput: document.getElementById("searchInput"),
    categoryFilter: document.getElementById("categoryFilter"),
    sortOption: document.getElementById("sortOption"),
    
    // Scroll to top
    scrollToTopBtn: document.querySelector(".scroll-to-top"),
  };

  // Constants
  const CONFIG = {
    // Validation patterns
    PATTERNS: {
      name: /^[A-Z][a-zA-Z0-9\s]{2,14}$/,
      price: /^([6-9][0-9]{3}|[1-5][0-9]{4}|60000)$/,
      description: /^.{0,250}$/
    },

    VALID_CATEGORIES: ["Phones", "Screens", "AirPods", "Watches", "Other"],

    DEFAULT_PRODUCT: {
      name: "IPhone X",
      price: "9999",
      category: "Phones",
      description: "This is an auto-created example product to demonstrate the system's functionality.",
      image: "images/default-product.png",
      dateAdded: new Date().toISOString()
    },

    STORAGE_KEY: "productsList",
    SEARCH_DEBOUNCE: 300
  };

  // Utility functions
  const Utilities = {
    toggleVisibility(element, show) {
      if (!element) return;
      element.classList.toggle("d-none", !show);
    },

    setValidationState(element, isValid, errorElement) {
      if (!element) return;
      element.classList.toggle("is-valid", isValid);
      element.classList.toggle("is-invalid", !isValid);
      if (errorElement) {
        this.toggleVisibility(errorElement, !isValid);
      }
    },

    debounce(func, delay) {
      let timer;
      return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
      };
    }
  };

  // Validation functions
  const Validator = {
    validateInput(element, pattern, errorElement) {
      if (!element || !pattern) return false;
      const isValid = pattern.test(element.value);
      Utilities.setValidationState(element, isValid, errorElement);
      return isValid;
    },

    validateCategory(value) {
      const isValid = CONFIG.VALID_CATEGORIES.includes(value);
      Utilities.setValidationState(DOM.productCategory, isValid, DOM.productCategoryError);
      return isValid;
    },

    validateImage(isUpdate = false) {
      const fileInputLabel = document.querySelector('.file-input-label');

      if (isUpdate && !DOM.productImage.files.length) {
        if (ProductManager.currentProductIndex !== null) {
          const currentProduct = ProductManager.products[ProductManager.currentProductIndex];
          if (currentProduct && currentProduct.image) {
            Utilities.setValidationState(fileInputLabel, true, DOM.productImageError);
            return true;
          }
        }

        Utilities.toggleVisibility(DOM.productImageError, false);
        fileInputLabel.classList.remove("is-invalid");
        return true;
      }

      const isValid = DOM.productImage.files.length > 0;
      Utilities.setValidationState(fileInputLabel, isValid, DOM.productImageError);
      return isValid;
    },

    isFormValid() {
      const isNameValid = this.validateInput(DOM.productName, CONFIG.PATTERNS.name, DOM.productNameError);
      const isPriceValid = this.validateInput(DOM.productPrice, CONFIG.PATTERNS.price, DOM.productPriceError);
      const isDescriptionValid = this.validateInput(DOM.productDescription, CONFIG.PATTERNS.description, DOM.productDescriptionError);
      const isCategoryValid = this.validateCategory(DOM.productCategory.value);
      const isImageValid = this.validateImage(ProductManager.currentProductIndex !== null);

      return isNameValid && isPriceValid && isCategoryValid && isDescriptionValid && isImageValid;
    }
  };

  // UI Management
  const UI = {
    getCategoryIcon(category) {
      const icons = {
        'Phones': '<i class="fa-solid fa-mobile-screen-button"></i>',
        'Screens': '<i class="fa-solid fa-desktop"></i>',
        'AirPods': '<i class="fa-solid fa-headphones"></i>',
        'Watches': '<i class="fa-solid fa-clock"></i>',
        'Other': '<i class="fa-solid fa-box"></i>'
      };

      return icons[category] || icons['Other'];
    },

    highlightSearchTerm(text, searchTerm) {
      if (!searchTerm) return text;
      
      const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      return text.replace(regex, '<mark>$1</mark>');
    },

    displayAllProducts(allProducts, filteredProducts = null) {
      if (!DOM.productsContainer) return;

      const productsToDisplay = filteredProducts || allProducts;
      DOM.productsContainer.innerHTML = "";

      if (productsToDisplay.length === 0) {
        Utilities.toggleVisibility(DOM.emptyState, true);
        Utilities.toggleVisibility(DOM.productsContainer, false);
        return;
      }

      Utilities.toggleVisibility(DOM.emptyState, false);
      Utilities.toggleVisibility(DOM.productsContainer, true);

      // Get current search term for highlighting
      const searchTerm = DOM.searchInput ? DOM.searchInput.value.trim() : "";

      // Use DocumentFragment for performance
      const fragment = document.createDocumentFragment();
      productsToDisplay.forEach((product, index) => {
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = this.renderProductCard(product, index, searchTerm);
        fragment.appendChild(tempContainer.firstElementChild);
      });

      DOM.productsContainer.appendChild(fragment);
    },

    renderProductCard(product, index, searchTerm = "") {
      const productImageUrl = product.image || 'images/default-product.png';
      
      // Apply highlighting if search term exists
      const highlightedName = this.highlightSearchTerm(product.name, searchTerm);
      const highlightedDescription = this.highlightSearchTerm(product.description, searchTerm);
      
      return `
        <div class="col">
          <div class="product-card h-100 shadow-sm">
            <div class="product-card-header">
              <img src="${productImageUrl}" class="product-card-image" alt="${product.name}" loading="lazy">
            </div>
            <div class="card-body p-3">
              <h5 class="product-card-title text-truncate">${highlightedName}</h5>
              <div class="mb-2">
                <span class="product-card-category category-${product.category}">
                  ${this.getCategoryIcon(product.category)} ${product.category}
                </span>
              </div>
              <p class="product-card-desc small mb-3">${highlightedDescription}</p>
              <div class="d-flex justify-content-between align-items-center">
                <p class="product-card-price fw-bold mb-0">$${product.price}</p>
                <div class="d-flex gap-2">
                  <button class="btn btn-sm btn-edit" data-index="${index}">
                    <i class="fa-solid fa-pencil"></i>
                    <span class="d-none d-sm-inline-block ms-1">Edit</span>
                  </button>
                  <button class="btn btn-sm btn-delete" data-index="${index}">
                    <i class="fa-solid fa-trash"></i>
                    <span class="d-none d-sm-inline-block ms-1">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    },

    clearForm() {
      // Clear input values
      [DOM.productName, DOM.productPrice, DOM.productDescription].forEach(el => {
        if (el) el.value = "";
      });

      if (DOM.productCategory) DOM.productCategory.value = "";
      if (DOM.productImage) DOM.productImage.value = "";
      if (DOM.fileName) DOM.fileName.textContent = "No file chosen";

      // Clear validation states
      [
        DOM.productName,
        DOM.productPrice,
        DOM.productCategory,
        DOM.productDescription
      ].forEach(el => {
        if (el) el.classList.remove("is-valid", "is-invalid");
      });

      // Clear file input label validation state
      const fileInputLabel = document.querySelector('.file-input-label');
      if (fileInputLabel) {
        fileInputLabel.classList.remove("is-valid", "is-invalid");
      }

      // Hide error messages
      [
        DOM.productNameError,
        DOM.productPriceError,
        DOM.productCategoryError,
        DOM.productDescriptionError,
        DOM.productImageError
      ].forEach(el => {
        if (el) Utilities.toggleVisibility(el, false);
      });
    },

    updateFormForEdit(product) {
      if (!product) return;

      // Set field values
      if (DOM.productName) DOM.productName.value = product.name;
      if (DOM.productPrice) DOM.productPrice.value = product.price;
      if (DOM.productCategory) DOM.productCategory.value = product.category;
      if (DOM.productDescription) DOM.productDescription.value = product.description;
      if (DOM.submitBtn) DOM.submitBtn.textContent = "Update product";

      // Handle file display
      if (product.image) {
        if (DOM.fileName) DOM.fileName.textContent = "Current image selected";
        const fileInputLabel = document.querySelector('.file-input-label');
        if (fileInputLabel) {
          Utilities.setValidationState(fileInputLabel, true);
        }
        if (DOM.productImageError) Utilities.toggleVisibility(DOM.productImageError, false);
      } else {
        if (DOM.fileName) DOM.fileName.textContent = "No file chosen";
      }

      // Validate fields to show proper styling
      Validator.validateInput(DOM.productName, CONFIG.PATTERNS.name, DOM.productNameError);
      Validator.validateInput(DOM.productPrice, CONFIG.PATTERNS.price, DOM.productPriceError);
      Validator.validateInput(DOM.productDescription, CONFIG.PATTERNS.description, DOM.productDescriptionError);
      if (DOM.productCategory) DOM.productCategory.classList.add("is-valid");

      // Scroll to form
      if (DOM.productName) DOM.productName.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  // Product Management
  const ProductManager = {
    products: [],
    currentProductIndex: null,

    init() {
      this.loadFromStorage();
      this.setupEventListeners();
      this.styleCategoryOptions();
    },

    styleCategoryOptions() {
      const styleOptions = (selectElement) => {
        if (!selectElement) return;
        Array.from(selectElement.options).forEach(option => {
          if (option.value) {
            const categoryColor = getComputedStyle(document.documentElement)
              .getPropertyValue(`--category-${option.value.toLowerCase()}`).trim();

            if (categoryColor) {
              option.style.color = categoryColor;
              option.style.fontWeight = '500';
            }
          }
        });
      };

      // Style both category dropdowns
      styleOptions(DOM.productCategory);
      styleOptions(DOM.categoryFilter);
    },

    loadFromStorage() {
      try {
        const storedProducts = localStorage.getItem(CONFIG.STORAGE_KEY);
        if (storedProducts) {
          this.products = JSON.parse(storedProducts);
        }

        // If no products or empty array, add a default product
        if (!this.products || this.products.length === 0) {
          this.products = [CONFIG.DEFAULT_PRODUCT];
          this.saveToStorage();
        }

        UI.displayAllProducts(this.products);
      } catch (e) {
        console.error("Error loading products:", e);
        this.products = [CONFIG.DEFAULT_PRODUCT];
        showNotification('error', 'Loading Error', 'Could not load your products. Using default product.');
      }
    },

    saveToStorage() {
      try {
        localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(this.products));
      } catch (e) {
        console.error("Error saving to localStorage:", e);
        showNotification('error', 'Storage Error', 'Could not save your products. Local storage might be full or disabled.');
      }
    },

    addProduct(product) {
      if (!product) return -1;
      this.products.push(product);
      this.saveToStorage();
      return this.products.length - 1;
    },

    updateProduct(index, updatedProduct) {
      if (!updatedProduct || index < 0 || index >= this.products.length) return;
      this.products[index] = {
        ...this.products[index],
        ...updatedProduct
      };
      this.saveToStorage();
    },

    deleteProduct(index) {
      if (index < 0 || index >= this.products.length) return;
      this.products.splice(index, 1);
      this.saveToStorage();
    },

    filterAndSort(searchTerm = "", category = "", sortOption = "newest") {
      let filtered = [...this.products];

      // Apply search filter (case insensitive)
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term)
        );
      }

      // Apply category filter
      if (category) {
        filtered = filtered.filter(product => product.category === category);
      }

      // Apply sorting
      switch (sortOption) {
        case "newest":
          filtered.sort((a, b) => new Date(b.dateAdded || 0) - new Date(a.dateAdded || 0));
          break;
        case "oldest":
          filtered.sort((a, b) => new Date(a.dateAdded || 0) - new Date(b.dateAdded || 0));
          break;
        case "nameAsc":
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "nameDesc":
          filtered.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case "priceAsc":
          filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
          break;
        case "priceDesc":
          filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
          break;
        default:
          filtered.sort((a, b) => new Date(b.dateAdded || 0) - new Date(a.dateAdded || 0));
      }

      return filtered;
    },

    setupEventListeners() {
      // Form submission
      if (DOM.submitBtn) {
        DOM.submitBtn.addEventListener("click", this.handleSubmit.bind(this));
      }

      // File input handling
      if (DOM.productImage) {
        DOM.productImage.addEventListener("change", () => {
          if (DOM.fileName && DOM.productImage.files.length > 0) {
            DOM.fileName.textContent = DOM.productImage.files[0].name;
          } else if (DOM.fileName) {
            DOM.fileName.textContent = "No file chosen";
          }
          Validator.validateImage(this.currentProductIndex !== null);
        });
      }

      // Form field validation
      if (DOM.productName) {
        DOM.productName.addEventListener("input", () => {
          Validator.validateInput(DOM.productName, CONFIG.PATTERNS.name, DOM.productNameError);
        });
      }

      if (DOM.productPrice) {
        DOM.productPrice.addEventListener("input", () => {
          Validator.validateInput(DOM.productPrice, CONFIG.PATTERNS.price, DOM.productPriceError);
        });
      }

      if (DOM.productDescription) {
        DOM.productDescription.addEventListener("input", () => {
          Validator.validateInput(DOM.productDescription, CONFIG.PATTERNS.description, DOM.productDescriptionError);
        });
      }

      if (DOM.productCategory) {
        DOM.productCategory.addEventListener("change", () => {
          Validator.validateCategory(DOM.productCategory.value);
        });
      }

      // Filter change handling
      if (DOM.searchInput) {
        const debouncedFilter = Utilities.debounce(
          this.handleFiltering.bind(this),
          CONFIG.SEARCH_DEBOUNCE
        );
        DOM.searchInput.addEventListener("input", debouncedFilter);
      }

      if (DOM.categoryFilter) {
        DOM.categoryFilter.addEventListener("change", this.handleFiltering.bind(this));
      }

      if (DOM.sortOption) {
        DOM.sortOption.addEventListener("change", this.handleFiltering.bind(this));
      }

      // Product actions (edit/delete)
      if (DOM.productsContainer) {
        DOM.productsContainer.addEventListener("click", (e) => {
          const editButton = e.target.closest(".btn-edit");
          const deleteButton = e.target.closest(".btn-delete");

          if (!editButton && !deleteButton) return;

          const index = parseInt(
            editButton ? editButton.dataset.index : deleteButton.dataset.index,
            10
          );

          if (isNaN(index)) return;

          if (editButton) {
            this.prepareUpdate(index);
          } else if (deleteButton) {
            this.confirmDelete(index);
          }
        });
      }
    },

    handleSubmit() {
      if (!Validator.isFormValid()) {
        return;
      }

      const imageFile = DOM.productImage.files[0];
      const imageUrl = imageFile ? URL.createObjectURL(imageFile) : '';

      if (this.currentProductIndex !== null) {
        // Update existing product
        const currentProduct = this.products[this.currentProductIndex];
        const updatedProduct = {
          name: DOM.productName.value,
          price: DOM.productPrice.value,
          category: DOM.productCategory.value,
          description: DOM.productDescription.value,
          // Keep the old image if no new image is selected
          image: imageFile ? imageUrl : currentProduct.image
        };

        this.updateProduct(this.currentProductIndex, updatedProduct);
        this.currentProductIndex = null;
        if (DOM.submitBtn) DOM.submitBtn.textContent = "Add product";
        
        // Re-apply current filters to update the view
        this.handleFiltering();
        
        UI.clearForm();
        showNotification('success', 'Product Updated', 'Your product has been updated successfully!');
      } else {
        // Add new product
        const newProduct = {
          name: DOM.productName.value,
          price: DOM.productPrice.value,
          category: DOM.productCategory.value,
          description: DOM.productDescription.value,
          image: imageUrl,
          dateAdded: new Date().toISOString()
        };

        this.addProduct(newProduct);
        
        // Re-apply current filters to update the view
        this.handleFiltering();
        
        UI.clearForm();
        showNotification('success', 'Product Added', 'Your product has been added successfully!');
      }
    },

    handleFiltering() {
      const searchTerm = DOM.searchInput ? DOM.searchInput.value.trim() : "";
      const category = DOM.categoryFilter ? DOM.categoryFilter.value : "";
      const sortBy = DOM.sortOption ? DOM.sortOption.value : "newest";

      const filteredProducts = this.filterAndSort(searchTerm, category, sortBy);
      UI.displayAllProducts(this.products, filteredProducts);
    },

    prepareUpdate(index) {
      if (index >= 0 && index < this.products.length) {
        const product = this.products[index];
        this.currentProductIndex = index;
        UI.updateFormForEdit(product);
      }
    },

    confirmDelete(index) {
      if (index >= 0 && index < this.products.length) {
        const productName = this.products[index].name;
        const config = {
          ...SweetAlertConfig.deleteConfirm,
          text: `You are about to delete "${productName}"`
        };

        Swal.fire(config).then((result) => {
          if (result.isConfirmed) {
            this.deleteProduct(index);
            
            // Re-apply current filters to update the view
            this.handleFiltering();
            
            showNotification('success', 'Deleted!', 'Your product has been deleted.');
          }
        });
      }
    }
  };

  // Scroll to top functionality
  const ScrollToTop = {
    init() {
      if (!DOM.scrollToTopBtn) return;
      
      // Show/hide button based on scroll position
      window.addEventListener('scroll', this.toggleVisibility.bind(this));
      
      // Scroll to top when clicked
      DOM.scrollToTopBtn.addEventListener('click', this.scrollToTop.bind(this));
    },
    
    toggleVisibility() {
      if (window.scrollY > 300) {
        DOM.scrollToTopBtn.classList.add('visible');
      } else {
        DOM.scrollToTopBtn.classList.remove('visible');
      }
    },
    
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Public API
  return {
    init: function () {
      document.addEventListener('DOMContentLoaded', () => {
        ProductManager.init();
        ScrollToTop.init();
      });
    }
  };
})();

// Initialize the application
ProductApp.init();