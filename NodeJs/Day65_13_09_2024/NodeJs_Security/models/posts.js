const fs = require('fs');
const path = require('path');
const postsFilePath = path.join(__dirname, '../data/posts.json');

let postsData = require(postsFilePath);

function getAllPosts() {
  return postsData;
}

function createPost(title, content) {
  const newPost = {
    id: postsData.length + 1,
    title,
    content,
    date: new Date().toISOString()
  };
  postsData.push(newPost);
  fs.writeFileSync(postsFilePath, JSON.stringify(postsData, null, 2));
  return newPost;
}

module.exports = { getAllPosts, createPost };
