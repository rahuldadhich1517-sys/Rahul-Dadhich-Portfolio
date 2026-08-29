import { useState, useCallback } from 'react';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface UseContactFormReturn {
  formData: ContactFormData;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

const API_BASE_URL = (import.meta as unknown as { env: { VITE_API_URL?: string } }).env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Custom hook for managing contact form submissions
 */
export const useContactForm = (): UseContactFormReturn => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      // Clear error when user starts typing
      if (error) {
        setError(null);
      }
    },
    [error]
  );

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Client-side validation
      if (!formData.name.trim()) {
        setError('Please enter your name');
        setIsLoading(false);
        return;
      }

      if (!formData.email.trim()) {
        setError('Please enter your email');
        setIsLoading(false);
        return;
      }

      if (!formData.message.trim()) {
        setError('Please enter a message');
        setIsLoading(false);
        return;
      }

      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email address');
        setIsLoading(false);
        return;
      }

      if (formData.message.length < 10) {
        setError('Message must be at least 10 characters');
        setIsLoading(false);
        return;
      }

      // Submit to backend
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Unable to send message. Please try again.');
        return;
      }

      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      console.error('Contact form error:', err);
      setError('Unable to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData({ name: '', email: '', message: '' });
    setError(null);
    setSuccess(false);
  }, []);

  return {
    formData,
    isLoading,
    error,
    success,
    handleChange,
    handleSubmit,
    resetForm,
  };
};
