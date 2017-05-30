import { Dispatcher } from 'flux';

export default class DataDispatcher extends Dispatcher{

	dispatch(actionType, object){

		console.log('DataDispatcher dispatch', actionType, object);

		return Dispatcher.prototype.dispatch.call(this, {
			type: actionType,
			object
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