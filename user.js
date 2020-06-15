const mongoose=require('mongoose')
const Schema=mongoose.Schema

const users=new Schema({
details:{
 username:{type:String},
 password:{type:String}
},
todos:{type:Array}
})


module.exports=mongoose.model('user',users)
