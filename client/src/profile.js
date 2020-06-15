import React, { Component } from 'react'
import axios from 'axios'
import "./profile.css"

export default class profile extends Component {
  state={
    todo:""
  }

clickhandle=()=>{
      this.props.handlelogout()
}


componentDidMount()
{
  if(this.props.status=="NOT_LOGGED_IN")
{
 this.props.history.push('/login')
}
}
componentWillReceiveProps(prop)
{
if(prop.status=="NOT_LOGGED_IN")
{
  prop.history.push('/login')
}


}
datas=(data)=>{
 const datas=data.map((todo,index)=>{
    return(<div className="todos" key={index}>
       {todo}
           

  </div>)

 }
  
  
  )
  return datas

}
handlechange=(e)=>{
  this.setState({todo:e.target.value})

}
addtodos=()=>{
this.props.addtodo(this.state.todo)


}

render() {
      if(this.props.user.length!=0)
       {  
        return ( <div className='todoswrapper'>
                   <h1>TODOS!!!!</h1>
                   <button onClick={this.clickhandle}>LOGOUT</button>
                   { this.datas(this.props.user)}
                   <input placeholder="enter todos" onChange={this.handlechange}></input>
                   <br></br>
                   <button onClick={this.addtodos} >ADD</button>
                 
                </div>
               
                
               
               )
        
       }  
        return (
            <div>

            
            </div>
        )
    }
}
