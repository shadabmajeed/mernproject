const express=require('express')
const app=express()
const cors=require('cors')
const session=require('express-session')
const LocalStrategy=require('passport-local').Strategy
const passport=require('passport')
const PORT=process.env.PORT||4000
app.use(cors(
    {origin:'http://localhost:3000',
    credentials:true,
    preflightContinue:true

    }
))

passport.use(new LocalStrategy((username,password,done)=>{
    
    user.findOne({"details.username":username},(err,user)=>{
       
        if(err){done(err)}
        else if(user)
        {
            if(user.details.password==password){done(null,user)}
        }
       else {done(null,false)}
       
    })

}))
passport.serializeUser((user,done)=>{
    console.log('serial')
done(null,user.id)

})
passport.deserializeUser((id,done)=>{
    console.log('deserial')
   user.findById(id,(err,result)=>{
    if(err) done(err)
    else if(result){done(null,result)}
   else{
       done(null,false)
   }
   })
})
//DATABASE


const mongoose=require('mongoose')

const Schema=mongoose.Schema

const users=new Schema({
details:{
 username:{type:String},
 password:{type:String}
},
todos:{type:Array}
})



const user=mongoose.model('user',users)
mongoose.connect('mongodb+srv://shadab:shadab@cluster0-vn19w.mongodb.net/<dbname>?retryWrites=true&w=majority',
{useNewUrlParser: true,
    useUnifiedTopology:true,
    useFindAndModify:true,
    useCreateIndex:true
},
(err)=>{
    if(err) throw err
    else console.log('db connected')
 
}

)


//ROUTES
app.listen(PORT)

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({extended:true}))
app.use(express.json())


//passport

app.post('/auth',passport.authenticate('local',{successRedirect:'/isauthenticated',failureRedirect:'/isauthenticated'}))
app.get('/isauthenticated',(req,res)=>{
if(req.isAuthenticated()){
    myuser=req.user
    res.send({user:myuser})

}
else res.send({user:{}})
})
app.get('/logout',(req,res)=>{
req.logOut()
res.redirect('/isauthenticated')

})

app.get('/gettodos',(req,res)=>{
if(req.isAuthenticated()){
todo=todos.find(vals=>{return vals.name==req.user.username})
res.send({todo})
}
else{
    res.send('plzz login')
}
})
app.post('/addtodos',(req,res)=>{
    if(req.isAuthenticated()){
        const username=req.user.details.username
         const todo=req.body.todo
     user.findOneAndUpdate({"details.username":username},
     {$push:{todos:todo}},{"new":true},
     
     (err,response)=>{
      if(err) throw err
      res.send(response)
     
     })
     
    
    }
    else{
        res.send('plzz login')
    }
    })
    app.post('/user',(req,res)=>{
        console.log(req.body)
      res.send(req.body)

    })
    const path=require('path')
    if(process.env.NODE_ENV==='production')
    {
     app.use(express.static(path.join(__dirname,'client','build')))
     app.get('*',(req,res)=>{
      res.sendFile(path,join(__dirname,'client','build','index.html'))

     })


    }
