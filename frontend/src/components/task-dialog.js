import React from 'react';
import DialogMixin from '../mixins/dialog-mixin';
import TaskActions from '../actions/task-actions';
import TaskDialogActions from '../actions/task-dialog-actions';
import TaskDialogStore from '../stores/task-dialog-store';

export default class TaskDialog extends DialogMixin {

  componentDidMount() {
    this.onChangeListener = TaskDialogStore.addListener(this.onChange);
  }

  componentWillUnmount() {
    this.onChangeListener.remove();
  }

  setInitState(props) {
    this.state = TaskDialogStore.getConfig();
  }

  bindMethods() {
    super.bindMethods(...arguments);

    this.onTitleChange = this.onTitleChange.bind(this);
  }

  onTitleChange(event) {
    let task = this.updateItemData({
      title: event.target.value
    });

    this.setState({
      task: task
    });
  }

  getTask() {
    return this.state.task;
  }

  onChange() {
    let config = TaskDialogStore.getConfig();
    this.setState(config);
  }

  onClose() {
    TaskDialogActions.hideDialog();
  }

  onSuccess() {
    let task = this.getTask();
    TaskActions.save(this.state.todoId, task);
  }

  onDanger() {
    let task = this.getTask();
    TaskActions.destroy(this.state.todoId, task);
  }

  getDialogTitle() {
    let task = this.getTask();
    let title = (task.id) ? 'Edit task' : 'Create new task';

    return (
      <div className="task-dialog__header">
        <h3>{title}</h3>
      </div>
    )
  }

  getDialogBody() {
    let task = this.getTask();

    return (
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text"
                 id="title"
                 ref="title"
                 className="form-control"
                 value={task.title}
                 onChange={this.onTitleChange}
                 placeholder="Input task title ..." />
        </div>
      </form>
    );
  }

}
