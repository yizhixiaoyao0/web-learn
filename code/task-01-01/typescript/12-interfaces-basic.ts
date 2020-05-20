export {}

interface Post {
  title: string
  content: string
}

function printPost(post: Post) {
  console.log(post.title);
}

printPost({
  title: 'hello',
  content: 'a js',
})