import React, { Component } from 'react';

import createEventHandlers from './create-event-handlers';
import getCurriedOnLoad from './helpers/get-curried-on-load';
import getPlayerOpts from './helpers/get-player-opts';
import initialize from './helpers/initialize';
import installPlayerScript from './helpers/install-player-script';
import PlayInView from './create-event-handlers/play-in-view';

import defaultProps from './default-props';
import propTypes from './prop-types';

const displayName = 'ReactJWPlayer';

class ReactJWPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adHasPlayed: false,
      hasPlayed: false,
      hasFired: {},
    };
    this.eventHandlers = createEventHandlers(this);
    this.uniqueScriptId = 'jw-player-script';

    if (props && props.playerId) {
      this.uniqueScriptId += `-${props.playerId}`;
    }

    this._initialize = this._initialize.bind(this);
  }
  componentDidMount() {
    const isJWPlayerScriptLoaded = !!window.jwplayer;
    const existingScript = document.getElementById(this.uniqueScriptId);

    if (isJWPlayerScriptLoaded && existingScript) {
      this._initialize();
      return;
    }

    if (!existingScript) {
      installPlayerScript({
        context: document,
        onLoadCallback: this._initialize,
        scriptSrc: this.props.playerScript,
        uniqueScriptId: this.uniqueScriptId,
      });
    } else {
      existingScript.onload = getCurriedOnLoad(existingScript, this._initialize);
    }
  }

  componentWillUnmount() {
    if (this.player && this.player.remove) { this.player.remove(); }
    if (this.viewController) { this.viewController.off(); }
  }

  _initialize() {
    const component = this;
    const player = window.jwplayer(this.props.playerId);
    this.player = player;
    const playerOpts = getPlayerOpts(this.props);

    // initialize player configs object
    window.jwplayer.playerConfigs = window.jwplayer.playerConfigs || {};

    // check if the current player's config was already cached
    if (window.jwplayer.playerConfigs[this.props.playerId]) {
      // apply the cached config
      window.jwplayer.defaults = window.jwplayer.playerConfigs[this.props.playerId];
    } else {
      // cache the new config
      window.jwplayer.playerConfigs[this.props.playerId] = window.jwplayer.defaults;
    }

    initialize({ component, player, playerOpts });

    if (this.props.playInView) {
      this.viewController = new PlayInView(this.player, this.props.playInViewPercentage);
      this.viewController.on();

      this.player.on('displayClick', () => {
        // If user initiated pause, it should remove auto scroll play functionality for that session
        this.viewController.off();
      });
    }
  }

  render() {
    return (
      <div
        className={this.props.className}
        dangerouslySetInnerHTML={{
          __html: `<div id="${this.props.playerId}"></div>`,
        }}
      />
    );
  }
}

ReactJWPlayer.defaultProps = defaultProps;
ReactJWPlayer.displayName = displayName;
ReactJWPlayer.propTypes = propTypes;
export default ReactJWPlayer;
