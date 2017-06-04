import React, {Component} from 'react';
import {Container} from 'flux/utils'; 

import Message from '../../View/GridView';
import MessageCreator from './components/message-creator';
// import css from './main.css';
import MessageActions from './actions/message-actions';
import MessageStore from '../../Data/Store';

import Pagination from '../../Pagination';

// import { Dispatcher } from 'flux'; 

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';

import Dispatcher from '../../Dispatcher/';

const defaultProps = {
	page: 1,
	limit: 10,
	query: '',
  connector_url: 'assets/components/modxsite/connectors/connector.php',
  requestParams: null,
}

export default class GridPanel extends Component {  

  constructor(props) {    
    super(props);    
    this.dispatcher = new Dispatcher();    

    // var store = new MessageStore(this.dispatcher);

    // console.log('MessageStore', MessageStore);

    this.store = new MessageStore(this.dispatcher);   

    // console.log('store', store);

    this.actions = new MessageActions(this.store);  
    this.state = {
      limit: props.limit,
      page: props.page,
      query: props.query, 
    	// data: this.store.getState().toArray(),
    };
  }  


  loadItems(params){

    if(this.state.inRequest === true){
      return;
    }

    let {requestParams} = this.props;

    var body = new FormData();

    var data = {
      format: "json",
      limit: this.state.limit,
      page: this.state.page,
      query: this.state.query, 
      count: 1,
    };

    if(requestParams){
      Object.assign(data, requestParams);
    }

    if(params){
      Object.assign(data, params);
    }

    for(var i in data){

      var value = data[i];

      if(value === null || value === undefined){
        continue;
      }

      body.append(i, value);
    };


    var newState = {
      errors: {
      },
      inRequest: false,
    }

    fetch(this.props.connector_url +'?pub_action=' + this.props.connector_path +'getdata',{
      credentials: 'same-origin',
      method: "POST",
      body: body,
    })
      .then(function (response) {

        return response.json()
      })
      .then(function (data) {

        if(data.success){

          // newState.items = data.object || [];
          newState.total = data.total || 0;

          this.dispatcher.dispatch('SET_DATA', data.object || []);
        }
        else{

          if(data.data && data.data.length){

            data.data.map(function(error){
              if(error.msg != ''){
                errors[error.id] = error.msg;
              }
            }, this);
          }

          var error = data.message || "Ошибка выполнения запроса";

          if(this.props.addInformerMessage){
            this.props.addInformerMessage(error);
          }
          else{
            console.error(error);
          }
        }

        // if(!this.state.errors){
        //   this.state.errors = {};
        // }

        // Object.assign(this.state.errors, errors.login_error);

        this.setState(newState);

      }.bind(this))
      .catch((error) => {
          console.error('Request failed', error);
          this.setState(newState);
        }
      );

    this.setState({
      inRequest: true,
    });
  }

  componentDidMount() {    
    // this.listener = this.store.messages.addListener(this.onStateChange.bind(this));  

		this.dispatcher.register((payload) => {

			// console.log('componentDidUpdate payload.actionType', payload, payload.type);

		    switch (payload.type) {
		      case this.store.actions.LOAD:
            this.loadItems(payload.object);
		        break;
		  	}
		  	// this.setState(prevState => {
     //      console.log('componentDidUpdate prevState', prevState.data && prevState.data[0] && prevState.data[0].username);
     //      return {
     //        data: lodash.cloneDeep(this.store.getState().toArray()),
     //      }
     //    }); 

        // this.forceUpdate();
		    // this.loadItems();
    });

    this.loadItems();

    // this.listener = this.store.messages.addListener(this.onStateChanges.bind(this));  
    // this.listener = this.store.messages.addListener(this.onStateChanges2.bind(this));  
  }

  // componentWillUnmount() {    
  //   this.listener.remove();  
  // }  

  componentDidUpdate(prevProps, prevState){
    // console.log('componentDidUpdate', prevState);
    // console.log('componentDidUpdate', this.state);
    // console.log('componentDidUpdate', prevState.data);
    // console.log('componentDidUpdate', prevState.data.toJS());
    // console.log('componentDidUpdate', this.state.data.toJS());
    // console.log('componentDidUpdate', this.state.data);
    // console.log('componentDidUpdate', prevState.data);
    // console.log('componentDidUpdate', prevState.data[0].username);
    // console.log('componentDidUpdate', this.state.data[0].username);

    if(prevState.page != this.state.page){

      this.loadItems();
    }
  }

  // addMessage(newContent) {    
  //   // this.actions.messages.create(newContent);  
  //   this.dispatcher.dispatch({      
  //     type: 'CREATE_MESSAGE',      
  //     content: newContent    
  //   });  
  // }  

  // onStateChange(a,b,c) {    
  // 	console.log('onStateChange');  
  // 	console.log('ABC', a,b,c);  
  // 	console.log('listener', this.listener);  
  // 	console.log('dispatcher', this.dispatcher);  
  // 	console.log('store', this.store);  
  //   this.setState({
  //   		data: this.store.messages.getState(),
  //   });  
  // }  
  // onStateChanges(a,b,c) {  
  // 	console.log('onStateChanges', this.listener);  
  // 	console.log('this.store.messages', this.store.messages);  
  // 	console.log('this.dispatcher', this.dispatcher);  
  //   // this.setState({
  //   // 	messages: {
  //   // 		data: this.store.messages.getState(),
  //   // 	},
  //   // });  
  // } 
  // onStateChanges2(a,b,c) {  
  // 	console.log('onStateChanges2', a,b,c);  
  //   // this.setState({
  //   // 	messages: {
  //   // 		data: this.store.messages.getState(),
  //   // 	},
  //   // });  
  // }  

        // <MessageCreator create={this.addMessage.bind(this)} />  

  removeMessage(message){
  	this.dispatcher.dispatch(this.store.actions.REMOVE, message)
  }
  
        // <MessageCreator
        // 	store={this.store.messages}
        // />  
        // { 
        // 	this.state.data.map(message => {  
        		
	       //  	var o = <Message 
	       //  		key={i} 
	       //  		id={message.id} 
	       //  		author={message.author}  
	       //  		content={message.content} 
	       //  		createdAt={message.createdAt} 
	       //  		remove={this.removeMessage.bind(this, message)}
	       //  	/> 

	       //  	i++;

	       //  	return o;
	       //  }) 
        // }  

  render(){


  	var toolbar = this.renderToolbar();
  	var view = this.renderView();
  	var pagination = this.renderPagination();

    return (      
      <div>        
      	{toolbar}

				{view}

        {pagination}

      </div>    
   );  
 	}

 	renderToolbar(){
 		return null;
 	}

 	renderView(){

  	let {View} = this.props;

  	return <View
  		// data={this.state.data}
      grid={this}
      store={this.store}
      {...this.props}
  	/>
 	}

 	renderPagination(){

 		return <Pagination 
      classes={this.props.classes || {}}
      limit={this.state.limit}
      page={this.state.page}
      total={this.state.total || 0}
      onChangePage={(page) => this.setState({page})}
    />;
 	}
}

GridPanel.defaultProps = defaultProps;

// remove={this.dispatcher.dispatch.bind(this, this.store.messages.actions.REMOVE, i)}