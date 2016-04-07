import React from 'react';
import TodoActions from '../actions/todo-actions';
import TaskActions from '../actions/task-actions';
import TodoDialogActions from '../actions/todo-dialog-actions';
import TaskDialogActions from '../actions/task-dialog-actions';
import TaskStore from '../stores/task-store';
import TaskItem from './task-item';
import TaskDialog from './task-dialog';

export default class TodoList extends React.Component {

  constructor() {
    super(...arguments);
    this.bindMethods();

    this.state = {
      tasks: []
    };
  }

  bindMethods() {
    this.onChange = this.onChange.bind(this);
    this.editTodo= this.editTodo.bind(this);
    this.taskRender = this.taskRender.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  componentDidMount() {
    this.onChangeListener = TaskStore.addListener(this.onChange);

    this.loadData();
  }

  componentWillUnmount() {
    this.onChangeListener.remove();
  }

  loadData() {
    TaskActions.loadData(this.props.todo.id);
  }

  editTodo() {
    TodoDialogActions.showDialog(this.props.todo);
  }

  taskRender(el) {
    return (
      <TaskItem key={el.id}
                task={el}
                todo={this.props.todo} />
    );
  }

  onChange() {
    this.setState({
      tasks: TaskStore.getAll(this.props.todo.id)
    });
  }

  deleteTodo() {
    TodoActions.destroy(this.props.todo);
  }

  addTask() {
    TaskDialogActions.showDialog(this.props.todo.id, {});
  }

  getEmptyList() {
    return (
      <li className="task-item">
        <span>{'Tasks aren\'t created ...'}</span>
      </li>
    );
  }

  render() {
    let tasks = (this.state.tasks.length) ? this.state.tasks.map(this.taskRender): this.getEmptyList();

    return (
      <section className="todo-list">
        <header className="todo-list__header">
          <h2 className="todo-list__header__title">{this.props.todo.title}</h2>

          <div className="todo-list__header__buttons">
            <span title="Delete"
                  className="glyphicon glyphicon-trash todo-list__header__buttons_delete-button"
                  onClick={this.deleteTodo}></span>

            <span title="Edit"
                  className="glyphicon glyphicon-edit todo-list__header__buttons_edit-button"
                  onClick={this.editTodo}></span>

            <span title="Add"
                  className="glyphicon glyphicon-plus todo-list__header__buttons_add-button"
                  onClick={this.addTask}></span>
          </div>
        </header>

        <ul className="todo-list__list">
          {tasks}
        </ul>
      </section>
    );
  }

}
