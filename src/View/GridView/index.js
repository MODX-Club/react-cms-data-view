import React, {Component} from 'react';

import Button from 'material-ui/Button';
import { Dispatcher } from 'flux'; 

const defaultProps = {}

export default class Message extends Component{

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
      console.log("Message componentDidUpdate", this);
    }
  }

	render(){

		return <div>
			<pre>{this.props.content}</pre>
			<Button
				onTouchTap={() => this.props.remove(this.props.id)}
			>
				Удалить
			</Button>
		</div>;
	}
}

Message.defaultProps = defaultProps;