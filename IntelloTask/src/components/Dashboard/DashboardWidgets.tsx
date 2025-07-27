import React from 'react';
import { CheckCircle, Clock, AlertCircle, Users } from 'lucide-react';
import { Task, User } from '../../types';

interface DashboardWidgetsProps {
  tasks: Task[];
  users: User[];
  currentUser: User;
}

const DashboardWidgets: React.FC<DashboardWidgetsProps> = ({ tasks, users, currentUser }) => {
  const userTasks = currentUser.role === 'admin' ? tasks : tasks.filter(task => task.assignedTo === currentUser.id);
  
  const completedTasks = userTasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = userTasks.filter(task => task.status === 'in-progress').length;
  const pendingTasks = userTasks.filter(task => task.status === 'pending').length;
  const totalEmployees = users.filter(user => user.role === 'employee' && user.status === 'active').length;

  const widgets = [
    {
      title: 'Completed Tasks',
      value: completedTasks,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'In Progress',
      value: inProgressTasks,
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Pending Tasks',
      value: pendingTasks,
      icon: AlertCircle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    ...(currentUser.role === 'admin' ? [{
      title: 'Active Employees',
      value: totalEmployees,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    }] : []),
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {widgets.map((widget, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className={`${widget.bgColor} p-3 rounded-lg`}>
              <widget.icon className={`h-6 w-6 ${widget.color}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{widget.title}</p>
              <p className="text-2xl font-bold text-gray-900">{widget.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardWidgets;