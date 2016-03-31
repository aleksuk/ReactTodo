import AppDispatcher from '../dispatcher/app-dispatcher';
import TaskConstants from '../constants/task-constants';
import tasksApi from '../api/task-api';

var TaskActions = {
  //
  // create(todoId, data) {
  //   AppDispatcher.dispatch({
  //     actionType: TaskConstants.TASK_CREATE,
  //     data: data,
  //     todoId: todoId
  //   });
  // },
  //
  // update(todoId, id, data) {
  //   AppDispatcher.dispatch({
  //     actionType: TaskConstants.TASK_UPDATE_TEXT,
  //     id: id,
  //     data: data,
  //     todoId: todoId
  //   });
  // },

  loadData(todoId) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.TASKS_FETCH,
      todoId: todoId
    });

    tasksApi.findAll(todoId);
  },

  completeTask(todoId, id) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.TASK_COMPLETE,
      todoId: todoId,
      id: id
    });

    tasksApi.complete(todoId, id);
  },

  uncompleteTask(todoId, id) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.TASK_UNCOMPLETE,
      todoId: todoId,
      id: id
    });

    tasksApi.uncomplete(todoId, id);
  },

  updateCollectionData(todoId, data) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.TASKS_DATA_IS_UPDATED,
      todoId: todoId,
      data: data
    });
  },

  updateItemData(todoId, data) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.TASK_DATA_IS_UPDATED,
      todoId: todoId,
      data: data
    });
  }

};

export default TaskActions;
