function onBeforePlay(event, player) {
  const currentVideo = player.getPlaylistItem();

  if (typeof this.props.generatePrerollUrl === 'function') {
    if (player.getState() === 'paused') {
      return false;
    }
    player.playAd(this.props.generatePrerollUrl(currentVideo));
  }
}

export default onBeforePlay;
