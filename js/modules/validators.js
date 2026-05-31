// ============================================
// Validators - Validaciones
// ============================================

/**
 * MÓDULO VALIDATORS
 * Funciones de validación
 * Depende de: HELPERS
 */

const VALIDATORS = {
    // ========== BASIC VALIDATIONS ==========

    /**
     * Valida que no esté vacío
     * @param {*} value - Valor
     * @param {string} fieldName - Nombre del campo (para mensajes)
     * @returns {Object} { isValid: boolean, message: string }
     */
    isNotEmpty: function(value, fieldName = 'Campo') {
        if (HELPERS.isEmpty(value)) {
            return {
                isValid: false,
                message: `${fieldName} no puede estar vacío.`
            };
        }
        return { isValid: true, message: '' };
    },

    /**
     * Valida longitud mínima
     * @param {string} value - Valor
     * @param {number} minLength - Longitud mínima
     * @param {string} fieldName - Nombre del campo
     * @returns {Object}
     */
    hasMinLength: function(value, minLength = 1, fieldName = 'Campo') {
        if (!value || value.length < minLength) {
            return {
                isValid: false,
                message: `${fieldName} debe tener al menos ${minLength} caracteres.`
            };
        }
        return { isValid: true, message: '' };
    },

    /**
     * Valida longitud máxima
     * @param {string} value - Valor
     * @param {number} maxLength - Longitud máxima
     * @param {string} fieldName - Nombre del campo
     * @returns {Object}
     */
    hasMaxLength: function(value, maxLength = 100, fieldName = 'Campo') {
        if (value && value.length > maxLength) {
            return {
                isValid: false,
                message: `${fieldName} no puede exceder ${maxLength} caracteres.`
            };
        }
        return { isValid: true, message: '' };
    },

    /**
     * Valida email
     * @param {string} email - Email
     * @returns {Object}
     */
    isValidEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return {
                isValid: false,
                message: 'El email no es válido.'
            };
        }
        return { isValid: true, message: '' };
    },

    /**
     * Valida que sea un número
     * @param {*} value - Valor
     * @param {string} fieldName - Nombre del campo
     * @returns {Object}
     */
    isNumber: function(value, fieldName = 'Campo') {
        if (isNaN(value)) {
            return {
                isValid: false,
                message: `${fieldName} debe ser un número.`
            };
        }
        return { isValid: true, message: '' };
    },

    /**
     * Valida que sea un número positivo
     * @param {*} value - Valor
     * @param {string} fieldName - Nombre del campo
     * @returns {Object}
     */
    isPositiveNumber: function(value, fieldName = 'Campo') {
        if (isNaN(value) || value <= 0) {
            return {
                isValid: false,
                message: `${fieldName} debe ser un número positivo.`
            };
        }
        return { isValid: true, message: '' };
    },

    /**
     * Valida que sea una URL válida
     * @param {string} url - URL
     * @returns {Object}
     */
    isValidURL: function(url) {
        try {
            new URL(url);
            return { isValid: true, message: '' };
        } catch {
            return {
                isValid: false,
                message: 'La URL no es válida.'
            };
        }
    },

    // ========== FORM VALIDATIONS ==========

    /**
     * Valida el formulario de traducción
     * @param {Object} formData - Datos del formulario
     * @returns {Object} { isValid: boolean, errors: {} }
     */
    validateTranslationForm: function(formData) {
        const errors = {};

        // Validar texto origen
        const textValidation = this.isNotEmpty(formData.sourceText, 'Texto a traducir');
        if (!textValidation.isValid) {
            errors.sourceText = textValidation.message;
        }

        const lengthValidation = this.hasMinLength(formData.sourceText, 1, 'Texto a traducir');
        if (!lengthValidation.isValid) {
            errors.sourceText = lengthValidation.message;
        }

        // Validar idioma origen
        const sourceLangValidation = this.isNotEmpty(formData.sourceLang, 'Idioma origen');
        if (!sourceLangValidation.isValid) {
            errors.sourceLang = sourceLangValidation.message;
        }

        // Validar idioma destino
        const targetLangValidation = this.isNotEmpty(formData.targetLang, 'Idioma destino');
        if (!targetLangValidation.isValid) {
            errors.targetLang = targetLangValidation.message;
        }

        // Validar que los idiomas sean diferentes
        if (formData.sourceLang && formData.targetLang && formData.sourceLang === formData.targetLang) {
            errors.targetLang = 'El idioma de origen y destino no pueden ser iguales.';
        }

        const isValid = Object.keys(errors).length === 0;

        return {
            isValid,
            errors
        };
    },

    /**
     * Recibe errores de validación y retorna mensaje amigable
     * @param {Object} errors - Objeto con errores
     * @returns {string}
     */
    getErrorMessage: function(errors) {
        const errorMessages = Object.values(errors).filter(msg => msg && msg.length > 0);
        if (errorMessages.length === 0) {
            return 'Ocurrió un error en la validación.';
        }
        return errorMessages.join(' ');
    }
};

// Verificación de carga
console.log('✓ VALIDATORS cargado correctamente');
