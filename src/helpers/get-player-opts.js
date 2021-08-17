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
    setTimeEvents: true,
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
      adscheduleid: 'tvI86lpF',
      schedule: [{
        offset: 'pre',
        tag: '{fallback_ad_tag_url}',
      }],
      bids: {
        bidders: [{
          id: '21449474',
          name: 'AppNexus',
        }, {
          id: '146271',
          name: 'EMX',
          pubid: '1976',
        }, {
          name: 'Rubicon',
          pubid: '12736',
          siteId: '372096',
          zoneId: '2033570',
        }, {
          id: '597208',
          name: 'DistrictM',
          pubid: '100226',
        }],
        settings: {
          mediationLayerAdServer: 'dfp',
          floorPriceCents: 300,
          buckets: [
            {
              min: 0,
              max: 5,
              increment: 0.05,
            },
            {
              min: 5,
              max: 10,
              increment: 0.1,
            },
            {
              min: 10,
              max: 20,
              increment: 0.25,
            },
            {
              min: 20,
              max: 100,
              increment: 1.0,
            },
          ],
          consentManagement: {
            gdpr: {
              cmpApi: 'iab',
              rules: {
                purpose: 'basicAds',
                enforcePurpose: true,
                enforceVendor: true,
              },
              defaultGdprScope: true,
              timeout: 3000, // GDPR timeout 3000ms
            },
            usp: {
              cmpApi: 'iab',
              timeout: 3000, // US Privacy timeout 3000ms
            },
          },
        },
      },
    };
  }

  if (typeof isAutoPlay !== 'undefined') {
    playerOpts.autostart = !!isAutoPlay;
  }

  if (image) {
    playerOpts.image = image;
  }

  return Object.assign(playerOpts, customProps);
}

export default getPlayerOpts;
