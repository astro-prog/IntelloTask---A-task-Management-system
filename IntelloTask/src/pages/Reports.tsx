import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Download, Calendar, Filter, TrendingUp, Users, CheckCircle, Clock } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import Sidebar from '../components/Layout/Sidebar';
import { useAuth } from '../contexts/AuthContext';
import { Task, User } from '../types';
import { DataService } from '../services/dataService';

const Reports: React.FC = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [timeFilter, setTimeFilter] = useState('all');

  useEffect(() => {
    setTasks(DataService.getTasks());
    setUsers(DataService.getUsers());
  }, []);

  // Workload Chart Data
  const getWorkloadData = () => {
    const employees = users.filter(u => u.role === 'employee' && u.status === 'active');
    return employees.map(employee => {
      const employeeTasks = tasks.filter(task => task.assignedTo === employee.id);
      const completedTasks = employeeTasks.filter(task => task.status === 'completed').length;
      const inProgressTasks = employeeTasks.filter(task => task.status === 'in-progress').length;
      const pendingTasks = employeeTasks.filter(task => task.status === 'pending').length;

      return {
        name: employee.name,
        completed: completedTasks,
        inProgress: inProgressTasks,
        pending: pendingTasks,
        total: employeeTasks.length,
      };
    });
  };

  // Work Status Pie Chart Data
  const getWorkStatusData = () => {
    const userTasks = user?.role === 'admin' ? tasks : tasks.filter(task => task.assignedTo === user?.id);
    const statusCounts = {
      completed: userTasks.filter(task => task.status === 'completed').length,
      'in-progress': userTasks.filter(task => task.status === 'in-progress').length,
      pending: userTasks.filter(task => task.status === 'pending').length,
    };

    return [
      { name: 'Completed', value: statusCounts.completed, color: '#10B981' },
      { name: 'In Progress', value: statusCounts['in-progress'], color: '#3B82F6' },
      { name: 'Pending', value: statusCounts.pending, color: '#F59E0B' },
    ];
  };

  // Completion Rate Over Time
  const getCompletionRateData = () => {
    const last6Months = [];
    const now = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      
      const monthTasks = tasks.filter(task => {
        const taskDate = new Date(task.createdAt);
        return taskDate.getMonth() === date.getMonth() && taskDate.getFullYear() === date.getFullYear();
      });
      
      const completedTasks = monthTasks.filter(task => task.status === 'completed').length;
      const completionRate = monthTasks.length > 0 ? (completedTasks / monthTasks.length) * 100 : 0;
      
      last6Months.push({
        month: `${monthName} ${year}`,
        completionRate: Math.round(completionRate),
        totalTasks: monthTasks.length,
        completedTasks,
      });
    }
    
    return last6Months;
  };

  const handleDownloadReport = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      user: user?.name,
      workloadData: getWorkloadData(),
      workStatusData: getWorkStatusData(),
      completionRateData: getCompletionRateData(),
      totalTasks: tasks.length,
      totalEmployees: users.filter(u => u.role === 'employee' && u.status === 'active').length,
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `intellotask-report-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const workloadData = getWorkloadData();
  const workStatusData = getWorkStatusData();
  const completionRateData = getCompletionRateData();

  // Summary stats
  const totalTasks = user?.role === 'admin' ? tasks.length : tasks.filter(task => task.assignedTo === user?.id).length;
  const completedTasks = user?.role === 'admin' 
    ? tasks.filter(task => task.status === 'completed').length 
    : tasks.filter(task => task.assignedTo === user?.id && task.status === 'completed').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const activeEmployees = users.filter(u => u.role === 'employee' && u.status === 'active').length;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
                <p className="text-gray-600 mt-2">Track performance and analyze productivity metrics</p>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Time</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                </select>
                <button
                  onClick={handleDownloadReport}
                  className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Export Report
                </button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                    <p className="text-2xl font-bold text-gray-900">{totalTasks}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{completionRate}%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Employees</p>
                    <p className="text-2xl font-bold text-gray-900">{activeEmployees}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Avg. Tasks/Employee</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {activeEmployees > 0 ? Math.round(totalTasks / activeEmployees) : 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Workload Chart */}
              {user.role === 'admin' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Employee Workload</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={workloadData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="completed" stackId="a" fill="#10B981" name="Completed" />
                      <Bar dataKey="inProgress" stackId="a" fill="#3B82F6" name="In Progress" />
                      <Bar dataKey="pending" stackId="a" fill="#F59E0B" name="Pending" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Work Status Pie Chart */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Task Status Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={workStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {workStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Completion Rate Trend */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Completion Rate Trend (Last 6 Months)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={completionRateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'completionRate' ? `${value}%` : value,
                      name === 'completionRate' ? 'Completion Rate' : name
                    ]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="completionRate" 
                    stroke="#8B5CF6" 
                    strokeWidth={3}
                    dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reports;