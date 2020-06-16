import React, { Component } from 'react';
import Login from './login'
import axios from 'axios'
import Profile from './profile'
import {BrowserRouter,Route} from 'react-router-dom'
import Check from './check'
class App extends Component {
  state={
    status:"NOT_LOGGED_IN",
      user:[]
    }
    handlelogin=(username,password,redirect)=>{
      const data={username,password}
      axios.post('http://localhost:4000/auth',data,{withCredentials:true}).
      then((res)=>{
      if(res.data.user.details)
      {this.setState({status:"LOGGED IN",user:res.data.user.todos})
       redirect()
    }
       })
  
    }
    handlelogout=()=>{
axios.get('http://localhost:4000/logout',{withCredentials:true}).then(()=>{
this.setState({status:"NOT_LOGGED_IN",user:[]})
})
     

    }
    componentDidMount()
    {  
     axios.get('http://localhost:4000/isauthenticated',{withCredentials:true})
     .then(res=>{
    
         if(res.data.user.details)
         {
             if(this.state.status==="NOT_LOGGED_IN")
             {this.setState({status:"LOGGED_IN",user:res.data.user.todos})}
         }
         if(!res.data.user.details)
         {
             if(this.state.status==="LOGGED_IN")
             {this.setState({status:"NOT_LOGGED_IN",user:[]})}
         }
     })
 
    }
   
    addtodo=(todo)=>{
     
      axios.post('http://localhost:4000/addtodos',{todo:todo},{withCredentials:true}).then((res)=>{
      
       this.setState({user:res.data.todos})
      })
    
    }
  render() {
  
  

    return (
      <div className="App">
      
        <BrowserRouter>
        
         <Route exact path="/login"  
         render={(props)=><Login {...props} status={this.state.status} login={this.handlelogin}>



         </Login>}
         
         
         
         />

      <Route exact path="/profile" 
      
      render={(props)=><Profile {...props} status={this.state.status} user={this.state.user} handlelogout={this.handlelogout}
         addtodo={this.addtodo}
      
      >



      </Profile>
      
      
      }
  
    />
    <Route exact path='/check' component={Check} user={this.state.user}>
     

    </Route>

        </BrowserRouter>
     
      
      </div>
    );
  }
}

export default App;
