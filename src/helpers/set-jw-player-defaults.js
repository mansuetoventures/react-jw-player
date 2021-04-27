/* eslint-disable no-param-reassign */

const setJWPlayerDefaults = ({ context, playerId }) => {
  const playerConfigs = context.__JW_PLAYER_CONFIGS__ = (context.__JW_PLAYER_CONFIGS__ || {});
  const existingConfig = playerConfigs[playerId];

  if (existingConfig) {
    context.jwplayer.defaults = existingConfig;
  } else {
    if (typeof context.jwplayer === 'undefined'){
      playerConfigs[playerId] = {};  
    }else{
      playerConfigs[playerId] = context.jwplayer.defaults;
    }
  }
};

export default setJWPlayerDefaults;
