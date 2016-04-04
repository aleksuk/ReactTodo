import ajax from 'reqwest';
import TodoActions from '../actions/todo-actions';
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

  find(id) {
    return ajax({
      url: todoUrl({ todoId: id })
    })
    .then((data) => {
      TodoActions.updateItemData(data)
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
      TodoActions.addItem(data)
    });
  },

  update(todo) {
    return ajax({
      method: 'put',
      url: todoUrl({ todoId: todo.id }),
      data: {
        todo: todo
      }
    }).then((data) => {
      TodoActions.updateItemData(data)
    });
  },

  destroy(todo) {
    return ajax({
      method: 'delete',
      url: todoUrl({ todoId: todo.id })
    }).then(() => {
      TodoActions.deleteItem({ todo: todo })
    });
  }

};
