import React from 'react';
import NotifyStore from '../stores/notify-store';
import NotifyActions from '../actions/notify-actions';

export default class AlertNotify extends React.Component {

  constructor() {
    super(...arguments);

    this.state = {
      showNotify: false,
      notifyConfig: {
        type: 'success'
      }
    };
  }

  bindMethods() {
    this.hideNotify = this.hideNotify.bind(this);
  }

  componentDidMount() {
    this.onChangeListener = NotifyStore.addListener(this.onChange.bind(this));
  }

  componentWillUnmount() {
    clearTimeout(this.showTimer);
    this.onChangeListener.remove();
  }

  componentWillUpdate(nextProps, nextState) {
    const showTime = 5000;

    if (nextState.showNotify) {
      clearTimeout(this.showTimer);
      this.showTimer = setTimeout(this.hideNotify, showTime);
    }
  }

  hideNotify() {
    NotifyActions.hideNotify();
  }

  onChange() {
    let config = NotifyStore.getConfig();
    this.setState(config);
  }

  render() {
    let notifyConfig = this.state.notifyConfig;
    let notifyClasses = `alert-notify ${this.state.showNotify ? 'show' : ''}`;
    let alertClasses = `alert alert-${notifyConfig.type}`;

    return (
      <div className={notifyClasses}>
        <div className={alertClasses}>
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>

          <strong>{notifyConfig.strongMessage}</strong>&nbsp;
          {notifyConfig.message}
        </div>
      </div>
    );
  }

}
