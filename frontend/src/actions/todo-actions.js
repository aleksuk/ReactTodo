import AppDispatcher from '../dispatcher/app-dispatcher';
import TodoConstants from '../constants/todo-constants';
import todoApi from '../api/todo-api';

var TodoActions = {

  // create(data) {
  //   AppDispatcher.dispatch({
  //     actionType: TodoConstants.TODO_CREATE,
  //     data: data
  //   });
  // },
  //
  // update(id, data) {
  //   AppDispatcher.dispatch({
  //     actionType: TodoConstants.TODO_UPDATE_TEXT,
  //     id: id,
  //     data: data
  //   });
  // },

  loadData() {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODOS_FETCH
    });
    
    todoApi.findAll();
  },

  updateCollectionData(data) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODOS_DATA_IS_UPDATED,
      data: data
    });
  },

  updateItemData(data) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.UPDATE_ITEM_DATA,
      data: data
    });
  }

};

export default TodoActions;
