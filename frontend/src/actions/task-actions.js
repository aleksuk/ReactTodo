import AppDispatcher from '../dispatcher/app-dispatcher';
import TaskConstants from '../constants/task-constants';
import TaskApi from '../api/task-api';

var TaskActions = {

  loadData(todoId) {
    TaskApi.findAll(todoId);
  },

  create(todoId, data) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.TASK_CREATE,
      data: data,
      todoId: todoId
    });

    TaskApi.create(todoId, data);
  },

  update(todoId, data) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.TASK_UPDATE,
      data: data,
      todoId: todoId
    });

    TaskApi.update(todoId, data);
  },

  destroy(todoId, data) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.TASK_DESTROY,
      data: data,
      todoId: todoId
    });

    TaskApi.destroy(todoId, data);
  },

  completeTask(todoId, id) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.TASK_COMPLETE,
      todoId: todoId,
      id: id
    });

    TaskApi.complete(todoId, id);
  },

  uncompleteTask(todoId, id) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.TASK_UNCOMPLETE,
      todoId: todoId,
      id: id
    });

    TaskApi.uncomplete(todoId, id);
  },

  updateCollectionData(todoId, data) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.TASKS_ARE_UPDATED,
      todoId: todoId,
      data: data
    });
  },

  updateItemData(todoId, data) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.TASK_IS_UPDATED,
      todoId: todoId,
      data: data
    });
  },

  addItem(todoId, data) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.TASK_IS_CREATED,
      todoId: todoId,
      data: data
    });
  },

  deleteItem(todoId, data) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.TASK_IS_DESTROYED,
      todoId: todoId,
      data: data
    });
  }

};

export default TaskActions;
