import React from 'react';
import TodoActions from '../actions/todo-actions';
import TaskActions from '../actions/task-actions';
import TaskStore from '../stores/task-store';
import TaskItem from './task-item';
import TaskDialog from './task-dialog';

export default class TodoList extends React.Component {

  constructor() {
    super(...arguments);
    this.bindMethods();

    this.modalMethods = {
      onClose: this.closeTaskModal,
      onSuccess: this.onSaveTask,
      onDanger: this.onDestroyTask
    };

    this.state = {
      tasks: [],
      isShowedModal: false,
      modalConfig: {
        task: {}
      }
    };
  }

  bindMethods() {
    this.onChange = this.onChange.bind(this);
    this.editTodo= this.editTodo.bind(this);
    this.taskRender = this.taskRender.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.openTaskDilog = this.openTaskDilog.bind(this);
    this.closeTaskModal = this.closeTaskModal.bind(this);
    this.onSaveTask = this.onSaveTask.bind(this);
    this.onDestroyTask = this.onDestroyTask.bind(this);
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
    this.props.onEdit(this.props.todo);
  }

  taskRender(el) {
    return (
      <TaskItem key={el.id} task={el} onEdit={this.openTaskDilog} onDelete={this.onDestroyTask}/>
    );
  }

  onChange() {
    this.setState({
      tasks: TaskStore.getAll(this.props.todo.id)
    });
  }

  deleteTodo() {
    this.props.onDelete(this.props.todo);
  }

  onSaveTask(task) {
    this.closeTaskModal();

    if (task.id) {
      TaskActions.update(this.props.todo.id, task);
    } else {
      TaskActions.create(this.props.todo.id, task);
    }
  }

  onDestroyTask(task) {
    this.closeTaskModal();

    TaskActions.destroy(this.props.todo.id, task);
  }

  closeTaskModal() {
    this.setState({
      isShowedModal: false
    });
  }

  openTaskDilog(task) {
    this.setState({
      isShowedModal: true,
      modalConfig: {
        task: task
      }
    });
  }

  addTask() {
    this.openTaskDilog({});
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

        <TaskDialog isShowedModal={this.state.isShowedModal}
                    modalType={'task'}
                    modalConfig={this.state.modalConfig}
                    modalMethods={this.modalMethods}/>
      </section>
    );
  }

}
