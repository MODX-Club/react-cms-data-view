export function loadItems(params){

  // console.log('loadItems', this, params);

  if(this.state.inRequest === true){
    return;
  }

  let {
    requestParams,
    store,
  } = this.state;

  let dispatcher = store.getDispatcher();

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
