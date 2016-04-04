import React from 'react';
import TodoList from './todo-list';
import TodoDialog from './todo-dialog';
import TodoActions from '../actions/todo-actions';
import TodoStore from '../stores/todo-store';

export default class MainSection extends React.Component {

  constructor() {
    super(...arguments);
    this.bindMethods();

    this.modalMethods = {
      onClose: this.closeTodoModal,
      onSuccess: this.onSaveTodo,
      onDanger: this.onDestroyTodo
    };

    this.state = {
      todos: [],
      isShowedModal: false,
      modalConfig: {
        todo: {}
      }
    };
  }

  bindMethods() {
    this.onChange = this.onChange.bind(this);
    this.closeTodoModal = this.closeTodoModal.bind(this);
    this.showEditDialog = this.showEditDialog.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.onSaveTodo = this.onSaveTodo.bind(this);
    this.destroyTodo = this.destroyTodo.bind(this);
    this.onDestroyTodo = this.onDestroyTodo.bind(this);
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

  closeTodoModal() {
    this.setState({
      isShowedModal: false
    });
  }

  onSaveTodo(todo) {
    this.closeTodoModal();

    if (todo.id) {
      TodoActions.update(todo);
    } else {
      TodoActions.create(todo);
    }
  }

  onDestroyTodo(data) {
    this.closeTodoModal();
    this.destroyTodo(data);
  }

  destroyTodo(data) {
    TodoActions.destroy(data);
  }

  addTodo() {
    this.showEditDialog({});
  }

  showEditDialog(todo) {
    this.setState({
      isShowedModal: true,
      modalConfig: {
        todo: todo
      }
    });
  }

  renderTodoList(todo) {
    return (
      <TodoList todo={todo} key={todo.id} onEdit={this.showEditDialog} onDelete={this.destroyTodo} />
    );
  }
  
  render() {
    return (
      <section role="main" className="main-section container">
        {this.state.todos.map(this.renderTodoList.bind(this))}

        <TodoDialog isShowedModal={this.state.isShowedModal}
                    modalType={'todo'}
                    modalConfig={this.state.modalConfig}
                    modalMethods={this.modalMethods} />

        <footer>
          <button className="btn btn-default" onClick={this.addTodo}>Add todo list</button>
        </footer>
      </section>
    );
  }

}
