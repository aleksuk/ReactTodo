import ajax from 'reqwest';
import TaskActions from '../actions/task-actions';

export default {

  findAll(todoId) {
    return ajax({
      url: '/todos/' + todoId + '/tasks'
    }).then((data) => TaskActions.updateCollectionData(data, todoId));
  }

};
