import Attributes from './attributes';
import Event from './event';
import { alias, immutable, eventEmitter } from '../utils/descriptors';
import { incrementCreator } from '../utils/key-creators';

const defaultKeyCreator = incrementCreator();
export default class Model extends Event {
  constructor (attributes = {}) {
    super();
    this._immutable = this.constructor.immutable || false;
    let initialAttributes = this.constructor.initialAttributes;
    this._attributes = new Attributes(Object.assign({}, initialAttributes, attributes));
    var keyCreator = this.constructor.key || defaultKeyCreator;
    if (typeof keyCreator === 'function') {
      this.key = keyCreator();
    } else if (keyCreator === 'string') {
      // use attribute
      Object.defineProperties(this, 'key', {
        get: function () {
          return this.get(keyCreator);
        }
      })
    }
  }

  @alias('update')
  @eventEmitter('update')
  @immutable()
  set (
    key,
    newValue
  ) {
    if (typeof key === 'string') {
      this._attributes = this._attributes.set(key, newValue)
    } else {
      this._attributes = this._attributes.merge(key);
    }
    return this;
  }

  get (attributeName) {
    return this._attributes.get(attributeName);
  }

  @eventEmitter('update')
  @immutable()
  remove (attributeName) {
    this._attributes = this._attributes.remove(attributeName);
    return this;
  }

  toJSON () {
    return this._attributes.toJSON();
  }

  toJSONStringify () {
    return JSON.stringify(this.toJSON());
  }
}
