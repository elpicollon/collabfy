const uuidV4 = require('uuid/v4');

class QueueItem {
  constructor(options = {}) {
    this.id = options.id || uuidV4();
    this.track = options.track || {};
    this.user = options.user || {};
    this.likes = options.likes || [];
    this.unlikes = options.unlikes || [];
    this.startTimestamp = options.startTimestamp || null;
    this.queuedTimestamp = options.queuedTimestamp || Date.now();
  }
  
  toJSON() {
    return {
      id: this.id,
      user: this.user,
      track: this.track,
      likes: this.likes,
      unlikes: this.unlikes,
      startTimestamp: this.startTimestamp
    };
  }
}

module.exports = QueueItem;
