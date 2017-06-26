export function loadItems(connector_url, connector_path, store, params, callback){

  let {
    addInformerMessage
  } = this.props;

  let {
  } = this.state;

  let dispatcher = store.getDispatcher();

  var body = new FormData();

  var data = {
    format: "json",
    count: 1,
  };


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

  fetch(connector_url +'?pub_action=' + connector_path +'getdata',{
    credentials: 'same-origin',
    method: "POST",
    body: body,
  })
    .then(function (response) {

      return response.json()
    })
    .then(function (data) {

      if(data.success){

        dispatcher.dispatch(store.actions["SET_DATA"], data.object || []);
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

        addInformerMessage(error);
      }

      if(callback){
        callback(data, errors);
      }

    }.bind(this))
    .catch((error) => {
        console.error('Request failed', error);
      }
    );

  return;
}


export function saveItem(connector_url, connector_path, store, item, callback){


  // console.log('saveItem STORE UPDATE', item, store);

  if(
    !item
    || item._sending === true
  ){
    return;
  } 

  let {addInformerMessage} = this.props.documentActions;

  let dispatcher = store.getDispatcher();

  item._sending = true;
    
  var action = item.id && item.id > 0 ? 'update' : 'create';

  var options = options || {};

  var body = new FormData();

  var data = item;

  for(var i in data){
    var value = data[i];

    if(value === undefined){
      continue;
    }

    // Пропускаем свойства-объекты
    if(typeof value === "object" && !Array.isArray(value)){
      continue;
    }

    // Пропускаем временные свойства
    if(/^\_/.test(i)){
      continue;
    }

    // console.log('Form item', i, value, Array.isArray(value));

    body.append(i, value);
  };


  fetch(this.props.connector_url + '?pub_action='+ connector_path + action,{
    credentials: 'same-origin',
    method: options.method || "POST",
    body: body,
  })
    .then(function (response) {

      return response.json()
    })
    .then((data) => {
      // console.log('DATA', data);
      // self.setState({items: data.object});

      var errors = {};

      if(data.success === true){

        // var items = lodash.clone(this.state.items);

        var newObject = data.object || {};
 

        Object.assign(newObject, {
          _isDirty: false,
        });

        dispatcher.dispatch(store.actions["SAVE"], item, newObject); 

      }
      else{

        if(data.data && data.data.length){
          data.data.map(function(error){
            var value = error.msg;
            if(value && value != ''){
              errors[error.id] = value;
            }
          });
        }

        errors.error_message = data.message;

        addInformerMessage(data.message || "Ошибка выполнения запроса");

        // this.forceUpdate();
      }

      // newState.errors = this.state.errors || {};

      // newState.errors[item.id || 0] = errors;

      item._errors = errors;

      if(callback){
        callback(data, errors);
      }
      
      // this.forceUpdate();
  

      item._sending = false;

      // console.log('saveItem STORE UPDATE 2', item, store);

    })
    .catch((error) => {
        console.error('Request failed', error, this); 

        addInformerMessage(data.message || "Ошибка выполнения запроса");
      }
    );

  this.forceUpdate();
  return;
}
