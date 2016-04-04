import _ from 'underscore';
import NotifyActions from '../actions/notify-actions';

export default function showError(response) {
  var error;

  try {
    let json = JSON.parse(response.responseText);
    error = _.first(json.errors);
  } catch (e) {
    error = {
      field: 'Server Error!',
      message: 'Something went wrong!'
    };
  }

  NotifyActions.showDangerNotify({
    strongMessage: error.field,
    message: error.message
  });
}
