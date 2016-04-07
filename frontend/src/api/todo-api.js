import ajax from 'reqwest';
import TodoActions from '../actions/todo-actions';
import NotifyActions from '../actions/notify-actions';
import TodoDialogActions from '../actions/todo-dialog-actions';
import showErrorNotify from '../utils/notify-error';
import _ from 'underscore';

var todoUrl = _.template('/todos/<%= todoId %>');
var todosListUrl = _.template('/todos');

export default {

  findAll() {
    return ajax({
      url: todosListUrl()
    }).then((data) => {
      TodoActions.updateCollectionData(data);
    });
  },

  create(todo) {
    return ajax({
      method: 'post',
      url: todosListUrl(),
      data: {
        todo: todo
      }
    }).then((data) => {
      TodoDialogActions.hideDialog();
      TodoActions.addItem(data)
      NotifyActions.showSuccessNotify({
        strongMessage: 'Success!',
        message: 'Todo created!'
      });
    }, showErrorNotify);
  },

  update(todo) {
    return ajax({
      method: 'put',
      url: todoUrl({ todoId: todo.id }),
      data: {
        todo: todo
      }
    }).then((data) => {
      TodoDialogActions.hideDialog();
      TodoActions.updateItemData(data)
      NotifyActions.showSuccessNotify({
        strongMessage: 'Success!',
        message: 'Todo updated!'
      });
    }, showErrorNotify);
  },

  destroy(todo) {
    return ajax({
      method: 'delete',
      url: todoUrl({ todoId: todo.id })
    }).then(() => {
      TodoDialogActions.hideDialog();
      TodoActions.deleteItem({ todo: todo })
      NotifyActions.showSuccessNotify({
        strongMessage: 'Success!',
        message: 'Todo destroyed!'
      });
    }, showErrorNotify);
  }

};
