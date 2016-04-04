import AppDispatcher from '../dispatcher/app-dispatcher';
import NotifyConstants from '../constants/notify-constants';

export default {

  showSuccessNotify(data) {
    AppDispatcher.dispatch({
      actionType: NotifyConstants.SHOW_SUCCESS_NOTIFY,
      data: data
    });
  },

  showDangerNotify(data) {
    AppDispatcher.dispatch({
      actionType: NotifyConstants.SHOW_DANGER_NOTIFY,
      data: data
    });
  },

  showInfoNotify(data) {
    AppDispatcher.dispatch({
      actionType: NotifyConstants.SHOW_INFO_NOTIFY,
      data: data
    });
  },

  showWarningNotify(data) {
    AppDispatcher.dispatch({
      actionType: NotifyConstants.SHOW_WARNING_NOTIFY,
      data: data
    });
  },

  hideNotify() {
    AppDispatcher.dispatch({
      actionType: NotifyConstants.HIDE_NOTIFY
    });
  }

};
