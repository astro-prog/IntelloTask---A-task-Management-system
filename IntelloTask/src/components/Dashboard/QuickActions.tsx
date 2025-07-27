import React from 'react';
import { Plus, Users, CheckSquare } from 'lucide-react';
import { User } from '../../types';

interface QuickActionsProps {
  currentUser: User;
  onCreateTask: () => void;
  onAddEmployee: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ currentUser, onCreateTask, onAddEmployee }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
      
      <div className="space-y-3">
        {currentUser.role === 'admin' ? (
          <>
            <button
              onClick={onCreateTask}
              className="w-full flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create New Task
            </button>
            
            <button
              onClick={onAddEmployee}
              className="w-full flex items-center justify-center px-4 py-3 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
            >
              <Users className="h-5 w-5 mr-2" />
              Add Employee
            </button>
          </>
        ) : (
          <a
            href="/tasks"
            className="w-full flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <CheckSquare className="h-5 w-5 mr-2" />
            View My Tasks
          </a>
        )}
      </div>
    </div>
  );
};

export default QuickActions;