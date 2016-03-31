import _ from 'underscore';

export default class Collection {

  constructor(data = []) {
    this.data = data;
  }

  find(id) {
    return _.find(this.data, 'id', id);
  }

  toJSON() {
    return this.data;
  }

  set(data) {
    this.data = data || [];
  }

  add(data) {
    this.data.push(data);
  }

  clear() {
    this.data = [];
  }

  updateItem(data) {
    var item = this.find(data.id);
    
    _.extend(item, data);
  }

}
