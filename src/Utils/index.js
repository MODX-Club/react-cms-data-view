export function loadItems(connector_url, connector_path, store, params, callback){

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

        dispatcher.dispatch('SET_DATA', data.object || []);
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
