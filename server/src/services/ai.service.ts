import { getPortfolioContext } from './portfolio.knowledge';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  success: boolean;
  reply: string;
  error?: string;
}

/**
 * AI Service - Handles LLM API communication
 * Uses OpenAI API with portfolio context
 */
export class AIService {
  private apiKey: string;
  private apiBaseUrl: string = 'https://api.openai.com/v1';
  private conversationHistory: ChatMessage[] = [];

  constructor() {
    this.apiKey = process.env.AI_API_KEY || '';
    if (!this.apiKey) {
      console.warn('Warning: AI_API_KEY environment variable not set');
    }
  }

  /**
   * Send a message to the LLM and get a response
   */
  async chat(userMessage: string): Promise<ChatResponse> {
    try {
      // Validate input
      if (!userMessage || userMessage.trim().length === 0) {
        return {
          success: false,
          reply: '',
          error: 'Message cannot be empty',
        };
      }

      if (userMessage.length > 1000) {
        return {
          success: false,
          reply: '',
          error: 'Message is too long (max 1000 characters)',
        };
      }

      // Check if API key is configured
      if (!this.apiKey || this.apiKey.includes('placeholder')) {
        return {
          success: false,
          reply: '',
          error: 'AI service is not configured. Please add AI_API_KEY to server environment.',
        };
      }

      // Add user message to history
      this.conversationHistory.push({
        role: 'user',
        content: userMessage,
      });

      // Keep conversation history limited to last 10 messages for cost efficiency
      if (this.conversationHistory.length > 20) {
        this.conversationHistory = this.conversationHistory.slice(-20);
      }

      // Get portfolio context
      const portfolioContext = getPortfolioContext();

      // Build messages for API call
      const messages = [
        {
          role: 'system' as const,
          content: portfolioContext,
        },
        ...this.conversationHistory,
      ];

      // Call OpenAI API
      const response = await fetch(`${this.apiBaseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages,
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenAI API Error:', errorData);

        if (response.status === 401) {
          return {
            success: false,
            reply: '',
            error: 'API authentication failed. Check AI_API_KEY.',
          };
        }

        if (response.status === 429) {
          return {
            success: false,
            reply: '',
            error: 'Rate limited. Please try again later.',
          };
        }

        return {
          success: false,
          reply: '',
          error: 'Failed to get response from AI service',
        };
      }

      const data = await response.json();
      const assistantMessage = data.choices[0]?.message?.content || '';

      if (!assistantMessage) {
        return {
          success: false,
          reply: '',
          error: 'No response from AI service',
        };
      }

      // Add assistant response to history
      this.conversationHistory.push({
        role: 'assistant',
        content: assistantMessage,
      });

      return {
        success: true,
        reply: assistantMessage,
      };
    } catch (error) {
      console.error('AI Service Error:', error);

      if (error instanceof Error) {
        if (error.message.includes('fetch')) {
          return {
            success: false,
            reply: '',
            error: 'Network error. Could not connect to AI service.',
          };
        }
      }

      return {
        success: false,
        reply: '',
        error: 'An error occurred while processing your request',
      };
    }
  }

  /**
   * Clear conversation history
   */
  clearHistory(): void {
    this.conversationHistory = [];
  }

  /**
   * Get conversation history
   */
  getHistory(): ChatMessage[] {
    return this.conversationHistory;
  }
}

// Export singleton instance
export const aiService = new AIService();
