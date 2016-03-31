import AppDispatcher from '../dispatcher/app-dispatcher';
import TaskConstants from '../constants/task-constants';
import Collection from '../utils/collection';
import { Store } from 'flux/utils';

var tasks = {};

function getTasks(todoId) {
  tasks[todoId] = tasks[todoId] || new Collection();

  return tasks[todoId];
}

class TaskStore extends Store {

  getAll(todoId) {
    return getTasks(todoId).toJSON();
  }

  __onDispatch(action) {
    switch (action.actionType) {
      case TaskConstants.TASKS_DATA_IS_UPDATED:
        getTasks(action.todoId).set(action.data.tasks);
        this.__emitChange();
        break;

      case TaskConstants.TASK_DATA_IS_UPDATED:
        getTasks(action.todoId).updateItem(action.data.task);
        this.__emitChange();
        break;
      case TaskConstants.TASK_UNCOMPLETE:
        // getTasks(action.todoId).add(action.data.task);
        // this.__emitChange();
        break;

      default:
        // no op
    }
  }

}

export default new TaskStore(AppDispatcher);
