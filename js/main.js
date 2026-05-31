// ============================================
// Main - Inicialización y Control Global
// ============================================

/**
 * ARCHIVO PRINCIPAL
 * Se ejecuta cuando el DOM está completamente cargado
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('📦 Iniciando aplicación Traductor Cultural...');
    
    // Verificar que todos los módulos estén cargados
    console.log('Verificando módulos...');
    console.log('✓ HELPERS:', typeof HELPERS !== 'undefined' ? 'OK' : 'ERROR');
    console.log('✓ VALIDATORS:', typeof VALIDATORS !== 'undefined' ? 'OK' : 'ERROR');
    console.log('✓ UI:', typeof UI !== 'undefined' ? 'OK' : 'ERROR');
    console.log('✓ INDICATORS:', typeof INDICATORS !== 'undefined' ? 'OK' : 'ERROR');
    console.log('✓ API:', typeof API !== 'undefined' ? 'OK' : 'ERROR');
    console.log('✓ TRANSLATOR:', typeof TRANSLATOR !== 'undefined' ? 'OK' : 'ERROR');

    try {
        // Inicializar traductor principal
        if (typeof TRANSLATOR !== 'undefined' && TRANSLATOR.init) {
            TRANSLATOR.init();
            console.log('✅ Aplicación lista para usar');
        } else {
            throw new Error('TRANSLATOR no está definido');
        }
    } catch (error) {
        console.error('❌ Error crítico al inicializar la aplicación:', error);
        // Mostrar mensaje de error genérico al usuario
        const container = document.querySelector('.container');
        if (container) {
            const errorDiv = document.createElement('div');
            errorDiv.style.cssText = 'color: #dc2626; padding: 2rem; text-align: center; background: #fee2e2; border-radius: 0.75rem; margin: 2rem 0;';
            errorDiv.innerHTML = `
                <h2 style="margin-bottom: 1rem;">❌ Error al inicializar la aplicación</h2>
                <p style="margin-bottom: 1rem;">Detalles: ${error.message}</p>
                <p>Por favor, recarga la página (Ctrl + F5).</p>
            `;
            container.insertBefore(errorDiv, container.firstChild);
        }
    }
});

// ========== GLOBAL ERROR HANDLING ==========

/**
 * Maneja errores globales no capturados
 */
window.addEventListener('error', function(event) {
    console.error('⚠️ Error global no manejado:', event.error);
});

/**
 * Maneja promesas rechazadas no manejadas
 */
window.addEventListener('unhandledrejection', function(event) {
    console.error('⚠️ Promesa rechazada sin manejar:', event.reason);
});

// ========== FEATURE DETECTION ==========

/**
 * Verifica que el navegador soporte características necesarias
 */
function checkBrowserSupport() {
    const requiredAPIs = [
        { name: 'Fetch API', check: typeof fetch !== 'undefined' },
        { name: 'Clipboard API', check: typeof navigator.clipboard !== 'undefined' },
        { name: 'localStorage', check: typeof localStorage !== 'undefined' }
    ];

    requiredAPIs.forEach(api => {
        if (api.check) {
            console.log(`✓ ${api.name} soportado`);
        } else {
            console.warn(`⚠ ${api.name} NO soportado`);
        }
    });
}

// Ejecutar verificación cuando todo está listo
setTimeout(() => {
    try {
        checkBrowserSupport();
    } catch (error) {
        console.error('Error en checkBrowserSupport:', error);
    }
}, 500);
