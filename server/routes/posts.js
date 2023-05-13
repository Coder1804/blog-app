const express = require('express');
const router = express.Router();

const {addPost, getPosts, getPost, deletePost, updatePost} = require('../controllers/posts');

router.get('/' , getPosts);
router.get('/:id' , getPost);
router.post('/' , addPost);
router.delete('/:id' , deletePost);
router.put('/:id' , updatePost);

module.exports = router;