import AppDispatcher from '../dispatcher/app-dispatcher';
import TaskDialogConstants from '../constants/task-dialog-constants';
import _ from 'underscore';
import { Store } from 'flux/utils';

var config = {
  todoId: null,
  type: 'task',
  isShowedDialog: false,
  task: {}
};

var defaultFieldValues = {
  title: ''
};

function showDialog(todoId, data) {
  config = _.extend({}, config, {
    todoId: todoId,
    isShowedDialog: true,
    task: _.extend({}, defaultFieldValues, data)
  });
}

function hideDialog() {
  config = _.extend({}, config, {
    isShowedDialog: false
  });
}

class TaskDialogStore extends Store {

  getConfig() {
    return config;
  }

  __onDispatch(action) {
    switch (action.actionType) {
      case TaskDialogConstants.TASK_DIALOG_SHOW:
        showDialog(action.todoId, action.data);
        this.__emitChange();
        break;

      case TaskDialogConstants.TASK_DIALOG_HIDE:
        hideDialog();
        this.__emitChange();
        break;

      default:
        // no op
    }
  }

}

export default new TaskDialogStore(AppDispatcher);
