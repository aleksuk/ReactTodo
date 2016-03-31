import React from 'react';
import TodoActions from '../actions/todo-actions';
import TaskActions from '../actions/task-actions';
import TaskStore from '../stores/task-store';
import TaskItem from './task-item';

export default class TodoList extends React.Component {

  constructor() {
    super(...arguments);

    this.state = {
      tasks: []
    };

    this.bindMethods();
  }

  bindMethods() {
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    TaskStore.addListener(this._onChange);
    this.loadData();
  }

  componentWillUnmount() {
    TaskStore.removeListener(this._onChange);
  }

  loadData() {
    TaskActions.loadData(this.props.todo.id);
  }

  render() {
    return (
      <section className="todo-list">
        <h2>{this.props.todo.title}</h2>
        <ul>
          {this.state.tasks.map(this.taskRender.bind(this))}
        </ul>
      </section>
    );
  }

  taskRender(el) {
    return (
      <TaskItem key={el.id} task={el} />
    );
  }

  _onChange(id) {
    if (this.props.todo.id === id) {
      this.setState({
        tasks: TaskStore.getAll(this.props.todo.id)
      });
    }
  }
}
