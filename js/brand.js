

// brands.js
const brandTrack = document.getElementById('brandTrack');

brandTrack.addEventListener('mouseenter', () => {
  brandTrack.style.animationPlayState = 'paused';
});

brandTrack.addEventListener('mouseleave', () => {
  brandTrack.style.animationPlayState = 'running';
});
