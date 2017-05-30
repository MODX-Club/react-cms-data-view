import React, {Component} from 'react';
import {Container} from 'flux/utils'; 

import Message from '../../View/GridView';
import MessageCreator from './components/message-creator';
// import css from './main.css';
import MessageActions from './actions/message-actions';
import MessageStore from '../../Data/Store';

import Pagination from 'material-ui-components/src/Pagination';

// import { Dispatcher } from 'flux'; 

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

import Dispatcher from '../../Dispatcher/';

const defaultProps = {
	page: 1,
	limit: 10,
	query: '',
  connector_url: 'assets/components/modxsite/connectors/connector.php?pub_action=gmail-db/places/',
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
    	data: this.store.getState(),
    };  

    console.log();
  }  


  loadItems(){

    if(this.state.inRequest === true){
      return;
    }

    var body = new FormData();

    var data = {
      format: "json",
      limit: this.state.limit,
      page: this.state.page,
      query: this.state.query, 
      count: 1,
    };

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

    fetch(this.props.connector_url +'getdata',{
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

          this.props.documentActions.addInformerMessage(data.message || "Ошибка выполнения запроса");
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

			// console.log('payload.actionType', payload, payload.type);

		   //  switch (payload.actionType) {
		   //    case 'country-update':
		   //    case 'city-update':
		   //      // flightDispatcher.waitFor([CityStore.dispatchToken]);
		   //      // FlightPriceStore.price =
		   //      //   getFlightPriceStore(CountryStore.country, CityStore.city);
		   //      console.log("DSf");
		   //      break;
		  	// }
		  	this.setState({
	    		data: this.store.getState(),
		    });  
		});

		this.loadItems();

    // this.listener = this.store.messages.addListener(this.onStateChanges.bind(this));  
    // this.listener = this.store.messages.addListener(this.onStateChanges2.bind(this));  
  }

  componentWillUnmount() {    
    this.listener.remove();  
  }  

  componentDidUpdate(prevProps, prevState){
  	console.log('componentDidUpdate', prevState);
  	console.log('componentDidUpdate', this.state);
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
  	this.dispatcher.dispatch(this.store.messages.actions.REMOVE, message)
  }

  componentDidUpdate(prevProps, prevState){

    if(prevState.page != this.state.page){

      this.loadItems();
    }
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

  	let {data} = this.state;

  	let {View} = this.props;

  	return <View
  		data={this.state.data}
  	/>

 		/*return <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(n => {
        	i++;
          return (
            <TableRow key={i}>
              <TableCell>{n.name}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>;*/
 	}

 	renderPagination(){
 		return <Pagination 
      limit={this.state.limit}
      page={this.state.page}
      total={this.state.total || 0}
      onChangePage={(page) => this.setState({page})}
    />;
 	}
}

GridPanel.defaultProps = defaultProps;

// remove={this.dispatcher.dispatch.bind(this, this.store.messages.actions.REMOVE, i)}