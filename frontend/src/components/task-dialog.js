import React from 'react';
import ReactDOM from 'react-dom';
import DialogMixin from '../mixins/dialog-mixin';

export default class TaskDialog extends DialogMixin {

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

  updateData(data) {
    let refs = this.refs;

    return this.updateItemData({
      title: refs.title.value
    });
  }

  getDialogBody() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text"
                 id="title"
                 ref="title"
                 className="form-control"
                 value={this.state.task.title}
                 onChange={this.onTitleChange}
                 placeholder="Input task title ..." />
        </div>
      </form>
    );
  }

  getDialogTitle() {
    let modalConfig = this.getModalConfig();
    let title = (modalConfig[this.dataField].id) ? 'Edit task' : 'Create new task';

    return (
      <div className="todo-dialog__header">
        <h3>{title}</h3>
      </div>
    )
  }

}
