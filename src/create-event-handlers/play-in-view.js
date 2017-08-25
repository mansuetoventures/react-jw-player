import throttle from 'lodash.throttle';

export default class {
  constructor(player, { percentage }) {
    this.percentage = percentage || 10;
    this.player = player;
    this.wrapper = this.player.getContainer();
    this.throttledScrollListener = throttle(() => {
      this.playerInView();
    }, 300);
  }

  playerPosition(playerEl) {
    if (playerEl && playerEl.getBoundingClientRect) {
      const bodyRect = document.body.getBoundingClientRect();
      const playerRect = playerEl.getBoundingClientRect();
      return playerRect.top - bodyRect.top - this.scrollPosition().top;
    }
    return null;
  }

  scrollPosition() {
    const doc = document.documentElement;
    return {
      left: (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0),
      top: (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0),
    };
  }

  playerInView() {
    const percentagePlayerHeight = this.player.getHeight() / this.percentage;
    const difference = this.playerPosition(this.wrapper) + percentagePlayerHeight;
    const adjust = window.innerHeight > percentagePlayerHeight * 5
      ? window.innerHeight
      : 100;
    const inView = difference > percentagePlayerHeight * -6 && difference < adjust;
    const state = this.player.getState();

    if (state === 'buffering' && inView) {
      return false;
    }

    if (state === 'buffering' && !inView) {
      this.player.pause();
    }

    if (state === 'idle' && inView) {
      this.player.play();
    }

    if (state === 'idle' && !inView) {
      return false;
    }

    if (state === 'playing' && !inView) {
      this.player.pause(true);
    }

    if (state === 'playing' && inView) {
      return false;
    }

    if (state === 'paused' && inView) {
      this.player.pause(false);
    }

    if (state === 'paused' && !inView) {
      return false;
    }

    return false;
  }

  on() {
    window.addEventListener('scroll', this.throttledScrollListener);
  }

  off() {
    window.removeEventListener('scroll', this.throttledScrollListener);
  }
}
