import React from 'react';
import ReactDOM from 'react-dom';
import DialogMixin from '../mixins/dialog-mixin';
import _ from 'underscore';

export default class TodoDialog extends DialogMixin {

  bindMethods() {
    super.bindMethods(...arguments);
    this.onTitleChange = this.onTitleChange.bind(this);
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
                 value={this.state[this.dataField].title}
                 onChange={this.onTitleChange}
                 placeholder="Input title ..." />
        </div>
      </form>
    );
  }

  getDialogTitle() {
    let modalConfig = this.getModalConfig();
    let title = (modalConfig[this.dataField].id) ? 'Edit todo' : 'Create new todo';

    return (
      <div className="todo-dialog__header">
        <h3>{title}</h3>
      </div>
    );
  }

  updateData(data) {
    let refs = this.refs;

    return this.updateItemData({
      title: refs.title.value
    });
  }

  onTitleChange(event) {
    let todo = this.updateItemData({
      title: event.target.value
    });

    this.setState({
      todo: todo
    });
  }

}
