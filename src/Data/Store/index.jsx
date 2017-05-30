// import AppDispatcher from '../dispatcher/app-dispatcher';
import { CREATE, REMOVE } from '../../Panel/GridPanel/constants/message-constants';
import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';
import { Dispatcher } from 'flux'; 
 

const defaultProps = {
	dsf: "SDFds",
}

export default class MessageStore extends ReduceStore {  
 
	actions = {
		CREATE: 'CREATE_MESSAGE',
		REMOVE: 'REMOVE_MESSAGE',
		GET_AT: 'GET_AT_MESSAGE',
		FIND: 	'FIND_MESSAGE',
		SET_DATA: 	'SET_DATA',
	}

	getInitialState() {   

		// console.log('Immutable.fromJS([])', Immutable.fromJS([]));
		// console.log('');

	 return Immutable.fromJS([]);  
	}  

	getState(){
		return this._state.toJS();
	}

	reduce(state, action, data) {    
   	
 		console.log('reduce(state, action)', action, data);   

	 switch (action.type) {    

	   case this.actions.SET_DATA:   

	 		return Immutable.fromJS(action.object);    


	   case this.actions.CREATE:   

	    return this.create(state, action);   


	   case this.actions.REMOVE: 

	     return this.remove(state, action); 

	   case this.actions.REMOVE: 

	     return this.remove(state, action);

	   case this.actions.GET_AT: 

	     return this.getAt(state, action);

	   default:
	     return state;    
	 }  
	}

  create(state, action){
  	return state.unshift(action.object);
  }

  remove(state, action){

  	// console.log('this.remove', action.object);

  	// return this.getAt();

  	// console.log("Messages", messages);

  	window.state = state;


    var index = state.indexOf(action.object); 
    // var index = state.findIndex((objects,k) => {
    //   return objects.id === action.id ? true : false;
    // }); 


    if(index != -1){ 
    	return state.delete(index);
    }
    else{
    	return state;
    } 

  	// console.log('this.getAt', this.getAt(state, action));

  	// return this.getAt();

  	// console.log("Messages", messages);
    // var index = state.findIndex((objects,k) => {
    //   return objects.id === action.id ? true : false;
    // }); 

    // if(index != -1){ 
    	// var index = action.object;
     //  return state.splice(index,1);
    // }
    // else{
    // 	return state;
    // } 
  }

  getAt(state, action){
  	return state(get, action.object);
  }
}

MessageStore.defaultProps = defaultProps;

// export default function(){
// 	var dispatcher = new Dispatcher(); 
// 	return new MessageStore(dispatcher);
// };
