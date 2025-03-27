export interface Project {
  id: string
  title: string
  description: string
  goal: number
  donated: number
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  payment_system: string
  reference_number: string
  project: string
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
