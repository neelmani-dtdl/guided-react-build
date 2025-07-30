import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, TrendingUp, Users, Target, AlertTriangle, Lightbulb } from 'lucide-react';
import { mockAIInsights } from '@/data/mockData';

export function AIInsightsPage() {
  const insights = mockAIInsights;

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'prediction': return AlertTriangle;
      case 'recommendation': return Lightbulb;
      case 'trend': return TrendingUp;
      default: return Brain;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Brain className="w-8 h-8 text-primary" />
            AI-Driven Insights
          </h1>
          <p className="text-muted-foreground">Intelligent recommendations for your workforce</p>
        </div>
        <Button className="bg-gradient-primary">Generate New Insights</Button>
      </div>

      <div className="grid gap-6">
        {insights.map((insight) => {
          const Icon = getTypeIcon(insight.type);
          return (
            <Card key={insight.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6 text-primary" />
                    <div>
                      <CardTitle className="text-xl">{insight.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{insight.type}</Badge>
                        <Badge variant={getImpactColor(insight.impact)}>{insight.impact} impact</Badge>
                        <Badge variant="secondary">{insight.confidence}% confidence</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{insight.description}</p>
                <div>
                  <h4 className="font-medium mb-2">Recommended Actions:</h4>
                  <ul className="space-y-2">
                    {insight.actionItems.map((action, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-sm">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button size="sm">Implement</Button>
                  <Button size="sm" variant="outline">Learn More</Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}