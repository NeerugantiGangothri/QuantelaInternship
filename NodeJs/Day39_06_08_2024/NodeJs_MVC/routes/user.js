const express=require('express');

const {handlegetAllUsers,
    handleGetUserbyid,
    handleUpdateUserbyid,
    handleDeleteUserbyid,
    handleCreateUser}=require('../controllers/user');

const router=express.Router();

router.route('/').get(handlegetAllUsers).post(handleCreateUser);
 
router.route('/:id')
.get(handleGetUserbyid)
.put(handleUpdateUserbyid)
.delete(handleDeleteUserbyid);




module.exports=router;