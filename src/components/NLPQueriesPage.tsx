import { useState } from 'react';
import { Search, MessageSquare, Clock, BookmarkPlus, History, Lightbulb, TrendingUp, Users, Brain } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';

const savedQueries = [
  {
    id: 1,
    query: "Show me employees at risk of leaving in Q4",
    description: "Attrition risk analysis for current quarter",
    lastUsed: "2 hours ago",
    category: "Attrition",
    results: 23
  },
  {
    id: 2,
    query: "Which departments have the highest engagement scores?",
    description: "Department-wise engagement comparison",
    lastUsed: "1 day ago",
    category: "Engagement",
    results: 8
  },
  {
    id: 3,
    query: "Find high performers who haven't been promoted recently",
    description: "Career development opportunities identification",
    lastUsed: "3 days ago",
    category: "Performance",
    results: 15
  }
];

const queryHistory = [
  {
    id: 1,
    query: "Average salary by department and experience level",
    timestamp: "10 minutes ago",
    results: 45,
    executionTime: "0.8s"
  },
  {
    id: 2,
    query: "Employees with skills gaps in emerging technologies",
    timestamp: "1 hour ago",
    results: 32,
    executionTime: "1.2s"
  },
  {
    id: 3,
    query: "Diversity metrics across all management levels",
    timestamp: "2 hours ago",
    results: 18,
    executionTime: "0.6s"
  }
];

const suggestedQueries = [
  "Show me employees who might benefit from leadership training",
  "Which teams have the best work-life balance scores?",
  "Find employees at risk of burnout based on recent metrics",
  "Compare retention rates between remote and office workers",
  "Identify top talent for succession planning",
  "Show performance trends for new hires in their first 90 days"
];

const queryResults = {
  summary: "Found 23 employees across 4 departments with elevated attrition risk",
  insights: [
    "Engineering team shows highest risk (12 employees)",
    "Average tenure of at-risk employees: 2.3 years",
    "Most common indicators: decreased engagement, missed 1:1s"
  ],
  data: [
    { department: 'Engineering', atRisk: 12, total: 45 },
    { department: 'Sales', atRisk: 6, total: 32 },
    { department: 'Marketing', atRisk: 3, total: 28 },
    { department: 'HR', atRisk: 2, total: 15 }
  ]
};

export function NLPQueriesPage() {
  const [currentQuery, setCurrentQuery] = useState('');
  const [activeTab, setActiveTab] = useState('query');
  const [isLoading, setIsLoading] = useState(false);
  const [hasResults, setHasResults] = useState(false);

  const handleSearch = async () => {
    if (!currentQuery.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setHasResults(true);
  };

  const handleSuggestedQuery = (query: string) => {
    setCurrentQuery(query);
  };

  const handleSaveQuery = () => {
    console.log('Saving query:', currentQuery);
    // Implement save functionality
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">NLP Queries</h1>
          <p className="text-muted-foreground">Ask questions about your workforce in natural language</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <History className="w-4 h-4" />
            Query History
          </Button>
          <Button variant="outline" className="gap-2">
            <BookmarkPlus className="w-4 h-4" />
            Saved Queries
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Ask me anything about your workforce... e.g., 'Show me employees at risk of leaving'"
                  value={currentQuery}
                  onChange={(e) => setCurrentQuery(e.target.value)}
                  className="pl-12 h-12 text-lg"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button 
                size="lg" 
                onClick={handleSearch} 
                disabled={isLoading || !currentQuery.trim()}
                className="gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4" />
                    Ask AI
                  </>
                )}
              </Button>
            </div>

            {/* Suggested Queries */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Try these suggestions:
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestedQueries.slice(0, 3).map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestedQuery(suggestion)}
                    className="text-xs"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Query Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="query">Query Results</TabsTrigger>
          <TabsTrigger value="saved">Saved Queries</TabsTrigger>
          <TabsTrigger value="history">Recent History</TabsTrigger>
          <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
        </TabsList>

        <TabsContent value="query" className="space-y-6">
          {hasResults ? (
            <div className="space-y-6">
              {/* Query Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Query: "{currentQuery}"
                  </CardTitle>
                  <CardDescription>
                    {queryResults.summary}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleSaveQuery}
                      className="ml-2 gap-1"
                    >
                      <BookmarkPlus className="w-3 h-3" />
                      Save
                    </Button>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-danger">23</p>
                      <p className="text-sm text-muted-foreground">At-Risk Employees</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-warning">4</p>
                      <p className="text-sm text-muted-foreground">Departments Affected</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">2.3</p>
                      <p className="text-sm text-muted-foreground">Avg Tenure (Years)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Visualization */}
              <Card>
                <CardHeader>
                  <CardTitle>Risk Distribution by Department</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={queryResults.data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="atRisk" fill="hsl(var(--danger))" name="At Risk" />
                      <Bar dataKey="total" fill="hsl(var(--muted))" name="Total" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* AI Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {queryResults.insights.map((insight, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                        <TrendingUp className="w-4 h-4 text-primary mt-1" />
                        <p className="text-sm">{insight}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-3">Recommended Actions:</p>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="mr-2">Schedule 1:1 meetings</Button>
                      <Button variant="outline" size="sm" className="mr-2">Review compensation</Button>
                      <Button variant="outline" size="sm">Career development plans</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Ready to analyze your data</h3>
                <p className="text-muted-foreground">
                  Enter a natural language query above to get AI-powered insights about your workforce
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          {savedQueries.map((query) => (
            <Card key={query.id} className="hover:shadow-md transition-all duration-200 cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{query.query}</h4>
                      <Badge variant="secondary">{query.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{query.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {query.lastUsed}
                      </span>
                      <span>{query.results} results</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setCurrentQuery(query.query)}>
                    Run Query
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {queryHistory.map((query) => (
            <Card key={query.id} className="hover:shadow-md transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium">{query.query}</h4>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{query.timestamp}</span>
                      <span>{query.results} results</span>
                      <span>{query.executionTime}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setCurrentQuery(query.query)}>
                    Re-run
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                AI Query Suggestions
              </CardTitle>
              <CardDescription>
                Popular queries based on your data and industry trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {suggestedQueries.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestedQuery(suggestion)}
                    className="p-4 border rounded-lg hover:bg-muted/30 cursor-pointer transition-colors"
                  >
                    <p className="text-sm font-medium">{suggestion}</p>
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