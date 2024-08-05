const express=require('express');
const file=require('fs');
const users=require('./MOCK_DATA.json');
const app=express();
const port=8080;


app.use(express.urlencoded({extended:false}));

app.get('/api/users',(req,res)=>{
    //response should be returned in json format
    return res.json(users);
});
app.get('/api/users/:id',(req,res)=>{
    //when id is given with url it treates as string, we have to convert that string to number
    const id=Number(req.params.id);
    const user=users.find((user)=>user.id===id);
    res.json(user);

});
//post
app.post('/api/users',(req,res)=>{
    const body=req.body;
    users.push({...body,id:users.length+1});
    file.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        return res.json({status:'Success',id:users.length+1});
    });
});

//put/update
app.put('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);
    const data = req.body;

    if (userIndex !== -1) {
        // { ...req.body }: This includes all the properties from req.body in the new object. 
         users[userIndex] = {id : id , ...data};
        //Updates the user in the users array at the found index with the new data.
        file.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
            if (err) {
                return res.status(500).json({ status: 'Error', message: 'Failed to update user' });
            }
            return res.json({ status: 'Success', message: `User with ID ${id} updated`, user: data });
        });
    } else {
        return res.status(404).json({ status: 'Error', message: 'User not found' });
    }
});
// Delete user by ID
app.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id); 

    if (userIndex !== -1) {
        //removes the one user from userIndex and returns new users
        users.splice(userIndex, 1);
        file.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
            if (err) {
                return res.json({ status: 'Error', message: 'Failed to delete user' });
            }
            return res.json({ status: 'Success', message: `User with ID ${id} deleted` });
        });
    } else {
        res.json({ status: 'Error', message: 'User not found' });
    }
});

app.listen(port,()=>{console.log(`Server Started at ${port}`)});
