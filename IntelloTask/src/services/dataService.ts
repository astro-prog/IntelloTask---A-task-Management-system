import { User, Task, Comment } from '../types';

// Initialize demo data
const initializeData = () => {
  // Demo users
  const defaultUsers: User[] = [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@intellotask.com',
      password: 'admin123',
      role: 'admin',
      department: 'Management',
      status: 'active',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'John Smith',
      email: 'john@intellotask.com',
      password: 'emp123',
      role: 'employee',
      department: 'Development',
      status: 'active',
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Sarah Johnson',
      email: 'sarah@intellotask.com',
      password: 'emp123',
      role: 'employee',
      department: 'Design',
      status: 'active',
      createdAt: new Date().toISOString(),
    },
  ];

  // Demo tasks
  const defaultTasks: Task[] = [
    {
      id: '1',
      title: 'Website Redesign',
      description: 'Complete redesign of company website with modern UI/UX',
      assignedTo: '2',
      assignedBy: '1',
      status: 'in-progress',
      priority: 'high',
      dueDate: '2024-02-15',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Mobile App Testing',
      description: 'Comprehensive testing of mobile application features',
      assignedTo: '3',
      assignedBy: '1',
      status: 'pending',
      priority: 'medium',
      dueDate: '2024-02-20',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Database Optimization',
      description: 'Optimize database queries for better performance',
      assignedTo: '2',
      assignedBy: '1',
      status: 'completed',
      priority: 'high',
      dueDate: '2024-01-30',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  if (!localStorage.getItem('intellotask_users')) {
    localStorage.setItem('intellotask_users', JSON.stringify(defaultUsers));
  }

  if (!localStorage.getItem('intellotask_tasks')) {
    localStorage.setItem('intellotask_tasks', JSON.stringify(defaultTasks));
  }

  if (!localStorage.getItem('intellotask_comments')) {
    localStorage.setItem('intellotask_comments', JSON.stringify([]));
  }
};

export class DataService {
  static initialize() {
    initializeData();
  }

  // User methods
  static getUsers(): User[] {
    return JSON.parse(localStorage.getItem('intellotask_users') || '[]');
  }

  static getUserByEmail(email: string): User | null {
    const users = this.getUsers();
    return users.find(user => user.email === email) || null;
  }

  static getUserById(id: string): User | null {
    const users = this.getUsers();
    return users.find(user => user.id === id) || null;
  }

  static addUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem('intellotask_users', JSON.stringify(users));
  }

  static updateUser(user: User): void {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      users[index] = user;
      localStorage.setItem('intellotask_users', JSON.stringify(users));
    }
  }

  static deleteUser(id: string): void {
    const users = this.getUsers();
    const filteredUsers = users.filter(user => user.id !== id);
    localStorage.setItem('intellotask_users', JSON.stringify(filteredUsers));
  }

  // Task methods
  static getTasks(): Task[] {
    return JSON.parse(localStorage.getItem('intellotask_tasks') || '[]');
  }

  static getTasksByUserId(userId: string): Task[] {
    const tasks = this.getTasks();
    return tasks.filter(task => task.assignedTo === userId);
  }

  static addTask(task: Task): void {
    const tasks = this.getTasks();
    tasks.push(task);
    localStorage.setItem('intellotask_tasks', JSON.stringify(tasks));
  }

  static updateTask(task: Task): void {
    const tasks = this.getTasks();
    const index = tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      tasks[index] = { ...task, updatedAt: new Date().toISOString() };
      localStorage.setItem('intellotask_tasks', JSON.stringify(tasks));
    }
  }

  static deleteTask(id: string): void {
    const tasks = this.getTasks();
    const filteredTasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('intellotask_tasks', JSON.stringify(filteredTasks));
  }

  // Comment methods
  static getComments(): Comment[] {
    return JSON.parse(localStorage.getItem('intellotask_comments') || '[]');
  }

  static getCommentsByTaskId(taskId: string): Comment[] {
    const comments = this.getComments();
    return comments.filter(comment => comment.taskId === taskId);
  }

  static addComment(comment: Comment): void {
    const comments = this.getComments();
    comments.push(comment);
    localStorage.setItem('intellotask_comments', JSON.stringify(comments));
  }
}