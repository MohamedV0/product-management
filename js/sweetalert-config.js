/**
 * SweetAlert Configuration Module
 * Configures SweetAlert2 notifications and dialogs with custom styling
 */

const SweetAlertModule = (function () {
  'use strict';

  // Theme colors matching CSS variables
  const THEME = {
    colors: {
      primary: '#0f172a',
      secondary: '#1e293b',
      accent: '#38bdf8',
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      cancel: '#64748b',
      textPrimary: '#f8fafc',
      textSecondary: '#94a3b8'
    }
  };

  // Base config objects - private to the module
  const CONFIG = {
    // Common base properties for all alert types
    base: {
      background: THEME.colors.secondary,
      color: THEME.colors.textPrimary,
      customClass: {
        popup: 'custom-toast-popup',
        title: 'custom-toast-title'
      }
    },

    // Toast notification settings
    toast: {
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    }
  };

  // Public config objects
  const SweetAlertConfig = {
    // Success toast notification
    successToast: {
      ...CONFIG.base,
      ...CONFIG.toast,
      icon: 'success',
      iconColor: THEME.colors.success
    },

    // Error toast notification
    errorToast: {
      ...CONFIG.base,
      ...CONFIG.toast,
      icon: 'error',
      iconColor: THEME.colors.error,
      timer: 3000
    },

    // Delete confirmation dialog
    deleteConfirm: {
      ...CONFIG.base,
      title: 'Are you sure?',
      text: 'You are about to delete this product',
      icon: 'warning',
      iconColor: THEME.colors.warning,
      showCancelButton: true,
      confirmButtonColor: THEME.colors.error,
      cancelButtonColor: THEME.colors.cancel,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        ...CONFIG.base.customClass,
        popup: 'custom-confirm-popup',
        confirmButton: 'swal2-delete'
      }
    }
  };

  // Shows a notification toast
  function showNotification(type, title, text) {
    if (!title) return;

    const config = {
      ...(type === 'error' ? SweetAlertConfig.errorToast : SweetAlertConfig.successToast),
      title,
      text
    };

    // Ensure Swal is available before calling
    if (typeof Swal !== 'undefined') {
      Swal.fire(config);
    } else {
      console.error('SweetAlert2 is not loaded');
    }
  }

  // Export to window for use in other modules
  window.SweetAlertConfig = SweetAlertConfig;
  window.showNotification = showNotification;

  // Return public API
  return {
    config: SweetAlertConfig,
    showNotification
  };
})();