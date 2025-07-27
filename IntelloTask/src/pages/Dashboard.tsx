import React, { useState, useEffect } from 'react';
import Navbar from '../components/Layout/Navbar';
import Sidebar from '../components/Layout/Sidebar';
import DashboardWidgets from '../components/Dashboard/DashboardWidgets';
import TaskOverview from '../components/Dashboard/TaskOverview';
import QuickActions from '../components/Dashboard/QuickActions';
import TaskFormModal from '../components/Tasks/TaskFormModal';
import EmployeeFormModal from '../components/Employees/EmployeeFormModal';
import { useAuth } from '../contexts/AuthContext';
import { Task, User } from '../types';
import { DataService } from '../services/dataService';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);

  useEffect(() => {
    setTasks(DataService.getTasks());
    setUsers(DataService.getUsers());
  }, []);

  const handleCreateTask = (taskData: Partial<Task>) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskData.title!,
      description: taskData.description!,
      assignedTo: taskData.assignedTo!,
      assignedBy: user!.id,
      status: taskData.status!,
      priority: taskData.priority!,
      dueDate: taskData.dueDate!,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    DataService.addTask(newTask);
    setTasks(DataService.getTasks());
  };

  const handleAddEmployee = (employeeData: Partial<User>) => {
    const newEmployee: User = {
      id: Date.now().toString(),
      name: employeeData.name!,
      email: employeeData.email!,
      password: employeeData.password || 'temp123',
      role: employeeData.role!,
      department: employeeData.department,
      status: employeeData.status!,
      createdAt: new Date().toISOString(),
    };

    DataService.addUser(newEmployee);
    setUsers(DataService.getUsers());
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600 mt-2">
                Here's what's happening with your tasks today.
              </p>
            </div>

            <DashboardWidgets tasks={tasks} users={users} currentUser={user} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <TaskOverview tasks={tasks} currentUser={user} />
              </div>
              <div>
                <QuickActions
                  currentUser={user}
                  onCreateTask={() => setIsTaskModalOpen(true)}
                  onAddEmployee={() => setIsEmployeeModalOpen(true)}
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      <TaskFormModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSubmit={handleCreateTask}
        currentUser={user}
      />

      <EmployeeFormModal
        isOpen={isEmployeeModalOpen}
        onClose={() => setIsEmployeeModalOpen(false)}
        onSubmit={handleAddEmployee}
      />
    </div>
  );
};

export default Dashboard;