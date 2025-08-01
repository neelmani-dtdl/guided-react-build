import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface OllamaRequest {
  model: string;
  messages: ChatMessage[];
  stream?: boolean;
}

// Mock data context for fine-tuning responses
const mockDataContext = `
You are an AI assistant for a People Team AI-Powered Data Platform. You have access to the following employee and organizational data:

EMPLOYEE DATA INSIGHTS:
- Total Employees: 1,234
- Active Employees: 1,187
- Attrition Rate: 12.3%
- Average Engagement: 78%
- Average Performance: 82%

KEY DEPARTMENTS:
- Engineering: 420 employees (highest performance: 85%)
- Sales: 280 employees (performance: 79%)
- Marketing: 190 employees (performance: 81%)
- HR: 95 employees (performance: 83%)
- Finance: 110 employees (performance: 80%)

TOP PERFORMERS:
- Sarah Chen (Engineering) - Performance: 92%, Engagement: 88%
- Michael Rodriguez (Sales) - Performance: 95%, Engagement: 91%
- Emily Zhang (Marketing) - Performance: 89%, Engagement: 85%

AI INSIGHTS AVAILABLE:
- Retention prediction models
- Performance trend analysis
- Engagement improvement recommendations
- Skills gap analysis
- Recruitment optimization

INTEGRATED PLATFORMS:
- Darwinbox (HRIS) - 98% API health
- Klaar (Performance) - 95% API health
- TurboHire (Recruitment) - 92% API health
- NewHire (Onboarding) - 88% API health
- Anker (Engagement) - 96% API health

When answering questions, always provide specific data-driven insights based on this context. Use actual metrics and employee examples when relevant.
`;

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { messages, model = "llama3.2" } = await req.json();

    // Add context to the conversation
    const enhancedMessages = [
      {
        role: 'system' as const,
        content: mockDataContext
      },
      ...messages
    ];

    // Call Ollama API
    const ollamaResponse = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: enhancedMessages,
        stream: false
      }),
    });

    if (!ollamaResponse.ok) {
      throw new Error(`Ollama API error: ${ollamaResponse.status}`);
    }

    const data = await ollamaResponse.json();

    return new Response(
      JSON.stringify({ 
        message: data.message,
        success: true 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in ollama-chat function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});