export type Document = {
  _id: string
  title: string
  owner: string
  content: string
  visibility: 'private' | 'public'
  createdAt: Date
  updatedAt: Date
}

export type User = {
  name: string,
  email: string,
  image: string
}