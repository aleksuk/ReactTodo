import AppDispatcher from '../dispatcher/app-dispatcher';
import TaskConstants from '../constants/task-constants';
import TodoConstants from '../constants/todo-constants';
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
      case TaskConstants.TASKS_ARE_UPDATED:
        getTasks(action.todoId).set(action.data.tasks);
        this.__emitChange();
        break;

      case TaskConstants.TASK_IS_UPDATED:
        getTasks(action.todoId).updateItem(action.data.task);
        this.__emitChange();
        break;

      case TaskConstants.TASK_IS_DESTROYED:
        getTasks(action.todoId).remove(action.data.task);
        this.__emitChange();
        break;

      case TaskConstants.TASK_IS_CREATED:
        getTasks(action.todoId).add(action.data.task);
        this.__emitChange();
        break;

      case TodoConstants.TODO_IS_DESTROYED:
        getTasks(action.data.id).clear();
        tasks[action.data.id] = null;
        break;

      default:
        // no op
    }
  }

}

export default new TaskStore(AppDispatcher);
