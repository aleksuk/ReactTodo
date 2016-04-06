import _ from 'underscore';
import NotifyActions from '../actions/notify-actions';

export default function showError(response) {
  var defaultError = {
    field: 'Server Error!',
    message: 'Something went wrong!'
  };
  var error;

  try {
    let json = JSON.parse(response.responseText);
    error = _.first(json.errors) || defaultError;
  } catch (e) {
    error = defaultError;
  }

  NotifyActions.showDangerNotify({
    strongMessage: error.field,
    message: error.message
  });
}
