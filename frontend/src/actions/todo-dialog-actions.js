import AppDispatcher from '../dispatcher/app-dispatcher';
import TodoDialogConstants from '../constants/todo-dialog-constants';

var TodoDialogActions = {

  showDialog(data) {
    AppDispatcher.dispatch({
      actionType: TodoDialogConstants.TODO_DIALOG_SHOW,
      data: data
    });
  },

  hideDialog(data) {
    AppDispatcher.dispatch({
      actionType: TodoDialogConstants.TODO_DIALOG_HIDE,
      data: data
    });
  }

};

export default TodoDialogActions;
