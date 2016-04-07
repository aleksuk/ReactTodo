import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'rc-dialog';
import _ from 'underscore';

export default class DialogMixin extends React.Component {

  constructor(props) {
    super(...arguments);
    this.bindMethods();
    this.setInitState();
  }

  bindMethods() {
    this.onClose = this.onClose.bind(this);
    this.onDanger = this.onDanger.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onCancel() {
    this.onClose();
  }

  updateItemData(data) {
    return _.extend({}, this.state[this.state.type], data);
  }

  setInitState() {}

  getDialogTitle() {}

  getDialogBody() {}

  onChange() {}

  getDialogFooter() {
    let buttons = [];

    buttons.push(
      <button key={buttons.length}
              className="btn btn-default todo-dialog__footer_save-button"
              onClick={this.onCancel}>Cancel</button>
    );

    if (this.state[this.state.type].id) {
      buttons.push(
        <button key={buttons.length}
                className="btn btn-danger todo-dialog__footer_save-button"
                onClick={this.onDanger}>Destroy</button>
      );
    }

    buttons.push(
      <button key={buttons.length}
        className="btn btn-success todo-dialog__footer_save-button"
        onClick={this.onSuccess}>Save</button>
    );

    return (
      <div className="todo-dialog__footer">
        {buttons}
      </div>
    );
  }

  render() {
    return (
      <Dialog visible={this.state.isShowedDialog}
              footer={this.getDialogFooter()}
              title={this.getDialogTitle()}
              onClose={this.onClose}>
        {this.getDialogBody()}
      </Dialog>
    );
  }

}
