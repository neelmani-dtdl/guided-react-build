// Mock data for People Team AI-Powered Data Platform

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  location: string;
  joinDate: string;
  performance: number;
  engagement: number;
  riskLevel: 'low' | 'medium' | 'high';
  skills: string[];
  manager: string;
  avatar: string;
  status: 'active' | 'onLeave' | 'terminated';
  platforms: {
    darwinbox: boolean;
    klaar: boolean;
    turbohire: boolean;
    newHire: boolean;
    anker: boolean;
    officePortal: boolean;
  };
  metrics: {
    productivityScore: number;
    attendanceRate: number;
    projectsCompleted: number;
    trainingHours: number;
    feedbackScore: number;
  };
}

export interface DashboardMetrics {
  totalEmployees: number;
  activeEmployees: number;
  attritionRate: number;
  avgEngagement: number;
  avgPerformance: number;
  topPerformers: number;
  atRiskEmployees: number;
  newHires: number;
  openPositions: number;
  trainingCompletion: number;
}

export interface Alert {
  id: string;
  type: 'warning' | 'danger' | 'info' | 'success';
  title: string;
  description: string;
  timestamp: string;
  actionRequired: boolean;
  relatedEmployees?: string[];
}

export interface AIInsight {
  id: string;
  type: 'recommendation' | 'prediction' | 'trend';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  category: string;
  actionItems: string[];
}

// Mock employee data
export const mockEmployees: Employee[] = [
  {
    id: 'emp-001',
    name: 'Sarah Chen',
    email: 'sarah.chen@telekom.de',
    department: 'Engineering',
    role: 'Senior Software Engineer',
    location: 'Berlin',
    joinDate: '2022-03-15',
    performance: 92,
    engagement: 88,
    riskLevel: 'low',
    skills: ['React', 'TypeScript', 'Node.js', 'AI/ML'],
    manager: 'Michael Weber',
    avatar: '/placeholder.svg',
    status: 'active',
    platforms: {
      darwinbox: true,
      klaar: true,
      turbohire: false,
      newHire: false,
      anker: true,
      officePortal: true
    },
    metrics: {
      productivityScore: 95,
      attendanceRate: 98,
      projectsCompleted: 12,
      trainingHours: 45,
      feedbackScore: 4.8
    }
  },
  {
    id: 'emp-002',
    name: 'Marcus Schmidt',
    email: 'marcus.schmidt@telekom.de',
    department: 'Data Science',
    role: 'Data Scientist',
    location: 'Munich',
    joinDate: '2021-08-20',
    performance: 89,
    engagement: 75,
    riskLevel: 'medium',
    skills: ['Python', 'Machine Learning', 'SQL', 'Tableau'],
    manager: 'Anna Mueller',
    avatar: '/placeholder.svg',
    status: 'active',
    platforms: {
      darwinbox: true,
      klaar: true,
      turbohire: false,
      newHire: false,
      anker: false,
      officePortal: true
    },
    metrics: {
      productivityScore: 87,
      attendanceRate: 94,
      projectsCompleted: 8,
      trainingHours: 32,
      feedbackScore: 4.2
    }
  },
  {
    id: 'emp-003',
    name: 'Lisa Rodriguez',
    email: 'lisa.rodriguez@telekom.de',
    department: 'Product Management',
    role: 'Product Manager',
    location: 'Hamburg',
    joinDate: '2020-11-10',
    performance: 78,
    engagement: 65,
    riskLevel: 'high',
    skills: ['Product Strategy', 'Agile', 'User Research', 'Analytics'],
    manager: 'Thomas Fischer',
    avatar: '/placeholder.svg',
    status: 'active',
    platforms: {
      darwinbox: true,
      klaar: false,
      turbohire: false,
      newHire: false,
      anker: true,
      officePortal: true
    },
    metrics: {
      productivityScore: 72,
      attendanceRate: 88,
      projectsCompleted: 5,
      trainingHours: 18,
      feedbackScore: 3.8
    }
  },
  {
    id: 'emp-004',
    name: 'David Park',
    email: 'david.park@telekom.de',
    department: 'Engineering',
    role: 'DevOps Engineer',
    location: 'Frankfurt',
    joinDate: '2023-01-15',
    performance: 85,
    engagement: 91,
    riskLevel: 'low',
    skills: ['Kubernetes', 'AWS', 'Docker', 'Terraform'],
    manager: 'Michael Weber',
    avatar: '/placeholder.svg',
    status: 'active',
    platforms: {
      darwinbox: true,
      klaar: true,
      turbohire: true,
      newHire: true,
      anker: true,
      officePortal: true
    },
    metrics: {
      productivityScore: 88,
      attendanceRate: 96,
      projectsCompleted: 7,
      trainingHours: 28,
      feedbackScore: 4.5
    }
  },
  {
    id: 'emp-005',
    name: 'Emma Thompson',
    email: 'emma.thompson@telekom.de',
    department: 'UX Design',
    role: 'Senior UX Designer',
    location: 'Berlin',
    joinDate: '2021-05-03',
    performance: 94,
    engagement: 87,
    riskLevel: 'low',
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    manager: 'Sophie Wagner',
    avatar: '/placeholder.svg',
    status: 'active',
    platforms: {
      darwinbox: true,
      klaar: true,
      turbohire: false,
      newHire: false,
      anker: true,
      officePortal: true
    },
    metrics: {
      productivityScore: 92,
      attendanceRate: 97,
      projectsCompleted: 11,
      trainingHours: 38,
      feedbackScore: 4.7
    }
  }
];

// Dashboard metrics
export const mockDashboardMetrics: DashboardMetrics = {
  totalEmployees: 1247,
  activeEmployees: 1198,
  attritionRate: 8.2,
  avgEngagement: 82,
  avgPerformance: 86,
  topPerformers: 156,
  atRiskEmployees: 89,
  newHires: 34,
  openPositions: 23,
  trainingCompletion: 78
};

// AI Insights
export const mockAIInsights: AIInsight[] = [
  {
    id: 'insight-001',
    type: 'prediction',
    title: 'Attrition Risk Alert',
    description: 'Our AI model predicts 12 employees in Product Management are at high risk of leaving within the next 3 months based on engagement scores and performance patterns.',
    confidence: 87,
    impact: 'high',
    category: 'Retention',
    actionItems: [
      'Schedule 1-on-1 meetings with at-risk employees',
      'Review compensation and career development plans',
      'Implement targeted engagement initiatives'
    ]
  },
  {
    id: 'insight-002',
    type: 'recommendation',
    title: 'Skills Gap Identification',
    description: 'Analysis shows a 40% skills gap in AI/ML capabilities across Engineering teams, which may impact upcoming project deliveries.',
    confidence: 93,
    impact: 'high',
    category: 'Skills Development',
    actionItems: [
      'Launch AI/ML training program',
      'Hire 3-5 ML engineers',
      'Partner with external training providers'
    ]
  },
  {
    id: 'insight-003',
    type: 'trend',
    title: 'Remote Work Productivity',
    description: 'Employees working remotely 3+ days per week show 15% higher productivity scores and engagement levels.',
    confidence: 78,
    impact: 'medium',
    category: 'Work Arrangements',
    actionItems: [
      'Expand flexible work policies',
      'Invest in remote collaboration tools',
      'Create hybrid work guidelines'
    ]
  }
];

// Smart alerts and nudges
export const mockAlerts: Alert[] = [
  {
    id: 'alert-001',
    type: 'warning',
    title: 'Engagement Score Drop',
    description: 'UX Design team engagement has dropped 12% this month',
    timestamp: '2024-01-15T10:30:00Z',
    actionRequired: true,
    relatedEmployees: ['emp-005']
  },
  {
    id: 'alert-002',
    type: 'danger',
    title: 'High Attrition Risk',
    description: 'Lisa Rodriguez shows multiple risk indicators for leaving',
    timestamp: '2024-01-15T09:15:00Z',
    actionRequired: true,
    relatedEmployees: ['emp-003']
  },
  {
    id: 'alert-003',
    type: 'info',
    title: 'Training Completion Due',
    description: '23 employees have mandatory training due this week',
    timestamp: '2024-01-15T08:00:00Z',
    actionRequired: false
  },
  {
    id: 'alert-004',
    type: 'success',
    title: 'Performance Milestone',
    description: 'Engineering team exceeded Q4 performance targets by 18%',
    timestamp: '2024-01-14T16:20:00Z',
    actionRequired: false
  }
];

// Platform integration status
export const platformsData = [
  {
    name: 'Darwinbox',
    description: 'Employee master data',
    status: 'connected',
    lastSync: '2024-01-15T12:00:00Z',
    employeesCovered: 1247,
    dataPoints: ['Personal Info', 'Employment History', 'Compensation']
  },
  {
    name: 'Klaar',
    description: 'Performance and development',
    status: 'connected',
    lastSync: '2024-01-15T11:45:00Z',
    employeesCovered: 1198,
    dataPoints: ['Performance Reviews', 'Goal Tracking', 'Development Plans']
  },
  {
    name: 'TurboHire',
    description: 'Hiring, referrals, LPs',
    status: 'connected',
    lastSync: '2024-01-15T11:30:00Z',
    employeesCovered: 156,
    dataPoints: ['Recruitment Pipeline', 'Interview Feedback', 'Referrals']
  },
  {
    name: 'New Hire',
    description: 'Requisitions and vacancies',
    status: 'connected',
    lastSync: '2024-01-15T11:15:00Z',
    employeesCovered: 89,
    dataPoints: ['Job Requisitions', 'Vacancy Management', 'Onboarding']
  },
  {
    name: 'Anker',
    description: 'Pulse checks, eNPS, engagement',
    status: 'partial',
    lastSync: '2024-01-15T10:00:00Z',
    employeesCovered: 987,
    dataPoints: ['Engagement Surveys', 'Pulse Checks', 'eNPS Scores']
  },
  {
    name: 'Office Portal',
    description: 'Payroll and compensation',
    status: 'connected',
    lastSync: '2024-01-15T12:15:00Z',
    employeesCovered: 1247,
    dataPoints: ['Payroll Data', 'Benefits', 'Compensation History']
  }
];

// Chart data for visualizations
export const engagementTrendData = [
  { month: 'Jul', score: 78 },
  { month: 'Aug', score: 82 },
  { month: 'Sep', score: 79 },
  { month: 'Oct', score: 85 },
  { month: 'Nov', score: 83 },
  { month: 'Dec', score: 87 },
  { month: 'Jan', score: 82 }
];

export const departmentPerformanceData = [
  { department: 'Engineering', performance: 88, engagement: 85, headcount: 342 },
  { department: 'Product', performance: 82, engagement: 78, headcount: 156 },
  { department: 'Design', performance: 91, engagement: 89, headcount: 89 },
  { department: 'Data Science', performance: 87, engagement: 81, headcount: 67 },
  { department: 'Marketing', performance: 79, engagement: 76, headcount: 234 },
  { department: 'Sales', performance: 84, engagement: 83, headcount: 298 }
];

export const attritionByDepartment = [
  { department: 'Engineering', rate: 6.2 },
  { department: 'Product', rate: 12.4 },
  { department: 'Design', rate: 4.8 },
  { department: 'Data Science', rate: 8.9 },
  { department: 'Marketing', rate: 11.2 },
  { department: 'Sales', rate: 9.7 }
];