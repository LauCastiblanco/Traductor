// ============================================
// Helpers - Utilidades Auxiliares
// ============================================

/**
 * MÓDULO HELPERS
 * Funciones auxiliares comunes para toda la aplicación
 * NO depende de otros módulos
 */

const HELPERS = {
    // ========== DOM SELECTORS ==========
    
    /**
     * Obtiene un elemento por ID
     * @param {string} id - ID del elemento
     * @returns {HTMLElement|null}
     */
    getById: function(id) {
        return document.getElementById(id);
    },

    /**
     * Obtiene elementos por selector CSS
     * @param {string} selector - Selector CSS
     * @param {HTMLElement} context - Contexto (default: document)
     * @returns {NodeList}
     */
    getBySelector: function(selector, context = document) {
        return context.querySelectorAll(selector);
    },

    /**
     * Obtiene primer elemento por selector CSS
     * @param {string} selector - Selector CSS
     * @param {HTMLElement} context - Contexto (default: document)
     * @returns {HTMLElement|null}
     */
    getByQuery: function(selector, context = document) {
        return context.querySelector(selector);
    },

    // ========== ELEMENTO VALUES ==========

    /**
     * Obtiene el valor de un elemento (input, textarea, select)
     * @param {string|HTMLElement} element - ID o elemento
     * @returns {string}
     */
    getElementValue: function(element) {
        const el = typeof element === 'string' ? this.getById(element) : element;
        if (!el) return '';
        return el.value ? el.value.trim() : '';
    },

    /**
     * Establece el valor de un elemento
     * @param {string|HTMLElement} element - ID o elemento
     * @param {string} value - Valor a establecer
     */
    setElementValue: function(element, value = '') {
        const el = typeof element === 'string' ? this.getById(element) : element;
        if (el) {
            el.value = value;
        }
    },

    /**
     * Obtiene el texto de un elemento
     * @param {string|HTMLElement} element - ID o elemento
     * @returns {string}
     */
    getElementText: function(element) {
        const el = typeof element === 'string' ? this.getById(element) : element;
        if (!el) return '';
        return el.textContent.trim();
    },

    /**
     * Establece el texto de un elemento
     * @param {string|HTMLElement} element - ID o elemento
     * @param {string} text - Texto a establecer
     */
    setElementText: function(element, text = '') {
        const el = typeof element === 'string' ? this.getById(element) : element;
        if (el) {
            el.textContent = text;
        }
    },

    /**
     * Obtiene el HTML de un elemento
     * @param {string|HTMLElement} element - ID o elemento
     * @returns {string}
     */
    getElementHTML: function(element) {
        const el = typeof element === 'string' ? this.getById(element) : element;
        if (!el) return '';
        return el.innerHTML;
    },

    /**
     * Establece el HTML de un elemento
     * @param {string|HTMLElement} element - ID o elemento
     * @param {string} html - HTML a establecer
     */
    setElementHTML: function(element, html = '') {
        const el = typeof element === 'string' ? this.getById(element) : element;
        if (el) {
            el.innerHTML = html;
        }
    },

    // ========== VISIBILITY ==========

    /**
     * Muestra un elemento
     * @param {string|HTMLElement} element - ID o elemento
     * @param {string} display - Tipo de display (default: 'block')
     */
    show: function(element, display = 'block') {
        const el = typeof element === 'string' ? this.getById(element) : element;
        if (el) {
            el.style.display = display;
        }
    },

    /**
     * Oculta un elemento
     * @param {string|HTMLElement} element - ID o elemento
     */
    hide: function(element) {
        const el = typeof element === 'string' ? this.getById(element) : element;
        if (el) {
            el.style.display = 'none';
        }
    },

    /**
     * Alterna visibilidad de un elemento
     * @param {string|HTMLElement} element - ID o elemento
     * @param {string} display - Tipo de display (default: 'block')
     */
    toggle: function(element, display = 'block') {
        const el = typeof element === 'string' ? this.getById(element) : element;
        if (el) {
            el.style.display = el.style.display === 'none' ? display : 'none';
        }
    },

    // ========== CLASS MANIPULATION ==========

    /**
     * Añade una clase a un elemento
     * @param {string|HTMLElement} element - ID o elemento
     * @param {string} className - Nombre de clase
     */
    addClass: function(element, className) {
        const el = typeof element === 'string' ? this.getById(element) : element;
        if (el) {
            el.classList.add(className);
        }
    },

    /**
     * Elimina una clase de un elemento
     * @param {string|HTMLElement} element - ID o elemento
     * @param {string} className - Nombre de clase
     */
    removeClass: function(element, className) {
        const el = typeof element === 'string' ? this.getById(element) : element;
        if (el) {
            el.classList.remove(className);
        }
    },

    /**
     * Alterna una clase en un elemento
     * @param {string|HTMLElement} element - ID o elemento
     * @param {string} className - Nombre de clase
     */
    toggleClass: function(element, className) {
        const el = typeof element === 'string' ? this.getById(element) : element;
        if (el) {
            el.classList.toggle(className);
        }
    },

    /**
     * Verifica si un elemento tiene una clase
     * @param {string|HTMLElement} element - ID o elemento
     * @param {string} className - Nombre de clase
     * @returns {boolean}
     */
    hasClass: function(element, className) {
        const el = typeof element === 'string' ? this.getById(element) : element;
        if (!el) return false;
        return el.classList.contains(className);
    },

    // ========== ATTRIBUTE MANIPULATION ==========

    /**
     * Obtiene un atributo de un elemento
     * @param {string|HTMLElement} element - ID o elemento
     * @param {string} attribute - Nombre del atributo
     * @returns {string|null}
     */
    getAttribute: function(element, attribute) {
        const el = typeof element === 'string' ? this.getById(element) : element;
        if (!el) return null;
        return el.getAttribute(attribute);
    },

    /**
     * Establece un atributo en un elemento
     * @param {string|HTMLElement} element - ID o elemento
     * @param {string} attribute - Nombre del atributo
     * @param {string} value - Valor del atributo
     */
    setAttribute: function(element, attribute, value) {
        const el = typeof element === 'string' ? this.getById(element) : element;
        if (el) {
            el.setAttribute(attribute, value);
        }
    },

    /**
     * Elimina un atributo de un elemento
     * @param {string|HTMLElement} element - ID o elemento
     * @param {string} attribute - Nombre del atributo
     */
    removeAttribute: function(element, attribute) {
        const el = typeof element === 'string' ? this.getById(element) : element;
        if (el) {
            el.removeAttribute(attribute);
        }
    },

    /**
     * Habilita un elemento
     * @param {string|HTMLElement} element - ID o elemento
     */
    enable: function(element) {
        const el = typeof element === 'string' ? this.getById(element) : element;
        if (el) {
            el.disabled = false;
        }
    },

    /**
     * Deshabilita un elemento
     * @param {string|HTMLElement} element - ID o elemento
     */
    disable: function(element) {
        const el = typeof element === 'string' ? this.getById(element) : element;
        if (el) {
            el.disabled = true;
        }
    },

    // ========== EVENT LISTENERS ==========

    /**
     * Añade un event listener
     * @param {string|HTMLElement} element - ID o elemento
     * @param {string} event - Nombre del evento
     * @param {Function} callback - Función callback
     */
    addEventListener: function(element, event, callback) {
        const el = typeof element === 'string' ? this.getById(element) : element;
        if (el) {
            el.addEventListener(event, callback);
        }
    },

    /**
     * Elimina un event listener
     * @param {string|HTMLElement} element - ID o elemento
     * @param {string} event - Nombre del evento
     * @param {Function} callback - Función callback
     */
    removeEventListener: function(element, event, callback) {
        const el = typeof element === 'string' ? this.getById(element) : element;
        if (el) {
            el.removeEventListener(event, callback);
        }
    },

    /**
     * Dispara un evento personalizado
     * @param {string|HTMLElement} element - ID o elemento
     * @param {string} eventName - Nombre del evento
     * @param {*} detail - Detalles del evento
     */
    dispatchEvent: function(element, eventName, detail = null) {
        const el = typeof element === 'string' ? this.getById(element) : element;
        if (el) {
            const event = new CustomEvent(eventName, { detail });
            el.dispatchEvent(event);
        }
    },

    // ========== STYLE MANIPULATION ==========

    /**
     * Establece estilos en un elemento
     * @param {string|HTMLElement} element - ID o elemento
     * @param {Object} styles - Objeto con estilos CSS
     */
    setStyles: function(element, styles = {}) {
        const el = typeof element === 'string' ? this.getById(element) : element;
        if (el) {
            Object.assign(el.style, styles);
        }
    },

    /**
     * Obtiene un estilo computado
     * @param {string|HTMLElement} element - ID o elemento
     * @param {string} property - Propiedad CSS
     * @returns {string}
     */
    getComputedStyle: function(element, property) {
        const el = typeof element === 'string' ? this.getById(element) : element;
        if (!el) return '';
        return window.getComputedStyle(el).getPropertyValue(property);
    },

    // ========== DOM MANIPULATION ==========

    /**
     * Crea un elemento
     * @param {string} tagName - Nombre de la etiqueta
     * @param {Object} options - Opciones (class, id, text, html)
     * @returns {HTMLElement}
     */
    createElement: function(tagName, options = {}) {
        const el = document.createElement(tagName);
        
        if (options.class) {
            el.className = Array.isArray(options.class) ? options.class.join(' ') : options.class;
        }
        if (options.id) {
            el.id = options.id;
        }
        if (options.text) {
            el.textContent = options.text;
        }
        if (options.html) {
            el.innerHTML = options.html;
        }
        if (options.attributes) {
            Object.entries(options.attributes).forEach(([key, value]) => {
                el.setAttribute(key, value);
            });
        }

        return el;
    },

    /**
     * Añade elementos hijo
     * @param {string|HTMLElement} parent - Elemento padre
     * @param {HTMLElement|HTMLElement[]} children - Elemento(s) hijo(s)
     */
    appendChild: function(parent, children) {
        const parentEl = typeof parent === 'string' ? this.getById(parent) : parent;
        if (!parentEl) return;

        if (Array.isArray(children)) {
            children.forEach(child => {
                parentEl.appendChild(child);
            });
        } else {
            parentEl.appendChild(children);
        }
    },

    /**
     * Elimina un elemento
     * @param {string|HTMLElement} element - ID o elemento
     */
    removeElement: function(element) {
        const el = typeof element === 'string' ? this.getById(element) : element;
        if (el && el.parentNode) {
            el.parentNode.removeChild(el);
        }
    },

    /**
     * Limpia el contenido de un elemento
     * @param {string|HTMLElement} element - ID o elemento
     */
    clearElement: function(element) {
        const el = typeof element === 'string' ? this.getById(element) : element;
        if (el) {
            el.innerHTML = '';
        }
    },

    // ========== UTILITY FUNCTIONS ==========

    /**
     * Pausa la ejecución
     * @param {number} ms - Milisegundos
     * @returns {Promise}
     */
    delay: function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * Loguea un mensaje con prefijo
     * @param {string} message - Mensaje
     * @param {string} type - Tipo (log, warn, error)
     */
    log: function(message, type = 'log') {
        console[type](`[${new Date().toLocaleTimeString()}] ${message}`);
    },

    /**
     * Convierte un objeto a JSON
     * @param {*} obj - Objeto
     * @returns {string}
     */
    toJSON: function(obj) {
        return JSON.stringify(obj, null, 2);
    },

    /**
     * Parsea JSON
     * @param {string} jsonString - String JSON
     * @returns {*}
     */
    parseJSON: function(jsonString) {
        try {
            return JSON.parse(jsonString);
        } catch (e) {
            console.error('Error al parsear JSON:', e);
            return null;
        }
    },

    /**
     * Genera un ID único
     * @returns {string}
     */
    generateId: function() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    },

    /**
     * Capitaliza una cadena
     * @param {string} str - Cadena
     * @returns {string}
     */
    capitalize: function(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },

    /**
     * Verifica si un valor está vacío
     * @param {*} value - Valor
     * @returns {boolean}
     */
    isEmpty: function(value) {
        return value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0);
    },

    /**
     * Conta caracteres (sin espacios en blanco)
     * @param {string} text - Texto
     * @returns {number}
     */
    countCharacters: function(text) {
        return text ? text.replace(/\s/g, '').length : 0;
    },

    /**
     * Cuenta palabras
     * @param {string} text - Texto
     * @returns {number}
     */
    countWords: function(text) {
        if (!text) return 0;
        return text.trim().split(/\s+/).length;
    }
};

// Verificación de carga
console.log('✓ HELPERS cargado correctamente');
