'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function getPlayerOpts(opts) {
  var aspectRatio = opts.aspectRatio,
      _opts$customProps = opts.customProps,
      customProps = _opts$customProps === undefined ? {} : _opts$customProps,
      file = opts.file,
      generatePrerollUrl = opts.generatePrerollUrl,
      image = opts.image,
      isAutoPlay = opts.isAutoPlay,
      isMuted = opts.isMuted,
      licenseKey = opts.licenseKey,
      playlist = opts.playlist;


  var hasAdvertising = !!generatePrerollUrl;

  var playerOpts = {
    mute: !!isMuted,
    setTimeEvents: true
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
        tag: '{fallback_ad_tag_url}'
      }],
      bids: {
        bidders: [{
          id: '21449474',
          name: 'AppNexus'
        }, {
          id: '146271',
          name: 'EMX',
          pubid: '1976'
        }, {
          name: 'Rubicon',
          pubid: '12736',
          siteId: '372096',
          zoneId: '2033570'
        }, {
          id: '597208',
          name: 'DistrictM',
          pubid: '100226'
        }],
        settings: {
          mediationLayerAdServer: 'dfp',
          floorPriceCents: 300,
          buckets: [{
            min: 0,
            max: 5,
            increment: 0.05
          }, {
            min: 5,
            max: 10,
            increment: 0.1
          }, {
            min: 10,
            max: 20,
            increment: 0.25
          }, {
            min: 20,
            max: 100,
            increment: 1.0
          }],
          consentManagement: {
            gdpr: {
              cmpApi: 'iab',
              rules: {
                purpose: 'basicAds',
                enforcePurpose: true,
                enforceVendor: true
              },
              defaultGdprScope: true,
              timeout: 3000 // GDPR timeout 3000ms
            },
            usp: {
              cmpApi: 'iab',
              timeout: 3000 // US Privacy timeout 3000ms
            }
          }
        }
      }
    };
  }

  if (typeof isAutoPlay !== 'undefined') {
    playerOpts.autostart = !!isAutoPlay;
  }

  if (image) {
    playerOpts.image = image;
  }

  return _extends(playerOpts, customProps);
}

exports.default = getPlayerOpts;