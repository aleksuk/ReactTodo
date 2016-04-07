import React from 'react';
import DialogMixin from '../mixins/dialog-mixin';
import TodoDialogStore from '../stores/todo-dialog-store';
import TodoActions from '../actions/todo-actions';
import TodoDialogActions from '../actions/todo-dialog-actions';

export default class TodoDialog extends DialogMixin {

  componentDidMount() {
    this.onChangeListener = TodoDialogStore.addListener(this.onChange);
  }

  componentWillUnmount() {
    this.onChangeListener.remove();
  }

  setInitState() {
    this.state = TodoDialogStore.getConfig();
  }

  bindMethods() {
    super.bindMethods(...arguments);
    this.onTitleChange = this.onTitleChange.bind(this);
  }

  onTitleChange(event) {
    let todo = this.updateItemData({
      title: event.target.value
    });

    this.setState({
      todo: todo
    });
  }

  getTodo() {
    return this.state.todo;
  }

  onChange() {
    let config = TodoDialogStore.getConfig();
    this.setState(config);
  }

  onClose() {
    TodoDialogActions.hideDialog();
  }

  onSuccess() {
    let todo = this.getTodo();
    TodoActions.save(todo);
  }

  onDanger() {
    let todo = this.getTodo();
    TodoActions.destroy(todo);
  }

  getDialogTitle() {
    let todo = this.getTodo();
    let title = (todo.id) ? 'Edit todo' : 'Create new todo';

    return (
      <div className="todo-dialog__header">
        <h3>{title}</h3>
      </div>
    );
  }

  getDialogBody() {
    let todo = this.getTodo();

    return (
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text"
                 id="title"
                 ref="title"
                 className="form-control"
                 value={todo.title}
                 onChange={this.onTitleChange}
                 placeholder="Input title ..." />
        </div>
      </form>
    );
  }

}
