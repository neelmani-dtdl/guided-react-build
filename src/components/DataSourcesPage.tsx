import { useState } from 'react';
import { Database, Plug, AlertCircle, CheckCircle, Clock, Settings, Plus, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';

const dataSourcesData = [
  {
    id: 1,
    name: 'Darwinbox',
    type: 'HRIS',
    status: 'connected',
    lastSync: '2 minutes ago',
    syncFrequency: 'Real-time',
    recordCount: 1247,
    dataTypes: ['Employee Records', 'Performance', 'Attendance'],
    apiHealth: 98,
    configuration: {
      apiKey: '****7890',
      endpoint: 'api.darwinbox.io',
      version: 'v2.1'
    }
  },
  {
    id: 2,
    name: 'Klaar',
    type: 'Performance',
    status: 'connected',
    lastSync: '15 minutes ago',
    syncFrequency: 'Hourly',
    recordCount: 892,
    dataTypes: ['Goals', 'Reviews', 'Feedback'],
    apiHealth: 95,
    configuration: {
      apiKey: '****3456',
      endpoint: 'app.klaar.co',
      version: 'v1.8'
    }
  },
  {
    id: 3,
    name: 'TurboHire',
    type: 'ATS',
    status: 'syncing',
    lastSync: '1 hour ago',
    syncFrequency: 'Daily',
    recordCount: 156,
    dataTypes: ['Job Postings', 'Applications', 'Interviews'],
    apiHealth: 87,
    configuration: {
      apiKey: '****9012',
      endpoint: 'api.turbohire.co',
      version: 'v3.0'
    }
  },
  {
    id: 4,
    name: 'NewHire',
    type: 'Onboarding',
    status: 'warning',
    lastSync: '3 hours ago',
    syncFrequency: 'Daily',
    recordCount: 45,
    dataTypes: ['Onboarding Tasks', 'Documents', 'Training'],
    apiHealth: 72,
    configuration: {
      apiKey: '****5678',
      endpoint: 'newhire.app',
      version: 'v1.5'
    }
  },
  {
    id: 5,
    name: 'Anker',
    type: 'Learning',
    status: 'disconnected',
    lastSync: '2 days ago',
    syncFrequency: 'Weekly',
    recordCount: 0,
    dataTypes: ['Courses', 'Certifications', 'Skills'],
    apiHealth: 0,
    configuration: {
      apiKey: '****2345',
      endpoint: 'anker.learn',
      version: 'v2.0'
    }
  },
  {
    id: 6,
    name: 'Office Portal',
    type: 'Communication',
    status: 'connected',
    lastSync: '30 minutes ago',
    syncFrequency: 'Hourly',
    recordCount: 2341,
    dataTypes: ['Messages', 'Announcements', 'Events'],
    apiHealth: 92,
    configuration: {
      apiKey: '****6789',
      endpoint: 'portal.office.com',
      version: 'v1.2'
    }
  }
];

const syncHistory = [
  { timestamp: '2024-01-15 10:30', source: 'Darwinbox', status: 'success', records: 15, duration: '2.3s' },
  { timestamp: '2024-01-15 10:15', source: 'Klaar', status: 'success', records: 8, duration: '1.8s' },
  { timestamp: '2024-01-15 10:00', source: 'Office Portal', status: 'success', records: 23, duration: '3.1s' },
  { timestamp: '2024-01-15 09:45', source: 'TurboHire', status: 'warning', records: 3, duration: '12.4s' },
  { timestamp: '2024-01-15 09:30', source: 'NewHire', status: 'failed', records: 0, duration: '0s' }
];

export function DataSourcesPage() {
  const [selectedSource, setSelectedSource] = useState<any>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isAddSourceOpen, setIsAddSourceOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'secondary';
      case 'syncing': return 'outline';
      case 'warning': return 'destructive';
      case 'disconnected': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-4 h-4" />;
      case 'syncing': return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'warning': return <AlertCircle className="w-4 h-4" />;
      case 'disconnected': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleSync = (sourceId: number) => {
    console.log(`Syncing source ${sourceId}`);
    // Implement sync functionality
  };

  const handleConfigure = (source: any) => {
    setSelectedSource(source);
    setIsConfigOpen(true);
  };

  const totalRecords = dataSourcesData.reduce((sum, source) => sum + source.recordCount, 0);
  const connectedSources = dataSourcesData.filter(source => source.status === 'connected').length;
  const avgHealth = Math.round(dataSourcesData.reduce((sum, source) => sum + source.apiHealth, 0) / dataSourcesData.length);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Data Sources</h1>
          <p className="text-muted-foreground">Manage integrations and data synchronization</p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog open={isAddSourceOpen} onOpenChange={setIsAddSourceOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Integration
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Integration</DialogTitle>
                <DialogDescription>
                  Connect a new data source to your platform
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="source-type" className="text-right">Type</Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select integration type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hris">HRIS System</SelectItem>
                      <SelectItem value="ats">Applicant Tracking</SelectItem>
                      <SelectItem value="performance">Performance Management</SelectItem>
                      <SelectItem value="learning">Learning Management</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="api-endpoint" className="text-right">API Endpoint</Label>
                  <Input id="api-endpoint" placeholder="https://api.example.com" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="api-key" className="text-right">API Key</Label>
                  <Input id="api-key" type="password" placeholder="Your API key" className="col-span-3" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => setIsAddSourceOpen(false)}>Connect Integration</Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Sync All
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Connected Sources</p>
                <p className="text-2xl font-bold">{connectedSources}/6</p>
              </div>
              <Plug className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Records</p>
                <p className="text-2xl font-bold">{totalRecords.toLocaleString()}</p>
              </div>
              <Database className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">API Health</p>
                <p className="text-2xl font-bold">{avgHealth}%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Last Sync</p>
                <p className="text-2xl font-bold">2m</p>
              </div>
              <RefreshCw className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Data Sources</TabsTrigger>
          <TabsTrigger value="sync">Sync History</TabsTrigger>
          <TabsTrigger value="settings">Global Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {dataSourcesData.map((source) => (
              <Card key={source.id} className="hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Database className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{source.name}</CardTitle>
                        <CardDescription>{source.type}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={getStatusColor(source.status)} className="gap-1">
                      {getStatusIcon(source.status)}
                      {source.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Last Sync:</p>
                      <p className="font-medium">{source.lastSync}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Frequency:</p>
                      <p className="font-medium">{source.syncFrequency}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Records:</p>
                      <p className="font-medium">{source.recordCount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">API Health:</p>
                      <div className="flex items-center gap-2">
                        <Progress value={source.apiHealth} className="flex-1 h-2" />
                        <span className="font-medium">{source.apiHealth}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Data Types:</p>
                    <div className="flex flex-wrap gap-1">
                      {source.dataTypes.map((type, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleSync(source.id)}
                        disabled={source.status === 'syncing'}
                      >
                        <RefreshCw className="w-3 h-3 mr-1" />
                        Sync Now
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleConfigure(source)}
                      >
                        <Settings className="w-3 h-3 mr-1" />
                        Configure
                      </Button>
                    </div>
                    <Switch 
                      checked={source.status !== 'disconnected'} 
                      disabled={source.status === 'syncing'}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sync" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Synchronization History</CardTitle>
              <CardDescription>Recent data sync activities across all sources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {syncHistory.map((sync, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${
                        sync.status === 'success' ? 'bg-success/10' :
                        sync.status === 'warning' ? 'bg-warning/10' : 'bg-destructive/10'
                      }`}>
                        {sync.status === 'success' && <CheckCircle className="w-4 h-4 text-success" />}
                        {sync.status === 'warning' && <AlertCircle className="w-4 h-4 text-warning" />}
                        {sync.status === 'failed' && <AlertCircle className="w-4 h-4 text-destructive" />}
                      </div>
                      <div>
                        <h4 className="font-medium">{sync.source}</h4>
                        <p className="text-sm text-muted-foreground">{sync.timestamp}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{sync.records} records</p>
                      <p className="text-xs text-muted-foreground">{sync.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Global Sync Settings</CardTitle>
              <CardDescription>Configure default synchronization preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-sync enabled</p>
                      <p className="text-sm text-muted-foreground">Automatically sync data at scheduled intervals</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Retry failed syncs</p>
                      <p className="text-sm text-muted-foreground">Automatically retry failed synchronizations</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Real-time notifications</p>
                      <p className="text-sm text-muted-foreground">Get notified of sync status changes</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="default-frequency">Default Sync Frequency</Label>
                    <Select defaultValue="hourly">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">Real-time</SelectItem>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="retry-attempts">Retry Attempts</Label>
                    <Select defaultValue="3">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 attempt</SelectItem>
                        <SelectItem value="3">3 attempts</SelectItem>
                        <SelectItem value="5">5 attempts</SelectItem>
                        <SelectItem value="10">10 attempts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Changes to global settings will affect all connected data sources. Some integrations may need to be reconfigured.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Configuration Dialog */}
      <Dialog open={isConfigOpen} onOpenChange={setIsConfigOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Configure {selectedSource?.name}</DialogTitle>
            <DialogDescription>
              Update integration settings and connection parameters
            </DialogDescription>
          </DialogHeader>
          {selectedSource && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="config-endpoint" className="text-right">Endpoint</Label>
                <Input 
                  id="config-endpoint" 
                  defaultValue={selectedSource.configuration.endpoint} 
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="config-version" className="text-right">Version</Label>
                <Input 
                  id="config-version" 
                  defaultValue={selectedSource.configuration.version} 
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="config-frequency" className="text-right">Sync Frequency</Label>
                <Select defaultValue={selectedSource.syncFrequency.toLowerCase()}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="real-time">Real-time</SelectItem>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsConfigOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsConfigOpen(false)}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}