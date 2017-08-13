import { Dispatcher } from 'flux';

import lodash from 'lodash';

// window.lodash = lodash;

export default class DataDispatcher extends Dispatcher{

	dispatch(actionType, object, newObject){

		// console.log('DataDispatcher dispatch', actionType, object, newObject, object && object.place_id, newObject && newObject.place_id);

		let originalObject = object && lodash.cloneDeep(object) || null;

		return Dispatcher.prototype.dispatch.call(this, {
			type: actionType,
			object,
			newObject,
			originalObject,
		});
	}

	// Dispatcher.prototype.dispatch = function dispatch(payload) {
 //    !!this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.') : invariant(false) : undefined;
 //    this._startDispatching(payload);
 //    try {
 //      for (var id in this._callbacks) {
 //        if (this._isPending[id]) {
 //          continue;
 //        }
 //        this._invokeCallback(id);
 //      }
 //    } finally {
 //      this._stopDispatching();
 //    }
 //  };
}