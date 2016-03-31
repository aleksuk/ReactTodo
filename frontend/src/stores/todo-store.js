import AppDispatcher from '../dispatcher/app-dispatcher';
import TodoConstants from '../constants/todo-constants';
import Collection from '../utils/collection';
import { Store } from 'flux/utils';

var todosCollection = new Collection();

class TodoStore extends Store {

  getAll() {
    return todosCollection.toJSON();
  }

  __onDispatch(action) {
    switch (action.actionType) {
      case TodoConstants.TODOS_DATA_IS_UPDATED:
        todosCollection.set(action.data.todos);
        this.__emitChange();
        break;

      case TodoConstants.TODO_CREATE:
        todos.push(action.data);
        this.__emitChange();
        break;

      default:
        // no op
    }
  }

}


export default new TodoStore(AppDispatcher);
