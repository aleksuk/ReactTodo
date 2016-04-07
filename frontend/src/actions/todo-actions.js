import AppDispatcher from '../dispatcher/app-dispatcher';
import TodoConstants from '../constants/todo-constants';
import TodoApi from '../api/todo-api';

var TodoActions = {

  save(data) {
    if (data.id) {
      this._update(data);
    } else {
      this._create(data);
    }
  },

  destroy(data) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_DESTROY,
      data: data
    });

    TodoApi.destroy(data);
  },

  loadData() {
    TodoApi.findAll();
  },

  updateCollectionData(data) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODOS_ARE_UPDATED,
      data: data
    });
  },

  updateItemData(data) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_IS_UPDATED,
      data: data
    });
  },

  addItem(data) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_IS_CREATED,
      data: data
    });
  },

  deleteItem(data) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_IS_DESTROYED,
      data: data
    });
  },

  _update(data) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_UPDATE,
      data: data
    });

    TodoApi.update(data);
  },

  _create(data) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_CREATE,
      data: data
    });

    TodoApi.create(data);
  }

};

export default TodoActions;
