function getPlayerOpts(opts) {
  const {
    aspectRatio,
    customProps = {},
    file,
    generatePrerollUrl,
    image,
    isAutoPlay,
    isMuted,
    licenseKey,
    playlist,
  } = opts;

  const hasAdvertising = !!generatePrerollUrl;

  const playerOpts = {
    mute: !!isMuted,
  };

  if (licenseKey) {
    playerOpts.key = licenseKey;
  }

  if (playlist) {
    playerOpts.playlist = playlist;
  } else if (file) {
    playerOpts.file = file;
  }

  if (aspectRatio && aspectRatio !== 'inherit') {
    playerOpts.aspectratio = aspectRatio;
  }

  if (hasAdvertising) {
    playerOpts.advertising = {
      client: 'googima',
      admessage: 'Ad — xxs left',
      autoplayadsmuted: true,
    };
  }

  if (typeof isAutoPlay !== 'undefined') {
    playerOpts.autostart = !!isAutoPlay;
  }

  if (image) {
    playerOpts.image = image;
  }

  // Global setting since multiple refs
  playerOpts.setTimeEvents = true;

  return Object.assign(playerOpts, customProps);
}

export default getPlayerOpts;
