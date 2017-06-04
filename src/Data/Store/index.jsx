// import AppDispatcher from '../dispatcher/app-dispatcher';
import { CREATE, REMOVE } from '../../Panel/GridPanel/constants/message-constants';
import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';
import { Dispatcher } from 'flux'; 
 

const defaultProps = {
}

export default class dataStore extends ReduceStore {  
 
	actions = {
    LOAD: 'LOAD_OBJECT',
		CREATE: 'CREATE_OBJECT',
    REMOVE: 'REMOVE_OBJECT',
    UPDATE: 'UPDATE_OBJECT',
		SAVE:   'SAVE_OBJECT',
		GET:    'GET_AT_OBJECT',
		FIND: 	'FIND_OBJECT',
		SET_DATA: 	'SET_DATA',
	}

	getInitialState() {   

		// console.log('Immutable.fromJS([])', Immutable.fromJS([]));
		// console.log('');

	 return Immutable.fromJS([]);  
	}  

	// getState(){
 //    alert('getState');
	// 	return this._state;
	// }

	reduce(state, action, data) {    
   	
 		// console.log('reduce(state, action)', action, data);   

	 switch (action.type) {    

     case this.actions.LOAD: 

      return state; 
      break; 

	   case this.actions.SET_DATA:   

      // console.log('Current state', state);
      // return state.set(action.object);   

      // var newState = state.push(action.object); 

      // console.log('newState state', newState);

      state = state.clear();

      action.object.map((item) => {
        state = state.push(item);
      });

	 		return    state;


	   case this.actions.CREATE:   

	    return this.create(state, action);   


	   case this.actions.REMOVE: 

	     return this.remove(state, action); 

     case this.actions.UPDATE: 
	   case this.actions.SAVE: 

	     return this.update(state, action);

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

    // console.log('remove', index, action.object);


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
    //  return state;
    // } 
  }

  update(state, action){

  	// console.log('this.remove', action.object);

  	// return this.getAt();

  	// console.log("Messages", messages);

    let {object, newObject} = action;

    window.object = object;
  	window.newObject = newObject;


    var index = state.indexOf(object); 
    // var index = state.findIndex((objects,k) => {
    //   return objects.id === action.id ? true : false;
    // }); 

    // console.log('index', index);
    // console.log('OldObject', object);
    // console.log('newObject', newObject);
    // console.log('State', state);

    if(index != -1 && newObject){ 
      // return state.update(index, newObject);
      // return state.merge(index, newObject);

      return state.update(index, function(item){
        // console.log('Item', item);
        Object.assign(item, newObject);
        return item;
      });
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
    return state.get(action.object);
  	// return state.get(0);
  }
}

dataStore.defaultProps = defaultProps;

// export default function(){
// 	var dispatcher = new Dispatcher(); 
// 	return new MessageStore(dispatcher);
// };
