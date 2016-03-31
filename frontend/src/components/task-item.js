import React from 'react';
import TaskActions from '../actions/task-actions';

export default class TaskItem extends React.Component {

  render() {
    return (
      <li className="task-item">
        <span>{this.props.task.title}</span>
        <input type="checkbox"
               name="isCompleted"
               onChange={this.completeTask.bind(this)}
               defaultChecked={this.props.task.isCompleted} />
      </li>
    );
  }

  completeTask() {
    if (this.props.task.isCompleted) {
      TaskActions.uncompleteTask(this.props.task.todo_id, this.props.task.id);
    } else {
      TaskActions.completeTask(this.props.task.todo_id, this.props.task.id);
    }
  }

}
