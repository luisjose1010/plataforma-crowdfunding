export interface User {
  id: string
  name: string
  email: string
  id_card: string
  phone: string
  created_at: string
  updated_at: string
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
