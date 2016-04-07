import AppDispatcher from '../dispatcher/app-dispatcher';
import TaskDialogConstants from '../constants/task-dialog-constants';

var TaskDialogActions = {

  showDialog(todoId, data) {
    AppDispatcher.dispatch({
      actionType: TaskDialogConstants.TASK_DIALOG_SHOW,
      todoId: todoId,
      data: data
    });
  },

  hideDialog(data) {
    AppDispatcher.dispatch({
      actionType: TaskDialogConstants.TASK_DIALOG_HIDE,
      data: data
    });
  }

};

export default TaskDialogActions;
