export interface User {
  id: string
  name: string
  email: string
  id_card: string
  is_superuser: boolean
  created_at: string
  updated_at: string
}

export interface UserUpdate extends User {
  password?: string
  new_password?: string
}

export interface UserWithProjects extends User {
  projects: Project[]
}

export interface Category {
  id: string
  name: string
  description: string
  url: string
  projects_count: number
}

export interface Project {
  id: string
  title: string
  description: string
  goal: number
  donated: number
  created_at: string
  updated_at: string
}

export interface ProjectWithUser extends Project {
  user: User
}

export interface Transaction {
  id: string
  payment_system: string
  reference_number: string
  project: ProjectWithUser
  amount: number
  created_at: string
  updated_at: string
}

export enum editModes {
  projects = 'proyectos',
  transactions = 'pagos',
  users = 'usuarios'
}

export interface Item {
  id: string
  name: string
  description: string
  created_at: string
  updated_at: string
}
