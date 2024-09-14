export type Visibility = 'private' | 'public'
export type CollabRole = 'viewer' | 'editor' | 'owner'

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

export type Permission = {
  document: string,
  user: string,
  role: CollabRole
}

export type Cursor = {
  name: string
  color: string
}

declare global {
  interface Liveblocks {
    UserMeta: {
      id: string
      info: {
        name: string
        picture: string
        color: string
      }
    }
  }
}