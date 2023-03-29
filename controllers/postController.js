const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const Like = require("../models/likeModel");

const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().exec();
  res.json(posts);
});

const getUserPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user_id: req.user.id });
  res.json(posts);
});

const postPost = asyncHandler(async (req, res) => {
  const { title, body, imageUrl } = req.body;
  if (!title || !body) {
    res.status(400);
    throw new Error("Fields are mandatory");
  }

  const post = await Post.create({
    title,
    body,
    user_id: req.user.id,
    imageUrl,
  });

  res.status(201).json(post);
});

const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }
  res.json(post);
});

const putPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.body.id);
  if (!post) {
    res.status(404);
    throw new Error("Post not found to be updated");
  }

  if (post.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("You don't have the authorization to update other's posts");
  }

  const updatedPost = await Post.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
  });

  res.json(updatedPost);
});

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.body.id);
  if (!post) {
    res.status(404);
    throw new Error("Post not found to be deleted");
  }

  if (post.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("You don't have the authorization to delete other's posts");
  }

  await Post.remove(post);
  res.json({ message: `Post ${req.body.id} deleted` });
});

const markApproved = asyncHandler(async (req, res) => {
  await Post.findByIdAndUpdate(req.body.id, { approved: true }, { new: true });
  res.json({ message: `Post approved` });
});

const markDisApproved = asyncHandler(async (req, res) => {
  await Post.findByIdAndUpdate(req.body.id, { approved: false }, { new: true });
  res.json({ message: `Post disapproved` });
});

const like = asyncHandler(async (req, res) => {
  const post_id = req.body.id;
  const post = await Post.findById(post_id);
  if (post) {
    const user_id = req.user.id;
    await Like.create({ user_id, post_id });
    res.json({ message: `Post liked` });
  }

  res.status(500);
  throw new Error("Problem occured while liking the post");
});

const unlike = asyncHandler(async (req, res) => {
  const post_id = req.body.id;
  const user_id = req.user.id;
  const post = await Like.find({
    $and: [{ user_id: user_id, post_id: post_id }],
  });
  if (post) {
    await Like.remove(post);
    res.json({ message: `Post unliked` });
  }

  res.status(500);
  throw new Error("Problem occured while unliking the post");
});

const isLiked = asyncHandler(async (req, res) => {
  const post_id = req.body.id;
  const user_id = req.user.id;
  const post = await Like.find({
    $and: { user_id: user_id, post_id: post_id },
  });
  console.log(post);
  if (post) {
    return res.json({ liked: true });
  }

  return res.json({ liked: false });
});

module.exports = {
  getPosts,
  getPost,
  postPost,
  putPost,
  deletePost,
  getUserPosts,
  markApproved,
  markDisApproved,
  like,
  unlike,
  isLiked,
};
