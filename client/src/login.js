import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
export default class login extends Component {
    state={
        user:{},
        username:"",
        password:""
    }
    handlechange=(e)=>{
   this.setState({
       [e.target.name]:e.target.value
   })

    }
    redirecttopro=()=>{
        this.props.history.push('/profile')
    }
    handleclick=()=>{
      this.props.login(this.state.username,this.state.password,this.redirecttopro)
    
    }
     componentWillReceiveProps(prop)
     {
      if (prop.status=="LOGGED_IN"){
          prop.history.push('/profile')
      }

     }
     
    render() {
       
       return (
            <div>
                <h1>{this.props.status}</h1>
                <input name="username" placeholder="user" onChange={this.handlechange}></input>
                <input name="password" placeholder="pass" onChange={this.handlechange}></input>
                <button onClick={this.handleclick}>LOGIN</button>
              
                
            </div>
        )
    }
}
