export {}

interface Post {
  title: string
  content: string
  subTitle?: string
  readonly summary: string
}

function printPost(post: Post) {
  console.log(post.title);
}

printPost({
  title: 'hello',
  content: 'a js',
  summary: 'sss'
})

// ----------------------------------

interface Cache {
  [key: string]: string
}