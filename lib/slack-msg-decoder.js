'use strict';

var SlackMsgDecoder = function(message) {
  if (!(this instanceof SlackMsgDecoder)) {
    return new SlackMsgDecoder(message);
  }

  this.message = message;
  this.channelMap = {};
  this.userMap = {};
};

SlackMsgDecoder.prototype.toString = function() {
  return this.message;
};

SlackMsgDecoder.prototype.setSlackChanelMap = function(map) {
  this.channelMap = map;
  return this;
};

SlackMsgDecoder.prototype.setSlackUserMap = function(map) {
  this.userMap = map;
  return this;
};

SlackMsgDecoder.prototype.decodeChannel = function() {
  this.message = this.message.replace(/<#C\w{8}>/g, function(matched) {
    var
    channelId = matched.match(/#(C\w{8})/)[1],
    map = this.channelMap;

    return '#' + map[channelId];
  }.bind(this));
  return this;
};

SlackMsgDecoder.prototype.decodeUser = function() {
  this.message = this.message.replace(/<@U\w{8}>/g, function(matched) {
    var
    memberId = matched.match(/@(U\w{8})/)[1],
    map = this.userMap;

    return '@' + map[memberId];
  }.bind(this));
  return this;
};

SlackMsgDecoder.prototype.decodeURL = function() {
  var rex = /<(https?\:\/\/.+)\|.+>/g;
  this.message = this.message.replace(rex, function(matched, url) {
    return url.replace(/&amp;/g, '&');
  }.bind(this));
  return this;
};

SlackMsgDecoder.prototype.decodeAngel = function() {
  this.message = this.message.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  return this;
};

module.exports = SlackMsgDecoder;
