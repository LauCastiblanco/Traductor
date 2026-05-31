// ========================================
// VALIDATORS - Funciones de validación
// ========================================

/**
 * Valida que un texto no esté vacío
 * @param {string} text - El texto a validar
 * @returns {boolean} true si es válido
 */
function isNotEmpty(text) {
    return text && text.trim().length > 0;
}

/**
 * Valida que un texto tenga una longitud mínima
 * @param {string} text - El texto a validar
 * @param {number} minLength - Longitud mínima
 * @returns {boolean} true si es válido
 */
function hasMinLength(text, minLength = 1) {
    return text && text.trim().length >= minLength;
}

/**
 * Valida que un texto tenga una longitud máxima
 * @param {string} text - El texto a validar
 * @param {number} maxLength - Longitud máxima
 * @returns {boolean} true si es válido
 */
function hasMaxLength(text, maxLength = 5000) {
    return text && text.trim().length <= maxLength;
}

/**
 * Valida que dos idiomas sean diferentes
 * @param {string} sourceLang - Idioma de origen
 * @param {string} targetLang - Idioma de destino
 * @returns {boolean} true si son diferentes
 */
function areDifferentLanguages(sourceLang, targetLang) {
    return sourceLang && targetLang && sourceLang !== targetLang;
}

/**
 * Valida que un idioma esté seleccionado
 * @param {string} language - El código del idioma
 * @returns {boolean} true si es válido
 */
function isLanguageSelected(language) {
    return language && language.length > 0;
}

/**
 * Valida el formulario de traducción completo
 * @param {string} text - El texto a traducir
 * @param {string} sourceLang - Idioma origen
 * @param {string} targetLang - Idioma destino
 * @returns {Object} Objeto con validación y mensaje de error
 */
function validateTranslationForm(text, sourceLang, targetLang) {
    // Validar que el texto no esté vacío
    if (!isNotEmpty(text)) {
        return {
            isValid: false,
            error: 'Por favor ingresa un texto para traducir.'
        };
    }

    // Validar longitud mínima
    if (!hasMinLength(text, 5)) {
        return {
            isValid: false,
            error: 'El texto debe tener al menos 5 caracteres.'
        };
    }

    // Validar longitud máxima
    if (!hasMaxLength(text, 5000)) {
        return {
            isValid: false,
            error: 'El texto no puede exceder 5000 caracteres.'
        };
    }

    // Validar que se haya seleccionado idioma origen
    if (!isLanguageSelected(sourceLang)) {
        return {
            isValid: false,
            error: 'Por favor selecciona un idioma de origen.'
        };
    }

    // Validar que se haya seleccionado idioma destino
    if (!isLanguageSelected(targetLang)) {
        return {
            isValid: false,
            error: 'Por favor selecciona un idioma de destino.'
        };
    }

    // Validar que sean idiomas diferentes
    if (!areDifferentLanguages(sourceLang, targetLang)) {
        return {
            isValid: false,
            error: 'El idioma de origen y destino deben ser diferentes.'
        };
    }

    // Si pasó todas las validaciones
    return {
        isValid: true,
        error: null
    };
}

/**
 * Valida un email
 * @param {string} email - El email a validar
 * @returns {boolean} true si es válido
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Valida una URL
 * @param {string} url - La URL a validar
 * @returns {boolean} true si es válida
 */
function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Valida que un número esté en un rango
 * @param {number} value - El valor a validar
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {boolean} true si es válido
 */
function isInRange(value, min, max) {
    return value >= min && value <= max;
}

/**
 * Valida que un valor sea un número
 * @param {*} value - El valor a validar
 * @returns {boolean} true si es un número
 */
function isNumber(value) {
    return !isNaN(value) && !isNaN(parseFloat(value));
}

/**
 * Valida que un valor sea un objeto válido
 * @param {*} value - El valor a validar
 * @returns {boolean} true si es un objeto
 */
function isValidObject(value) {
    return value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Valida que un array no esté vacío
 * @param {Array} array - El array a validar
 * @returns {boolean} true si no está vacío
 */
function isNotEmptyArray(array) {
    return Array.isArray(array) && array.length > 0;
}

/**
 * Obtiene mensajes de error personalizados
 * @param {string} errorCode - El código de error
 * @returns {string} El mensaje de error
 */
function getErrorMessage(errorCode) {
    const messages = {
        'empty_text': 'Por favor ingresa un texto para traducir.',
        'short_text': 'El texto es demasiado corto (mínimo 5 caracteres).',
        'long_text': 'El texto es demasiado largo (máximo 5000 caracteres).',
        'no_source_lang': 'Por favor selecciona un idioma de origen.',
        'no_target_lang': 'Por favor selecciona un idioma de destino.',
        'same_languages': 'El idioma de origen y destino deben ser diferentes.',
        'api_error': 'Error al conectar con el servicio de traducción.',
        'network_error': 'Error de conexión. Por favor intenta nuevamente.',
        'invalid_response': 'La respuesta del servidor no es válida.'
    };

    return messages[errorCode] || 'Error desconocido. Por favor intenta nuevamente.';
}

/**
 * Sanitiza una cadena de caracteres (previene XSS)
 * @param {string} text - El texto a sanitizar
 * @returns {string} El texto sanitizado
 */
function sanitizeText(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Valida que un texto solo contenga caracteres seguros
 * @param {string} text - El texto a validar
 * @returns {boolean} true si es seguro
 */
function isSafeText(text) {
    const dangerousChars = /<|>|javascript:|on\w+=/i;
    return !dangerousChars.test(text);
}
