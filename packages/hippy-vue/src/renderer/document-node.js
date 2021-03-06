import CommentNode from './comment-node';
import ElementNode from './element-node';
import ViewNode from './view-node';
import TextNode from './text-node';
import InputNode from './input-node';
import ListNode from './list-node';
import { Event } from './native/event';

class DocumentNode extends ViewNode {
  constructor() {
    super();

    this.documentElement = new ElementNode('document');

    // make static methods accessible via this
    this.createComment = this.constructor.createComment;
    this.createElement = this.constructor.createElement;
    this.createElementNS = this.constructor.createElementNS;
    this.createTextNode = this.constructor.createTextNode;
  }

  static createComment(text) {
    return new CommentNode(text);
  }

  static createElement(tagName) {
    // TODO: create element instance by tagName definition.
    switch (tagName) {
      case 'input':
      case 'textarea':
        return new InputNode(tagName);
      case 'ul':
        return new ListNode(tagName);
      default:
        return new ElementNode(tagName);
    }
  }

  static createElementNS(namespace, tagName) {
    return new ElementNode(`${namespace}:${tagName}`);
  }

  static createTextNode(text) {
    return new TextNode(text);
  }

  static createEvent(eventName) {
    const eventInstance = new Event(eventName);
    return eventInstance;
  }
}

export default DocumentNode;
