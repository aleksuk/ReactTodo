import React from 'react';
import TodoActions from '../actions/todo-actions';
import TodoDialogActions from '../actions/todo-dialog-actions';
import TodoStore from '../stores/todo-store';
import TodoList from './todo-list';
import TodoDialog from './todo-dialog';
import TaskDialog from './task-dialog';

export default class MainSection extends React.Component {

  constructor() {
    super(...arguments);
    this.bindMethods();

    this.state = {
      todos: []
    };
  }

  bindMethods() {
    this.onChange = this.onChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  componentDidMount() {
    this.onChangeListener = TodoStore.addListener(this.onChange);
    this.loadTodos();
  }

  componentWillUnmount() {
    this.onChangeListener.remove();
  }

  loadTodos() {
    TodoActions.loadData();
  }

  onChange() {
    this.setState({
      todos: TodoStore.getAll()
    });
  }

  addTodo() {
    TodoDialogActions.showDialog({});
  }

  renderTodoList(todo) {
    return (
      <TodoList todo={todo} key={todo.id} />
    );
  }

  render() {
    return (
      <section role="main" className="main-section container">
        {this.state.todos.map(this.renderTodoList.bind(this))}

        <TodoDialog />
        <TaskDialog />

        <footer>
          <button className="btn btn-default" onClick={this.addTodo}>Add todo list</button>
        </footer>
      </section>
    );
  }

}
