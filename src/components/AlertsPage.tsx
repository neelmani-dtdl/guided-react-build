import { useState } from 'react';
import { AlertTriangle, Bell, Plus, Filter, MoreHorizontal, Clock, Users, TrendingDown, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const alertsData = [
  {
    id: 1,
    title: 'Low Engagement Alert',
    description: '15 employees showing declining engagement scores',
    type: 'warning',
    priority: 'high',
    timestamp: '2 hours ago',
    affected: 15,
    status: 'active',
    department: 'Engineering'
  },
  {
    id: 2,
    title: 'Attrition Risk Detection',
    description: '8 high-performers identified as flight risks',
    type: 'danger',
    priority: 'critical',
    timestamp: '4 hours ago',
    affected: 8,
    status: 'active',
    department: 'Sales'
  },
  {
    id: 3,
    title: 'Training Completion Reminder',
    description: 'Q4 compliance training due in 5 days',
    type: 'info',
    priority: 'medium',
    timestamp: '1 day ago',
    affected: 120,
    status: 'pending',
    department: 'All'
  },
  {
    id: 4,
    title: 'Performance Review Due',
    description: '25 performance reviews pending approval',
    type: 'warning',
    priority: 'medium',
    timestamp: '3 days ago',
    affected: 25,
    status: 'resolved',
    department: 'HR'
  }
];

const nudgesData = [
  {
    id: 1,
    title: 'Career Development Check-in',
    description: 'Suggested 1:1 meetings for high-potential employees',
    target: 'Managers',
    frequency: 'Monthly',
    lastSent: '1 week ago',
    openRate: '78%',
    actionRate: '45%'
  },
  {
    id: 2,
    title: 'Wellness Program Reminder',
    description: 'Encourage participation in mental health resources',
    target: 'All Employees',
    frequency: 'Bi-weekly',
    lastSent: '3 days ago',
    openRate: '65%',
    actionRate: '32%'
  },
  {
    id: 3,
    title: 'Skills Assessment Nudge',
    description: 'Prompt employees to update skill profiles',
    target: 'Individual Contributors',
    frequency: 'Quarterly',
    lastSent: '2 weeks ago',
    openRate: '82%',
    actionRate: '58%'
  }
];

export function AlertsPage() {
  const [selectedTab, setSelectedTab] = useState('alerts');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [isCreateAlertOpen, setIsCreateAlertOpen] = useState(false);
  const [isCreateNudgeOpen, setIsCreateNudgeOpen] = useState(false);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'danger': return 'destructive';
      case 'warning': return 'warning';
      case 'info': return 'secondary';
      default: return 'secondary';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'warning';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'secondary';
    }
  };

  const handleAlertAction = (alertId: number, action: string) => {
    console.log(`Alert ${alertId}: ${action}`);
    // Implement alert actions
  };

  const filteredAlerts = alertsData.filter(alert => {
    if (filterStatus !== 'all' && alert.status !== filterStatus) return false;
    if (filterPriority !== 'all' && alert.priority !== filterPriority) return false;
    return true;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Alerts & Nudges</h1>
          <p className="text-muted-foreground">Proactive notifications and engagement tools</p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog open={isCreateAlertOpen} onOpenChange={setIsCreateAlertOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create Alert Rule
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Alert Rule</DialogTitle>
                <DialogDescription>
                  Set up automatic notifications for important events
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="alert-name" className="text-right">Name</Label>
                  <Input id="alert-name" placeholder="Alert rule name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="alert-type" className="text-right">Type</Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select alert type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engagement">Engagement Drop</SelectItem>
                      <SelectItem value="attrition">Attrition Risk</SelectItem>
                      <SelectItem value="performance">Performance Issue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="threshold" className="text-right">Threshold</Label>
                  <Input id="threshold" placeholder="e.g., 70%" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">Description</Label>
                  <Textarea id="description" placeholder="Alert description" className="col-span-3" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => setIsCreateAlertOpen(false)}>Create Alert</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
          <TabsTrigger value="nudges">Smart Nudges</TabsTrigger>
          <TabsTrigger value="history">Alert History</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-6">
          {/* Filters */}
          <div className="flex items-center gap-4">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </Button>
          </div>

          {/* Alerts List */}
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <Card key={alert.id} className="hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-muted">
                        {alert.type === 'danger' && <AlertTriangle className="w-5 h-5 text-danger" />}
                        {alert.type === 'warning' && <AlertTriangle className="w-5 h-5 text-warning" />}
                        {alert.type === 'info' && <Bell className="w-5 h-5 text-primary" />}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{alert.title}</h3>
                          <Badge variant={alert.priority === 'critical' ? 'destructive' : 'secondary'}>{alert.priority}</Badge>
                          <Badge variant={alert.status === 'resolved' ? 'secondary' : 'outline'}>{alert.status}</Badge>
                        </div>
                        <p className="text-muted-foreground">{alert.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {alert.timestamp}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {alert.affected} affected
                          </span>
                          <span>{alert.department}</span>
                        </div>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleAlertAction(alert.id, 'view')}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAlertAction(alert.id, 'resolve')}>
                          Mark Resolved
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAlertAction(alert.id, 'snooze')}>
                          Snooze
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAlertAction(alert.id, 'delete')}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="nudges" className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Automated engagement and reminder campaigns</p>
            <Dialog open={isCreateNudgeOpen} onOpenChange={setIsCreateNudgeOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create Nudge
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create Smart Nudge</DialogTitle>
                  <DialogDescription>
                    Set up automated engagement campaigns
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="nudge-name" className="text-right">Campaign</Label>
                    <Input id="nudge-name" placeholder="Campaign name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="target" className="text-right">Target</Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select target audience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Employees</SelectItem>
                        <SelectItem value="managers">Managers</SelectItem>
                        <SelectItem value="individual">Individual Contributors</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="frequency" className="text-right">Frequency</Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="enabled" className="text-right">Enabled</Label>
                    <Switch id="enabled" className="col-span-3" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => setIsCreateNudgeOpen(false)}>Create Nudge</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nudgesData.map((nudge) => (
              <Card key={nudge.id} className="hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <CardTitle className="text-lg">{nudge.title}</CardTitle>
                  <CardDescription>{nudge.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Target:</p>
                      <p className="font-medium">{nudge.target}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Frequency:</p>
                      <p className="font-medium">{nudge.frequency}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Open Rate:</p>
                      <p className="font-medium text-success">{nudge.openRate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Action Rate:</p>
                      <p className="font-medium text-primary">{nudge.actionRate}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <p className="text-xs text-muted-foreground">Last sent: {nudge.lastSent}</p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button size="sm">Send Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alert History</CardTitle>
              <CardDescription>View past alerts and their resolutions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertsData.filter(alert => alert.status === 'resolved').map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <div>
                        <h4 className="font-medium">{alert.title}</h4>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Resolved</p>
                      <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}