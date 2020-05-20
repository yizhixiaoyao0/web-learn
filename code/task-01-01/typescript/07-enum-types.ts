export {}

enum PostStatus {
  Draft = 0,
  Unpublished,
  published,
}
// enum PostStatus {
//   Draft = 'a',
//   Unpublished = 'b',
//   published = 'c',
// }


// const enum PostStatus {
//   Draft = 0,
//   Unpublished,
//   published,
// }

const post = {
  title: 'hello',
  content: 'typescript',
  status: PostStatus.Draft,
}

