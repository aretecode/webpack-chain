const merge = require('deepmerge');

module.exports = class {
  constructor(plugin = () => null, args = []) {
    this.plugin = plugin;
    this.args = args;
  }

  init(Plugin, args) {
    if (typeof Plugin === 'function') {
      return this.args.length ?
        new Plugin(...args) :
        new Plugin();
    }

    return Plugin;
  }

  tap(handler) {
    this.args = handler(this.args) || this.args;
  }

  inject(handler) {
    this.init = handler;
    return this;
  }

  merge(obj) {
    if (obj.plugin) {
      this.plugin = plugin;
    }

    if (obj.args) {
      this.args = merge(this.args, obj.args);
    }

    return this;
  }
};
