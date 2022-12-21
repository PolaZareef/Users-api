var express = require('express');
const sequelize=require('./database');
const User=require('./User');

sequelize.sync().then(()=>console.log('db is ready'));
var app = express();
app.use(express.json());

app.get('/users',async (req,res)=>{
  const users=await User.findAll();
  res.send(users);
})
app.get('/users/:id',async (req,res)=>{
  const userID=req.params.id;
  const user=await User.findOne({where:{id:userID}});
  res.send(user);
})

app.post('/users',async (req,res)=>{
  await User.create(req.body);
  res.send('user is inserted');
})

app.put('/users/:id',async (req,res)=>{
  const userID=req.params.id;
  const user=await User.findOne({where:{id:userID}});
  user.firstname=req.body.firstname;
  await user.save();
  res.send('updated');
})

app.delete('/users/:id',async(req,res)=>{
  const userID=req.params.id;
  await User.destroy({where:{id:userID}});
  res.send('Deleted');
})


app.listen(3000, () => console.log("Server Up and running"));



