import ajax from 'reqwest';
import TaskActions from '../actions/task-actions';

export default {

  findAll(todoId) {
    return ajax({
      url: '/todos/' + todoId + '/tasks'
    }).then((data) => TaskActions.updateCollectionData(todoId, data));
  },

  complete(todoId, taskId) {
    return this._update(todoId, taskId, {
      isCompleted: true
    });
  },

  uncomplete(todoId, taskId) {
    return this._update(todoId, taskId, {
      isCompleted: false
    });
  },

  _update(todoId, taskId, taskData) {
    return ajax({
      url: '/todos/' + todoId + '/tasks/' + taskId,
      method: 'put',
      data: {
        task: taskData
      }
    }).then((data) => TaskActions.updateItemData(todoId, data));
  }

};
