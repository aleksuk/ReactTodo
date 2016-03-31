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
  },

  uncompleteTask(todoId, id) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.TASK_UNCOMPLETE,
      todoId: todoId,
      id: id
    });
  },

  updateCollectionData(data, todoId) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TASKS_DATA_IS_UPDATED,
      todoId: todoId,
      data: data
    });
  }

};

export default TaskActions;
