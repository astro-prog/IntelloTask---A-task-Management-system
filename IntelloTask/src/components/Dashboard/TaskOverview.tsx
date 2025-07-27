import React from 'react';
import { Calendar, User, AlertCircle } from 'lucide-react';
import { Task, User as UserType } from '../../types';
import { DataService } from '../../services/dataService';

interface TaskOverviewProps {
  tasks: Task[];
  currentUser: UserType;
}

const TaskOverview: React.FC<TaskOverviewProps> = ({ tasks, currentUser }) => {
  const userTasks = currentUser.role === 'admin' ? tasks.slice(0, 5) : tasks.filter(task => task.assignedTo === currentUser.id).slice(0, 5);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAssignedUserName = (userId: string) => {
    const user = DataService.getUserById(userId);
    return user?.name || 'Unknown User';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Tasks</h3>
        <a href="/tasks" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
          View All Tasks
        </a>
      </div>

      <div className="space-y-4">
        {userTasks.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No tasks assigned yet.</p>
        ) : (
          userTasks.map((task) => (
            <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-2">{task.title}</h4>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {getAssignedUserName(task.assignedTo)}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status.replace('-', ' ')}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    <AlertCircle className="h-3 w-3 inline mr-1" />
                    {task.priority}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskOverview;