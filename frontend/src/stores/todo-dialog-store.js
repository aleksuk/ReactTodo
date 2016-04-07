import AppDispatcher from '../dispatcher/app-dispatcher';
import TodoDialogConstants from '../constants/todo-dialog-constants';
import _ from 'underscore';
import { Store } from 'flux/utils';

var config = {
  type: 'todo',
  isShowedDialog: false,
  todo: {}
};

var defaultFieldValues = {
  title: ''
};

function showDialog(data) {
  config = _.extend({}, config, {
    isShowedDialog: true,
    todo: _.extend({}, defaultFieldValues, data)
  });
}

function hideDialog() {
  config = _.extend({}, config, {
    isShowedDialog: false
  });
}

class TodoDialogStore extends Store {

  getConfig() {
    return config;
  }

  __onDispatch(action) {
    switch (action.actionType) {
      case TodoDialogConstants.TODO_DIALOG_SHOW:
        showDialog(action.data);
        this.__emitChange();
        break;

      case TodoDialogConstants.TODO_DIALOG_HIDE:
        hideDialog();
        this.__emitChange();
        break;

      default:
        // no op
    }
  }

}

export default new TodoDialogStore(AppDispatcher);
