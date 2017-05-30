import { CREATE } from '../constants/message-constants';

export default class MessageActions {  

  constructor(store) {    
    this.dispatcher = store.getDispatcher();  
   }

   create(newContent) {    

     this.dispatcher.dispatch({      
       type: CREATE,      
       content: newContent    
     });  

   }
}