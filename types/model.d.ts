export type Visibility = 'private' | 'public'

export type Document = {
  _id: string
  title: string
  owner: string
  content: string
  visibility: Visibility
  createdAt: Date
  updatedAt: Date
}

export type User = {
  name: string,
  email: string,
  image: string
}