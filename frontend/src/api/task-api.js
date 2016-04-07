import ajax from 'reqwest';
import TaskActions from '../actions/task-actions';
import NotifyActions from '../actions/notify-actions';
import TaskDialogActions from '../actions/task-dialog-actions';
import showErrorNotify from '../utils/notify-error';
import _ from 'underscore';

var tasksListUrl = _.template('/todos/<%= todoId %>/tasks');
var taskUrl = _.template('/todos/<%= todoId %>/tasks/<%= taskId %>')

export default {

  findAll(todoId) {
    return ajax({
      url: tasksListUrl({ todoId: todoId })
    }).then((data) => {
      TaskActions.updateCollectionData(todoId, data);
    }, showErrorNotify);
  },

  create(todoId, taskData) {
    return ajax({
      url: tasksListUrl({ todoId: todoId }),
      method: 'post',
      data: {
        task: taskData
      }
    }).then((data) => {
      TaskDialogActions.hideDialog();
      TaskActions.addItem(todoId, data);
      NotifyActions.showSuccessNotify({
        strongMessage: 'Task',
        message: 'success created!'
      });
    }, showErrorNotify);
  },

  update(todoId, task) {
    return this._update({ todoId: todoId, taskId: task.id }, task);
  },

  destroy(todoId, task) {
    return ajax({
      url: taskUrl({ todoId: todoId, taskId: task.id }),
      method: 'delete'
    }).then(() => {
      TaskDialogActions.hideDialog();
      TaskActions.deleteItem(todoId, { task: task });
      NotifyActions.showSuccessNotify({
        strongMessage: 'Success!',
        message: 'Task destroyed!'
      });
    }, showErrorNotify);
  },

  complete(todoId, taskId) {
    return this._update({ todoId: todoId, taskId: taskId }, {
      isCompleted: true
    });
  },

  uncomplete(todoId, taskId) {
    return this._update({ todoId: todoId, taskId: taskId }, {
      isCompleted: false
    });
  },

  _update(urlParams, taskData) {
    return ajax({
      url: taskUrl(urlParams),
      method: 'put',
      data: {
        task: taskData
      }
    }).then((data) => {
      TaskDialogActions.hideDialog();
      TaskActions.updateItemData(urlParams.todoId, data)
      NotifyActions.showSuccessNotify({
        strongMessage: 'Success!',
        message: 'Task updated!'
      });
    }, showErrorNotify);
  }

};
