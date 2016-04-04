import AppDispatcher from '../dispatcher/app-dispatcher';
import NotifyConstants from '../constants/notify-constants';
import { Store } from 'flux/utils';

var config = {
  showNotify: false,
  notifyConfig: {}
};

function updateConfig(type, data) {
  config.showNotify = true;
  config.notifyConfig = {
    type: type,
    strongMessage: data.strongMessage,
    message: data.message
  };
}

function hideNotify() {
  config.showNotify = false;
}

class NotifyStore extends Store {

  getConfig() {
    return config;
  }

  __onDispatch(action) {
    switch (action.actionType) {
      case NotifyConstants.SHOW_SUCCESS_NOTIFY:
        updateConfig('success', action.data);
        this.__emitChange();
        break;

      case NotifyConstants.SHOW_DANGER_NOTIFY:
        updateConfig('danger', action.data);
        this.__emitChange();
        break;

      case NotifyConstants.SHOW_INFO_NOTIFY:
        updateConfig('info', action.data);
        this.__emitChange();
        break;

      case NotifyConstants.SHOW_WARNING_NOTIFY:
        updateConfig('warning', action.data);
        this.__emitChange();
        break;

      case NotifyConstants.HIDE_NOTIFY:
        hideNotify();
        this.__emitChange();
        break;

      default:
        // no op
    }
  }

}

export default new NotifyStore(AppDispatcher);
