export default {
  mounted(el) {
    el.addEventListener('mouseenter', () => {
      console.log('mouseenter triggered');
      el.style.transform = 'scale(1.1)';
      el.style.transition = 'transform 0.3s';
    });

    el.addEventListener('mouseleave', () => {
      console.log('mouseleave triggered');
      el.style.transform = 'scale(1)';
    });
  }
};