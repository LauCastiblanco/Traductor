const INDICATORS = {
  animateIndicators: function(indicators) {
    if (!indicators) return;

    console.log('📊 Animando indicadores:', indicators);

    // Adaptation
    if (indicators.adaptation !== undefined) {
      this.animateProgressBar('adaptationFill', indicators.adaptation, 'adaptationValue');
    }

    // Tone
    if (indicators.tone !== undefined) {
      this.animateProgressBar('toneFill', indicators.tone, 'toneValue');
    }

    // Naturalness
    if (indicators.naturalness !== undefined) {
      this.animateProgressBar('naturalnessFill', indicators.naturalness, 'naturalnessValue');
    }

    // Expressions
    if (indicators.expressions !== undefined) {
      const badge = HELPERS.getById('expressionsBadge');
      if (badge) {
        badge.textContent = indicators.expressions;
      }
    }
  },

  animateProgressBar: function(fillId, percentage, valueId) {
    const fill = HELPERS.getById(fillId);
    const value = HELPERS.getById(valueId);

    if (!fill) return;

    // Animar desde 0 a percentage
    let current = 0;
    const increment = Math.ceil(percentage / 20);
    const interval = setInterval(() => {
      if (current >= percentage) {
        current = percentage;
        clearInterval(interval);
      }

      fill.style.width = current + '%';
      if (value) value.textContent = current + '%';
      current += increment;
    }, 50);
  }
};

console.log('✓ INDICATORS cargado correctamente');
