import React from 'react';
import TodoList from './todo-list';
import TodoActions from '../actions/todo-actions';
import TodoStore from '../stores/todo-store';

export default class MainSection extends React.Component {

  constructor() {
    super(...arguments);

    this.state = {
      todos: []
    };


    this.bindMethods();
  }

  bindMethods() {
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    TodoStore.addListener(this._onChange);
    this.loadTodos();
  }

  componentWillUnmount() {
    TodoStore.removeListener(this._onChange);
  }

  loadTodos() {
    TodoActions.loadData();
  }

  render() {
    return (
      <section role="main" className="main-section container">
        {this.state.todos.map(this.renderTodoList.bind(this))}
      </section>
    );
  }

  renderTodoList(todo) {
    return (
      <TodoList todo={todo} key={todo.id} />
    );
  }

  _onChange() {
    this.setState({
      todos: TodoStore.getAll()
    });
  }

}
