import AppDispatcher from '../dispatcher/app-dispatcher';
import TodoConstants from '../constants/todo-constants';
import TodoApi from '../api/todo-api';

var TodoActions = {

  create(data) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_CREATE,
      data: data
    });

    TodoApi.create(data);
  },

  destroy(data) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_DESTROY,
      data: data
    });

    TodoApi.destroy(data);
  },

  update(data) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_UPDATE,
      data: data
    });

    TodoApi.update(data);
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
  }

};

export default TodoActions;
