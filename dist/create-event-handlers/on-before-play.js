'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function onBeforePlay(event, player) {
  var currentVideo = player.getPlaylistItem();

  if (typeof this.props.generatePrerollUrl === 'function') {
    if (player.getState() === 'paused') {
      return false;
    }
    player.playAd(this.props.generatePrerollUrl(currentVideo));
  }
}

exports.default = onBeforePlay;