export default {
  mounted(el) {
    el.addEventListener('mouseenter', () => {
      el.style.transform = 'scale(1.1)';
      el.style.transition = 'transform 0.3s';
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'scale(1)';
    });
  }
};