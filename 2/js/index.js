let posts = [];
const getPosts = async () => {
  const response = await fetch('posts.json');
  await response.json().then((data) => (posts = data.posts));
  showPosts(posts);
};
getPosts();

function addArticle() {
  const title = document.forms['addPost']['title'].value;
  const description = document.forms['addPost']['description'].value;

  if (title.length > 0 && description.length > 0) {
    const post = {
      title: title,
      description: description,
      id: posts.length + 1,
      likeCounter: 0,
      unlikeCounter: 0,
    };
    posts.push(post);
    showPosts(posts);
    alert('Added article');
  } else alert('Put title and description');

  return false;
}

function addLike(postId) {
  posts.find((post) => post.id === postId).likeCounter++;
  showPosts(posts);
}

function addUnlike(postId) {
  posts.find((post) => post.id === postId).unlikeCounter++;
  showPosts(posts);
}
function removePost(postId) {
  const index = posts.indexOf(posts.find((post) => post.id === postId));
  posts.splice(index, 1);
  showPosts(posts);
}
function showPosts(posts) {
  let list = `<ul> Count of articles: ${posts.length}</ul>`;
  posts.map(
    (post) =>
      (list += `
    <li>
      <h1>${post.title}</h1>
      <p>${post.description}</p>
      <div>
        <button onclick="addLike(${post.id})">Like: ${post.likeCounter}</button>
        <button onclick="addUnlike(${post.id})">Unlike: ${post.unlikeCounter}</button>
        <button onclick="removePost(${post.id})">Remove</button>
      </div>
    </li>`)
  );
  document.querySelector('.posts').innerHTML = list;
}
