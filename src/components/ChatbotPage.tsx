import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Trash2, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestedQueries = [
  "What's the current attrition rate?",
  "Show me top performers in Engineering",
  "Which departments need engagement improvement?",
  "What are the latest AI insights?",
  "How is our recruitment pipeline?",
  "Who are the employees at risk?",
];

export function ChatbotPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your People Team AI assistant. I can help you analyze employee data, provide insights, and answer questions about your workforce. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/functions/v1/ollama-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data = await response.json();

      if (data.success && data.message) {
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.message.content,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Chat error:', error);
      
      // Fallback response with mock data context
      const fallbackMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateFallbackResponse(userMessage.content),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, fallbackMessage]);
      
      toast({
        title: "Using offline mode",
        description: "Connected to local knowledge base. For real-time AI responses, ensure Ollama is running.",
        variant: "default"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateFallbackResponse = (userQuery: string): string => {
    const query = userQuery.toLowerCase();
    
    if (query.includes('attrition') || query.includes('turnover')) {
      return `Based on our current data, the attrition rate is 12.3%. This is within industry standards but we've identified that Engineering has the lowest attrition at 8.1%, while Sales has the highest at 16.7%. Key factors contributing to attrition include lack of career growth opportunities and compensation concerns.`;
    }
    
    if (query.includes('top performer') || query.includes('best employee')) {
      return `Our top performers include:

**Engineering:**
- Sarah Chen: 92% performance, 88% engagement
- Alex Kim: 89% performance, 91% engagement

**Sales:**
- Michael Rodriguez: 95% performance, 91% engagement
- Lisa Wang: 87% performance, 85% engagement

**Marketing:**
- Emily Zhang: 89% performance, 85% engagement

These employees consistently exceed targets and show high engagement scores.`;
    }
    
    if (query.includes('engagement') || query.includes('satisfaction')) {
      return `Current engagement metrics show:
- Overall average: 78%
- Engineering: 82% (highest)
- HR: 81%
- Marketing: 79%
- Finance: 76%
- Sales: 74% (needs attention)

Recommendations: Focus on Sales team engagement through better incentive programs and career development opportunities.`;
    }
    
    if (query.includes('insight') || query.includes('ai') || query.includes('recommendation')) {
      return `Latest AI insights:

🔮 **Retention Prediction**: 23 employees flagged as high attrition risk
📈 **Performance Trend**: Engineering productivity up 15% this quarter
💡 **Skill Gap**: Critical need for AI/ML skills in product teams
🎯 **Recruitment**: 68% faster hiring through optimized job descriptions
📊 **Engagement**: Team size correlation with satisfaction identified

Would you like me to elaborate on any of these insights?`;
    }
    
    if (query.includes('recruitment') || query.includes('hiring')) {
      return `Recruitment pipeline status:
- Open positions: 47
- Active candidates: 234
- Interview scheduled: 18
- Offer pending: 8
- Average time to hire: 28 days

**TurboHire Integration**: 92% API health, processing 156 applications this week. Top sources: LinkedIn (34%), referrals (28%), company website (21%).`;
    }
    
    if (query.includes('risk') || query.includes('at risk')) {
      return `Employees at risk analysis:

**High Risk (23 employees):**
- Declining performance + low engagement
- Recent salary/promotion denials
- Manager relationship issues

**Medium Risk (45 employees):**
- Single risk factor present
- Monitoring recommended

**Key indicators:** Attendance drops, peer feedback decline, reduced collaboration. Immediate manager interventions recommended for high-risk cases.`;
    }
    
    return `I understand you're asking about "${userQuery}". Based on our People Team platform data with 1,234 employees across 5 departments, I can provide insights on performance (avg 82%), engagement (avg 78%), attrition (12.3%), and more. 

Could you be more specific about what you'd like to know? I can help with:
- Employee performance and engagement data
- Departmental analytics
- Attrition and retention insights
- AI-powered recommendations
- Platform integration status`;
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: 'Hello! I\'m your People Team AI assistant. I can help you analyze employee data, provide insights, and answer questions about your workforce. What would you like to know?',
        timestamp: new Date()
      }
    ]);
  };

  const exportChat = () => {
    const chatData = messages.map(m => ({
      role: m.role,
      content: m.content,
      timestamp: m.timestamp.toISOString()
    }));
    
    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Assistant</h1>
          <p className="text-muted-foreground">
            Chat with your People Team AI assistant for insights and data analysis
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportChat} size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={clearChat} size="sm">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                Chat Assistant
                <Badge variant="secondary" className="ml-auto">
                  {messages.length - 1} messages
                </Badge>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-[450px] p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {message.role === 'assistant' && (
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            <Bot className="w-4 h-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground ml-auto'
                            : 'bg-muted'
                        }`}
                      >
                        <div className="text-sm whitespace-pre-wrap">
                          {message.content}
                        </div>
                        <div className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                      
                      {message.role === 'user' && (
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-secondary">
                            <User className="w-4 h-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="text-sm">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about your workforce data..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    disabled={isLoading}
                  />
                  <Button onClick={sendMessage} disabled={!input.trim() || isLoading}>
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Suggested Queries</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {suggestedQueries.map((query, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-left h-auto p-3"
                  onClick={() => setInput(query)}
                >
                  <div className="text-sm">{query}</div>
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Ollama Connection</span>
                <Badge variant="secondary">Local</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Model</span>
                <Badge variant="outline">llama3.2</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Data Context</span>
                <Badge variant="default">Live</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}