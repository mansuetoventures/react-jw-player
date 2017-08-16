function onBeforePlay(event, player) {
  const currentVideo = player.getPlaylistItem();

  if (typeof this.props.generatePrerollUrl === 'function') {
    player.playAd(this.props.generatePrerollUrl(currentVideo));
  }
}

export default onBeforePlay;
