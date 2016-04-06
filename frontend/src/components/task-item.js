import React from 'react';
import TaskActions from '../actions/task-actions';

export default class TaskItem extends React.Component {

  constructor() {
    super(...arguments);

    this.bindMethods();
  }

  bindMethods() {
    this.changeTaskStatus = this.changeTaskStatus.bind(this);
    this.editTask = this.editTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  changeTaskStatus() {
    let task = this.props.task;

    if (task.isCompleted) {
      TaskActions.uncompleteTask(this.props.todo.id, task.id);
    } else {
      TaskActions.completeTask(this.props.todo.id, task.id);
    }
  }

  editTask() {
    this.props.onEdit(this.props.task);
  }

  deleteTask() {
    this.props.onDelete(this.props.task);
  }

  render() {
    return (
      <li className="task-item">
        <div className="task-item__status">
          <input type="checkbox"
                 name="isCompleted"
                 onChange={this.changeTaskStatus}
                 defaultChecked={this.props.task.isCompleted} />
        </div>

        <div className="task-item__content">
          <span>{this.props.task.title}</span>
        </div>

        <div className="task-item__buttons">
          <span className="glyphicon glyphicon-remove task-item__buttons-delete"
                onClick={this.deleteTask}></span>
                
          <span className="glyphicon glyphicon-edit task-item__buttons-edit"
                onClick={this.editTask}></span>
        </div>
      </li>
    );
  }

}
