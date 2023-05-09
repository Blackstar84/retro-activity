const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Post = require('../models/post');

/* const getPosts = async (req, res, next) => {
 const category = req.params.category;
  const categories = category ? { category } : {}; 

  let post;
  try {
    post = await Post.find();

  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find the category.',
      500
    );
    return next(error);
  }

  if (!post || post.posts.length === 0) {
    return next(
      new HttpError('Could not find post for the provided category.', 404)
    );
  }
  res.json({ post: post.posts.map(post => post.toObject({ getters: true })) });
  
}; */



const createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { title, category, color } = req.body;

  const createdPost = new Post({
    title,
    category,
    color
  });

  try {
    await createdPost.save();
    
   } catch (err) {
   const error = new HttpError(
   'Creating post failed, please try again.',
   500
   );
   return next(error);
   }

  res.status(201).json({ post: createdPost });
};

const updatePost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { title, category, color } = req.body;
  const postId = req.params.pid;

  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update post.',
      500
    );
    return next(error);
  }

  post.title = title;
  post.category = category;
  post.color = color;

  try {
    await post.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update the post.',
      500
    );
    return next(error);
  }

  res.status(200).json({ post: post.toObject({ getters: true }) });
};

  const deletePost = async (req, res, next) => {
  const postId = req.params.pid;

  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete place.',
      500
    );
    console.log(error);
    return next(error);
  }

  if(!post){
    const error = new HttpError(
      'Could not find post for this id.',
      404
    );
    return next(error);
  }

  try {
    await post.deleteOne();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete post.',
      500
    );
    console.log(err);
    return next(error);
  }

  res.status(200).json({ message: 'Deleted post.' });
};



exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
