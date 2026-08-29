import { useState, useCallback, useRef, useEffect } from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  isServiceReady: boolean;
}

// Use optional chaining to safely access import.meta.env
const API_BASE_URL = (import.meta as unknown as { env: { VITE_API_URL?: string } }).env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Custom hook for managing chat with the AI assistant
 */
export const useChat = (): UseChatReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isServiceReady, setIsServiceReady] = useState(false);
  const messageIdRef = useRef(0);
  const hasCheckedHealthRef = useRef(false);

  // Check if AI service is ready on mount
  useEffect(() => {
    if (!hasCheckedHealthRef.current) {
      hasCheckedHealthRef.current = true;
      checkServiceHealth();
    }
  }, []);

  const checkServiceHealth = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/health`);
      const data = await response.json();
      setIsServiceReady(data.aiServiceReady);
      if (!data.aiServiceReady) {
        setError('AI service is not configured');
      }
    } catch (err) {
      console.error('Failed to check AI service health:', err);
      setError('Could not connect to AI service');
      setIsServiceReady(false);
    }
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    // Validate input
    if (!content.trim()) {
      setError('Message cannot be empty');
      return;
    }

    if (!isServiceReady) {
      setError('AI service is not available');
      return;
    }

    // Add user message
    const userMessage: ChatMessage = {
      id: `msg-${messageIdRef.current++}`,
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data.error || `Server error (${response.status})`;

        // Handle specific error cases
        if (response.status === 429) {
          setError('Too many requests. Please wait a moment before sending another message.');
        } else {
          setError(errorMessage);
        }

        return;
      }

      if (!data.success) {
        setError(data.error || 'Failed to get response');
        return;
      }

      // Add assistant message
      const assistantMessage: ChatMessage = {
        id: `msg-${messageIdRef.current++}`,
        role: 'assistant',
        content: data.reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Chat error:', err);

      if (err instanceof Error) {
        if (err.message.includes('fetch')) {
          setError('Network error. Could not connect to server.');
        } else {
          setError(err.message);
        }
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  }, [isServiceReady]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);

    // Notify backend to clear history
    fetch(`${API_BASE_URL}/chat/clear`, { method: 'POST' }).catch((err) => {
      console.error('Failed to clear history on server:', err);
    });
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    isServiceReady,
  };
};
