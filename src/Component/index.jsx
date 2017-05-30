import React, {Component} from 'react';


export default class ReactCmsDataComponent extends Component{

	constructor(props){

		super(props);

		this.state = {}
	}

	componentWillMount(){

	}

	componentDidMount(){

	}

  componentDidUpdate(){

    if(this.props.debug){
      console.log("ReactCmsDataComponent componentDidUpdate", this);
    }
  }

	render(){

		return null;
	}
}