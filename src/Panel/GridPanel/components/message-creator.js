import React, {Component} from 'react';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const defaultProps = {}

export default class MessageCreator extends Component{

	constructor(props){

		super(props);

		this.state = {
			text: '',
		}
	}

	componentWillMount(){

	}

	componentDidMount(){

	}

  componentDidUpdate(){

    if(this.props.debug){
      console.log("MessageCreator componentDidUpdate", this);
    }
  }

  getDispatcher(){

  	console.log();

  	return this.props.store.getDispatcher();
  }

	render(){

		return <div>
			<TextField 
				name="message"
				value={this.state.text}
				onChange={(event) => this.setState({
					text: event.target.value,
				})}
				multiline
			/>

			<Button
				onTouchTap={() => {
					// this.props.create(this.state.text);

					// this.getDispatcher().dispatch({      
			  //     type: 'CREATE_MESSAGE',      
			  //     content: this.state.text,    
			  //   }); 

			  this.getDispatcher().dispatch("CREATE_MESSAGE", {
			  	id: 1,
			  	content: this.state.text,
			  });

					this.setState({
						text: "",
					});
				}}
			>
				Отправить
			</Button>
		</div>;
	}
}

MessageCreator.defaultProps = defaultProps;
 
