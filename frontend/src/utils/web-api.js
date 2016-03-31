import _ from 'underscore';
import ajax from 'reqwest';

class WebUtils {
  
  constructor(config = {}) {
    this.data = config.data || [];
    this.config = config;
    this.actions = config.actions;
    this.urlTpl = _.template(config.url);
    this.__dispatcher = config.dispatcher;
  }
  
  findAll(config = {}) {
    return ajax({
        url: this.config.url
        // url: this.urlTpl(config)
      }).then((data) => {
        this.data = data[this.config.collectionWrapper];
        return data;
      });
  }
  
  find(id) {
    return _.find(this.data, 'id', id);
  }
  
  update(id, data) {
    var item = _.find(this.data, 'id', id);
    
    return ajax({
      url: this.config.url + '/' + id,
      type: 'json',
      method: 'put',
      data: {
        [this.config.modelWrapper]: _.extend(item, data)
      }
    });
  }
  
  destroy(data) {
    return ajax({
      url: data.url,
      method: 'delete'
    });
  }
  
  create(data) {
    return ajax({
      url: data.url,
      method: 'post',
      data: {
        [this.config.modelWrapper]: data
      }
    }).then((data) => {
      this.data.push(data);
      return data;
    });
  }
  
}