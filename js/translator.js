// ============================================
// Translator - Lógica Principal
// ============================================

/**
 * MÓDULO TRANSLATOR
 * Gestiona la lógica principal del traductor
 * Depende de: HELPERS, VALIDATORS, UI, INDICATORS, API
 */

const TRANSLATOR = {
    // ========== STATE ==========

    isTranslating: false,
    lastTranslation: null,

    // ========== INITIALIZATION ==========

    /**
     * Inicializa el traductor
     */
    init: function() {
        console.log('=== INICIALIZANDO TRADUCTOR ===');
        
        try {
            this.setupEventListeners();
            this.setupUIState();

            // Verificar modo
            if (API && API.mockMode) {
                console.log('✓ USANDO MODO SIMULADO (SIN SERVIDOR)');
            } else {
                console.log('✓ CONECTADO A SERVIDOR');
            }

            console.log('=== TRADUCTOR INICIALIZADO EXITOSAMENTE ===');
        } catch (error) {
            console.error('❌ Error inicializando traductor:', error);
        }
    },

    /**
     * Configura event listeners
     */
    setupEventListeners: function() {
        try {
            // Formulario de traducción
            const form = HELPERS.getById('translatorForm');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleFormSubmit();
                });
            }

            // Contador de caracteres
            const sourceText = HELPERS.getById('sourceText');
            if (sourceText) {
                sourceText.addEventListener('input', () => {
                    UI.updateCharCount();
                });
            }

            // Botón de nueva traducción
            const newTranslationBtn = HELPERS.getById('newTranslationBtn');
            if (newTranslationBtn) {
                newTranslationBtn.addEventListener('click', () => {
                    this.handleNewTranslation();
                });
            }

            // Botón de copiar
            const copyBtn = HELPERS.getById('copyBtn');
            if (copyBtn) {
                copyBtn.addEventListener('click', () => {
                    this.handleCopyResult();
                });
            }

            // Botón de descargar
            const downloadBtn = HELPERS.getById('downloadBtn');
            if (downloadBtn) {
                downloadBtn.addEventListener('click', () => {
                    this.handleDownloadResult();
                });
            }

            // Botón de reintentar (en caso de error)
            const errorRetryBtn = HELPERS.getById('errorRetryBtn');
            if (errorRetryBtn) {
                errorRetryBtn.addEventListener('click', () => {
                    this.handleFormSubmit();
                });
            }

            console.log('✓ Event listeners configurados');
        } catch (error) {
            console.error('❌ Error configurando event listeners:', error);
        }
    },

    /**
     * Configura el estado inicial de la UI
     */
    setupUIState: function() {
        try {
            UI.showEmptyState();
            HELPERS.hide('resultsSection');
            UI.clearForm();
            console.log('✓ UI State configurado');
        } catch (error) {
            console.error('❌ Error configurando UI:', error);
        }
    },

    // ========== FORM HANDLING ==========

    /**
     * Maneja el envío del formulario
     */
    handleFormSubmit: function() {
        console.log('📝 Procesando solicitud de traducción...');

        try {
            // Obtener datos del formulario
            const sourceText = HELPERS.getElementValue('sourceText');
            const sourceLang = HELPERS.getElementValue('sourceLang');
            const targetLang = HELPERS.getElementValue('targetLang');

            console.log('Datos del formulario:', { sourceText, sourceLang, targetLang });

            // Validar que haya texto
            if (!sourceText || !sourceText.trim()) {
                UI.showNotification('Por favor ingresa un texto a traducir', 'warning');
                return;
            }

            // Validar que se seleccionen idiomas
            if (!sourceLang || !targetLang) {
                UI.showNotification('Por favor selecciona ambos idiomas', 'warning');
                return;
            }

            // Validar que no sean el mismo idioma
            if (sourceLang === targetLang) {
                UI.showNotification('Selecciona idiomas diferentes', 'warning');
                return;
            }

            // Procesar traducción
            this.processTranslation(sourceText, sourceLang, targetLang);
        } catch (error) {
            console.error('❌ Error en handleFormSubmit:', error);
            UI.showNotification('Error al procesar la solicitud', 'error');
        }
    },

    /**
     * Procesa la traducción
     */
    processTranslation: function(sourceText, sourceLang, targetLang) {
        if (this.isTranslating) {
            console.warn('⚠ Ya hay una traducción en progreso');
            return;
        }

        this.isTranslating = true;
        const submitBtn = HELPERS.getById('submitBtn');
        if (submitBtn) submitBtn.disabled = true;

        UI.showLoadingState();
        HELPERS.show('resultsSection');

        // Llamar a API
        if (API && typeof API.translateText === 'function') {
            API.translateText(sourceText, sourceLang, targetLang)
                .then(result => {
                    this.handleTranslationSuccess(result);
                })
                .catch(error => {
                    this.handleTranslationError(error);
                })
                .finally(() => {
                    this.isTranslating = false;
                    if (submitBtn) submitBtn.disabled = false;
                });
        } else {
            console.error('❌ API.translateText no está disponible');
            this.isTranslating = false;
            if (submitBtn) submitBtn.disabled = false;
            UI.showNotification('Error: API no disponible', 'error');
        }
    },

    /**
     * Maneja éxito en traducción
     */
    handleTranslationSuccess: function(result) {
        console.log('✅ Traducción exitosa:', result);

        try {
            // Guardar última traducción
            this.lastTranslation = result;

            // Actualizar UI con resultados
            HELPERS.setElementText('resultOriginal', result.original);
            HELPERS.setElementText('resultLiteral', result.literal);
            HELPERS.setElementText('resultAdapted', result.adapted);
            HELPERS.setElementText('resultCulturalNotes', result.culturalNotes);

            // Mostrar estado de éxito
            UI.showSuccessState();

            // Animar indicadores
            if (result.indicators) {
                INDICATORS.animateIndicators(result.indicators);
            }

            // Mostrar notificación
            UI.showNotification('✅ Traducción completada exitosamente', 'success');

            // Scroll a resultados
            setTimeout(() => {
                const resultsSection = HELPERS.getById('resultsSection');
                if (resultsSection) {
                    resultsSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 300);
        } catch (error) {
            console.error('❌ Error en handleTranslationSuccess:', error);
            UI.showNotification('Error al mostrar resultados', 'error');
        }
    },

    /**
     * Maneja error en traducción
     */
    handleTranslationError: function(error) {
        console.error('❌ Error en traducción:', error);
        const errorMessage = error.message || 'Ocurrió un error al traducir. Por favor, intenta de nuevo.';
        UI.showErrorState(errorMessage);
        UI.showNotification('❌ ' + errorMessage, 'error');
    },

    /**
     * Nueva traducción
     */
    handleNewTranslation: function() {
        UI.clearForm();
        UI.showEmptyState();
        HELPERS.hide('resultsSection');
        this.lastTranslation = null;
        UI.showNotification('Formulario limpiado', 'success');
    },

    // ========== RESULT ACTIONS ==========

    /**
     * Copia el resultado de la traducción al portapapeles
     */
    handleCopyResult: function() {
        if (!this.lastTranslation) {
            UI.showNotification('⚠️ No hay resultado para copiar', 'warning');
            return;
        }

        const textToCopy = this.lastTranslation.adapted;
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                UI.showNotification('✅ Traducción copiada al portapapeles', 'success');
                console.log('📋 Texto copiado:', textToCopy);
            })
            .catch(error => {
                console.error('Error al copiar:', error);
                UI.showNotification('❌ Error al copiar. Intenta manualmente', 'error');
            });
    },

    /**
     * Descarga el resultado como archivo de texto
     */
    handleDownloadResult: function() {
        if (!this.lastTranslation) {
            UI.showNotification('⚠️ No hay resultado para descargar', 'warning');
            return;
        }

        try {
            const indicators = this.lastTranslation.indicators || {};
            const content = `REPORTE DE TRADUCCIÓN
====================

TEXTO ORIGINAL:
${this.lastTranslation.original}

TRADUCCIÓN LITERAL:
${this.lastTranslation.literal}

TRADUCCIÓN ADAPTADA (RECOMENDADA):
${this.lastTranslation.adapted}

INDICADORES DE CALIDAD:
- Adaptación Cultural: ${indicators.adaptation || 0}%
- Tono: ${indicators.tone || 0}%
- Naturalidad: ${indicators.naturalness || 0}%
- Expresiones Reformuladas: ${indicators.expressions || 0}

NOTAS CULTURALES:
${this.lastTranslation.culturalNotes}

Generado: ${new Date().toLocaleString('es-ES')}`;

            const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `traduccion-${Date.now()}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            UI.showNotification('✅ Traducción descargada', 'success');
            console.log('⬇️ Archivo descargado');
        } catch (error) {
            console.error('❌ Error al descargar:', error);
            UI.showNotification('❌ Error al descargar el archivo', 'error');
        }
    }
};

// Verificación de carga
console.log('✓ TRANSLATOR cargado correctamente');
