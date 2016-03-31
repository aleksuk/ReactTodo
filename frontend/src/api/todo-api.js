import ajax from 'reqwest';
import TodoActions from '../actions/todo-actions';

export default {

  findAll() {
    return ajax({
      url: '/todos'
    }).then((data) => TodoActions.updateCollectionData(data));
  },

  find(id) {
    return ajax({
      url: '/todos/' + id
    })
    .then((data) => TodoActions.updateItemData(data));
  }

};
