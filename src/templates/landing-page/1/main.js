import './style.css';

// DO NOT USE IN PRODUCTION!
// EXAMPLE CODE FOR DEMONSTRATION PURPOSE ONLY.

const navDrilldown = document.getElementById('nav-drilldown');
const navButton = document.getElementById('nav-button');
const pauseButton = document.getElementById('pause-button');
const video = document.querySelector('video');

navButton.addEventListener('click', () => {
  navDrilldown.open = true;
});

navDrilldown.addEventListener('dismiss', (e) => {
  e.target.open = false;
});

navDrilldown.addEventListener('update', (e) => {
  e.target.activeIdentifier = e.detail.activeIdentifier;
});

pauseButton.addEventListener('click', () => {
  const isPaused = video.paused;
  video[isPaused ? 'play' : 'pause']();
  pauseButton.textContent = isPaused ? 'Pause Video' : 'Play Video';
  pauseButton.icon = isPaused ? 'pause' : 'play';
});
