import { Dispatcher } from 'flux';

import lodash from 'lodash';

export default class DataDispatcher extends Dispatcher{

	dispatch(actionType, object, newObject){

		let originalObject;

		switch(actionType){

			case 'UPDATE_OBJECT':

				originalObject = object && lodash.cloneDeep(object) || null;
				break;

			default: ;

		}

		return Dispatcher.prototype.dispatch.call(this, {
			type: actionType,
			object,
			newObject,
			originalObject,
		});
	}
}