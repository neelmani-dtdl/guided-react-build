import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Brain,
  Target,
  Clock,
  Award,
  UserCheck,
  UserX,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  mockDashboardMetrics,
  mockAIInsights,
  mockAlerts,
  engagementTrendData,
  departmentPerformanceData,
  attritionByDepartment
} from '@/data/mockData';

const COLORS = ['hsl(var(--primary))', 'hsl(var(--success))', 'hsl(var(--warning))', 'hsl(var(--danger))'];

export function Dashboard() {
  const metrics = mockDashboardMetrics;
  const insights = mockAIInsights.slice(0, 3);
  const alerts = mockAlerts.slice(0, 4);

  const MetricCard = ({ title, value, change, icon: Icon, trend, color = 'default' }: any) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className={`h-5 w-5 ${color === 'success' ? 'text-success' : color === 'warning' ? 'text-warning' : color === 'danger' ? 'text-danger' : 'text-primary'}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div className="flex items-center text-xs text-muted-foreground">
            {trend === 'up' ? (
              <TrendingUp className="mr-1 h-3 w-3 text-success" />
            ) : (
              <TrendingDown className="mr-1 h-3 w-3 text-danger" />
            )}
            {change} from last month
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">People Analytics Dashboard</h1>
          <p className="text-muted-foreground">Unified view of your workforce across all platforms</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export Report</Button>
          <Button className="bg-gradient-primary">Generate AI Summary</Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Employees"
          value={metrics.totalEmployees.toLocaleString()}
          change="+2.3%"
          trend="up"
          icon={Users}
          color="default"
        />
        <MetricCard
          title="Avg Engagement"
          value={`${metrics.avgEngagement}%`}
          change="+5.2%"
          trend="up"
          icon={Target}
          color="success"
        />
        <MetricCard
          title="Attrition Rate"
          value={`${metrics.attritionRate}%`}
          change="-1.1%"
          trend="down"
          icon={UserX}
          color="warning"
        />
        <MetricCard
          title="At Risk Employees"
          value={metrics.atRiskEmployees}
          change="+12"
          trend="up"
          icon={AlertTriangle}
          color="danger"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Top Performers"
          value={metrics.topPerformers}
          icon={Award}
          color="success"
        />
        <MetricCard
          title="New Hires (30d)"
          value={metrics.newHires}
          icon={UserCheck}
          color="primary"
        />
        <MetricCard
          title="Open Positions"
          value={metrics.openPositions}
          icon={Briefcase}
          color="warning"
        />
        <MetricCard
          title="Training Completion"
          value={`${metrics.trainingCompletion}%`}
          icon={GraduationCap}
          color="primary"
        />
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Engagement Trend</CardTitle>
            <CardDescription>Employee engagement scores over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>Performance vs engagement by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="performance" fill="hsl(var(--primary))" />
                <Bar dataKey="engagement" fill="hsl(var(--success))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              AI-Driven Insights
            </CardTitle>
            <CardDescription>Latest recommendations from our AI platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {insights.map((insight) => (
              <div key={insight.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm">{insight.title}</h4>
                  <Badge variant={insight.impact === 'high' ? 'destructive' : insight.impact === 'medium' ? 'default' : 'secondary'}>
                    {insight.confidence}% confidence
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                <div className="flex flex-wrap gap-1">
                  {insight.actionItems.slice(0, 2).map((action, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {action}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Insights
            </Button>
          </CardContent>
        </Card>

        {/* Smart Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Smart Alerts & Nudges
            </CardTitle>
            <CardDescription>Important notifications requiring attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm">{alert.title}</h4>
                  <Badge variant={
                    alert.type === 'danger' ? 'destructive' : 
                    alert.type === 'warning' ? 'default' : 
                    alert.type === 'success' ? 'secondary' : 'outline'
                  }>
                    {alert.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {new Date(alert.timestamp).toLocaleDateString()}
                  </span>
                  {alert.actionRequired && (
                    <Button size="sm" variant="outline">
                      Take Action
                    </Button>
                  )}
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Alerts
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Platform Status */}
      <Card>
        <CardHeader>
          <CardTitle>Data Platform Status</CardTitle>
          <CardDescription>Real-time sync status across all HR platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Darwinbox', status: 'Connected', sync: '99.8%', employees: 1247 },
              { name: 'Klaar', status: 'Connected', sync: '98.2%', employees: 1198 },
              { name: 'TurboHire', status: 'Connected', sync: '96.5%', employees: 156 },
              { name: 'New Hire', status: 'Connected', sync: '97.1%', employees: 89 },
              { name: 'Anker', status: 'Partial', sync: '89.3%', employees: 987 },
              { name: 'Office Portal', status: 'Connected', sync: '99.9%', employees: 1247 }
            ].map((platform) => (
              <div key={platform.name} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{platform.name}</h4>
                  <Badge variant={platform.status === 'Connected' ? 'secondary' : 'default'}>
                    {platform.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sync Rate</span>
                    <span className="font-medium">{platform.sync}</span>
                  </div>
                  <Progress value={parseFloat(platform.sync)} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Employees</span>
                    <span className="font-medium">{platform.employees.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}