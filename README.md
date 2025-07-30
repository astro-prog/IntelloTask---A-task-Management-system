# IntelloTask -  Task Management Application for corporate employees

🚀 **[Visit the website](https://intellotask.netlify.app)**

A comprehensive, high-end task management web application designed for modern teams. IntelloTask provides role-based access control, real-time analytics, and an intuitive user interface for efficient project and employee management.

## 🚀 Features

### 🔐 Authentication System
- **Secure Login**: Email/password authentication with input validation
- **Social Authentication**: Login with Google, Apple, and Microsoft accounts
- **Role-Based Access**: Admin and Employee user roles with different permissions
- **SQL Injection Protection**: Sanitized inputs and secure authentication flow

### 📊 Dashboard
- **Role-Specific Views**: Different dashboards for Admin and Employee users
- **Real-Time Widgets**: Live task statistics (Pending, In-Progress, Completed)
- **Quick Actions**: Context-aware action buttons based on user role
- **Task Overview**: Recent tasks with status indicators and priority levels

### ✅ Task Management
- **Dual View Modes**: List view and Kanban board for task visualization
- **Advanced Filtering**: Filter by status, priority, assignee, and due date
- **Task CRUD Operations**: Create, read, update, and delete tasks
- **Priority System**: High, Medium, Low priority levels with color coding
- **Status Tracking**: Pending, In-Progress, Completed status workflow
- **Search Functionality**: Real-time search across task titles and descriptions

### 👥 Employee Management (Admin Only)
- **Employee Directory**: Comprehensive list of all team members
- **Performance Tracking**: Task completion rates and workload visualization
- **User Management**: Add, edit, and deactivate employee accounts
- **Department Organization**: Organize employees by departments
- **Workload Analysis**: Visual charts showing task distribution per employee

### 📈 Reports & Analytics
- **Interactive Charts**: Bar charts, pie charts, and line graphs
- **Workload Distribution**: Visual representation of tasks per employee
- **Completion Rate Trends**: Track productivity over time
- **Export Functionality**: Download reports in JSON format
- **Time-Based Filtering**: Filter analytics by different time periods

### ⚙️ Settings & Profile Management
- **Profile Management**: Update personal information and preferences
- **Password Security**: Change passwords with validation
- **Notification Preferences**: Customize notification settings
- **Department Assignment**: Update department and role information

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript for type-safe development
- **React Router DOM** for client-side routing
- **Tailwind CSS** for responsive, utility-first styling
- **Lucide React** for consistent iconography
- **Recharts** for interactive data visualizations

### Development Tools
- **Vite** for fast development and building
- **ESLint** for code quality and consistency
- **TypeScript** for static type checking
- **PostCSS** with Autoprefixer for CSS processing

### Data Management
- **LocalStorage** for demo data persistence
- **Context API** for state management
- **Custom Data Service** for CRUD operations

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/intellotask.git
   cd intellotask
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application


### Demo Credentials

#### Admin Account
- **Email**: admin@intellotask.com
- **Password**: admin123
- **Access**: Full system access including employee management

#### Employee Account
- **Email**: john@intellotask.com
- **Password**: emp123
- **Access**: Personal task management and reporting

#### Social Login
- Click on Google, Apple, or Microsoft buttons for social authentication
- Demo social accounts will be automatically created

## 📱 User Interface

### Design Principles
- **Clean & Modern**: White background with purple (#8B5CF6) accent colors
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Intuitive Navigation**: Clear sidebar navigation with active state indicators
- **Consistent Styling**: Uniform card-based layout throughout the application
- **Accessibility**: Proper contrast ratios and keyboard navigation support

### Key UI Components
- **Navigation Bar**: User profile, notifications, and logout functionality
- **Sidebar**: Role-based navigation menu with active state indicators
- **Modal Dialogs**: For creating and editing tasks and employees
- **Data Tables**: Sortable and filterable tables for data management
- **Interactive Charts**: Real-time data visualizations with hover effects
- **Form Controls**: Consistent styling for inputs, selects, and buttons

## 🔧 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Dashboard/       # Dashboard-specific components
│   ├── Employees/       # Employee management components
│   ├── Layout/          # Navigation and layout components
│   ├── Login/           # Authentication components
│   └── Tasks/           # Task management components
├── contexts/            # React Context providers
├── pages/               # Main application pages
├── services/            # Data management services
├── types/               # TypeScript type definitions
└── App.tsx             # Main application component
```

## 🎯 User Roles & Permissions

### Admin Users
- ✅ Full dashboard access with system-wide statistics
- ✅ Create, edit, and delete tasks for all employees
- ✅ Employee management (add, edit, deactivate users)
- ✅ Access to all reports and analytics
- ✅ System settings and configuration

### Employee Users
- ✅ Personal dashboard with assigned task statistics
- ✅ View and update assigned tasks
- ✅ Personal performance reports
- ✅ Profile and notification settings
- ❌ Cannot access employee management
- ❌ Limited to personal task data

## 📊 Data Models

### User Model
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'employee';
  department?: string;
  status: 'active' | 'inactive';
  createdAt: string;
}
```

### Task Model
```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedBy: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  attachments?: string[];
  comments?: Comment[];
}
```

## 🔒 Security Features

- **Input Sanitization**: Protection against SQL injection attacks
- **Role-Based Access Control**: Restricted access based on user roles
- **Password Validation**: Secure password requirements and hashing
- **Session Management**: Secure user session handling
- **Data Validation**: Client and server-side input validation

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deployment Options
- **Netlify**: Connect your repository for automatic deployments
- **Vercel**: Deploy with zero configuration
- **GitHub Pages**: Host static builds directly from GitHub
- **AWS S3**: Deploy to AWS with CloudFront for global distribution

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Made with ❤️ by [**@astro-prog**](https://github.com/astro-prog)

**IntelloTask** - Empowering teams with intelligent task management 🚀
