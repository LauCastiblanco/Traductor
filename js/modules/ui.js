const UI = {
  showEmptyState: function() {
    HELPERS.show('emptyState');
    HELPERS.hide('loadingState');
    HELPERS.hide('successState');
    HELPERS.hide('errorState');
  },

  showLoadingState: function() {
    HELPERS.hide('emptyState');
    HELPERS.show('loadingState');
    HELPERS.hide('successState');
    HELPERS.hide('errorState');
  },

  showSuccessState: function() {
    HELPERS.hide('emptyState');
    HELPERS.hide('loadingState');
    HELPERS.show('successState');
    HELPERS.hide('errorState');
  },

  showErrorState: function(message) {
    HELPERS.hide('emptyState');
    HELPERS.hide('loadingState');
    HELPERS.hide('successState');
    HELPERS.show('errorState');
    HELPERS.setElementText('errorMessage', message || 'Ocurrió un error durante la traducción');
  },

  clearForm: function() {
    HELPERS.setElementValue('sourceText', '');
    HELPERS.setElementValue('sourceLang', '');
    HELPERS.setElementValue('targetLang', '');
    HELPERS.setElementText('charCount', '0 caracteres');
  },

  updateCharCount: function() {
    const sourceText = HELPERS.getElementValue('sourceText');
    const charCount = sourceText.length;
    HELPERS.setElementText('charCount', charCount + ' caracteres');
  },

  showNotification: function(message, type) {
    type = type || 'info';
    const container = HELPERS.getById('notificationContainer');
    if (!container) return;

    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;

    container.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transition = 'opacity 300ms ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
};

console.log('✓ UI cargado correctamente');
