import ajax from 'reqwest';
import TaskActions from '../actions/task-actions';
import NotifyActions from '../actions/notify-actions';
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
      NotifyActions.showSuccessNotify({
        strongMessage: 'Task',
        message: 'success created!'
      });

      TaskActions.addItem(todoId, data);
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
      NotifyActions.showSuccessNotify({
        strongMessage: 'Success!',
        message: 'Task destroyed!'
      });

      TaskActions.deleteItem(todoId, { task: task });
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
      NotifyActions.showSuccessNotify({
        strongMessage: 'Success!',
        message: 'Task updated!'
      });

      TaskActions.updateItemData(urlParams.todoId, data)
    }, showErrorNotify);
  }

};
