import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'rc-dialog';
import _ from 'underscore';

export default class DialogMixin extends React.Component {

  constructor(props) {
    super(...arguments);
    this.bindMethods();
    this.dataField = props.modalType;
    this.state = {
      [this.dataField]: props.modalConfig[this.dataField]
    };
  }

  bindMethods() {
    this.onClose = this.onClose.bind(this);
    this.onDanger = this.onDanger.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentWillReceiveProps(next) {
    this.setState({
      [this.dataField]: next.modalConfig[this.dataField]
    });
  }

  getModalConfig() {
    return this.props.modalConfig;
  }

  onDanger() {
    this.props.modalMethods.onDanger(this.state[this.dataField]);
  }

  onCancel() {
    this.props.modalMethods.onClose();
  }

  onClose() {
    this.props.modalMethods.onClose()
  }

  onSuccess() {
    let updatedData = this.updateData();

    this.props.modalMethods.onSuccess(updatedData);
  }

  updateItemData(data) {
    return _.extend({}, this.state[this.dataField], data);
  }

  updateData() {
    return {};
  }

  getDialogTitle() {}

  getDialogBody() {}

  getDialogFooter() {
    let modalConfig = this.getModalConfig();
    let buttons = [];

    buttons.push(
      <button key={buttons.length}
              className="btn btn-default todo-dialog__footer_save-button"
              onClick={this.onCancel}>Cancel</button>
    );

    if (modalConfig[this.dataField].id) {
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
    let modalConfig = this.getModalConfig();

    return (
      <Dialog visible={this.props.isShowedModal}
              footer={this.getDialogFooter()}
              title={this.getDialogTitle()}
              onClose={this.onClose}>
        {this.getDialogBody()}
      </Dialog>
    );
  }

}
