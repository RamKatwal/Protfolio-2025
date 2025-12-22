'use client';

import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, X, User, Send } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import Image from 'next/image';
import ScrollReveal from './ScrollReveal';
import { supabase } from '@/lib/supabase';

interface Message {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

const Guestbook: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNameInput, setShowNameInput] = useState(false);
  const [showSendButton, setShowSendButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Transform Supabase data to Message interface helper
  const transformMessage = (item: {
    id: string;
    name: string;
    message: string;
    created_at?: string;
    timestamp?: string;
  }): Message => ({
    id: item.id,
    name: item.name,
    message: item.message,
    timestamp: item.created_at || item.timestamp || new Date().toISOString(),
  });

  // Load messages from Supabase on mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch messages from Supabase, ordered by created_at descending
        // Adjust table name if your table is named differently (e.g., 'messages', 'guestbook_messages')
        const { data, error: fetchError } = await supabase
          .from('guestbook')
          .select('*')
          .order('created_at', { ascending: false });

        if (fetchError) {
          throw fetchError;
        }

        // Transform Supabase data to match Message interface
        const transformedMessages: Message[] = (data || []).map(transformMessage);

        setMessages(transformedMessages);
      } catch (err: unknown) {
        console.error('Error loading messages:', JSON.stringify(err, null, 2));
        setError('Failed to load messages. Please try again later.');
        // Keep existing messages if fetch fails
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // Set up real-time subscription for new messages
  useEffect(() => {
    // Subscribe to INSERT events on the guestbook table
    const channel = supabase
      .channel('guestbook-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'guestbook',
        },
        (payload) => {
          // Transform and add the new message to the list
          const newMessage = transformMessage(payload.new as {
            id: string;
            name: string;
            message: string;
            created_at?: string;
            timestamp?: string;
          });

          // Add to the beginning of the list (since we order by created_at desc)
          // Check if message already exists to avoid duplicates
          setMessages((prevMessages) => {
            const exists = prevMessages.some((msg) => msg.id === newMessage.id);
            if (exists) {
              return prevMessages;
            }
            return [newMessage, ...prevMessages];
          });
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!bookRef.current) return;
    
    const rect = bookRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  // Handle message input - show name field when message has content
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);
    
    if (value.trim() && !showNameInput) {
      setShowNameInput(true);
    } else if (!value.trim()) {
      setShowNameInput(false);
      setShowSendButton(false);
    }
  };

  // Handle name input - show send button when name has content
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    
    if (value.trim() && message.trim() && !showSendButton) {
      setShowSendButton(true);
    } else if (!value.trim()) {
      setShowSendButton(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !message.trim()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Insert new message into Supabase
      // Adjust table name and column names if your table uses different names
      const { data, error: insertError } = await supabase
        .from('guestbook')
        .insert([{ name: name.trim(), message: message.trim() }])
        .select('*');

      if (insertError) {
        console.error('Supabase insert error:', insertError);
        throw insertError;
      }

      if (!data || data.length === 0) {
        throw new Error('No data returned from insert');
      }

      // Optimistically add the message for immediate feedback
      // The real-time subscription will also handle it, but we check for duplicates
      const insertedRecord = data[0];
      const newMessage = transformMessage(insertedRecord);
      
      setMessages((prevMessages) => {
        const exists = prevMessages.some((msg) => msg.id === newMessage.id);
        if (exists) return prevMessages;
        return [newMessage, ...prevMessages];
      });

      // Reset form and UI state
      setName('');
      setMessage('');
      setShowNameInput(false);
      setShowSendButton(false);
    } catch (err: unknown) {
      console.error('Error submitting message:', err);
      const errorObj = err as { message?: string; details?: string; hint?: string; code?: string };
      console.error('Error details:', {
        message: errorObj?.message,
        details: errorObj?.details,
        hint: errorObj?.hint,
        code: errorObj?.code,
      });
      const errorMessage = errorObj?.message || errorObj?.details || 'Failed to submit message. Please try again.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}m ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}d ago`;
    }
  };

  if (!isOpen) {
    return (
      <ScrollReveal delay={300}>
        <div className="w-full h-[calc(100vh-56px)] bg-white flex flex-col items-center justify-center relative group cursor-pointer" onClick={() => setIsOpen(true)}>
          {/* Background Image */}
          <div className="w-full h-full relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div 
                  ref={bookRef}
                  className="relative w-32 h-32 mx-auto" 
                  style={{ perspective: '1000px' }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <div 
                    className="book-3d relative w-full h-full transition-transform duration-300 ease-out"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: `rotateY(${mousePosition.x * 15}deg) rotateX(${-mousePosition.y * 15}deg) scale(${mousePosition.x !== 0 || mousePosition.y !== 0 ? 1.1 : 1}) translateY(${mousePosition.x !== 0 || mousePosition.y !== 0 ? -8 : 0}px)`,
                    }}
                  >
                    <Image 
                      src="/images/book.png" 
                      alt="Guestbook" 
                      fill
                      className="object-contain transition-all duration-300"
                    />
                  </div>
                </div>
                <p className="text-xs font-medium">Guestbook</p>
                <p className="text-xs">Click to leave a message</p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-56px)] bg-white flex flex-col border-l border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-gray-600" />
          <h2 className="text-xs font-semibold text-gray-900">Guestbook</h2>
          <span className="text-xs text-gray-400">({messages.length})</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="h-8 w-8"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-xs text-red-600">{error}</p>
          </div>
        )}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-300 mb-4 animate-pulse" />
            <p className="text-xs text-gray-500 mb-1">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-300 mb-4" />
            <p className="text-xs text-gray-500 mb-1">No messages yet</p>
            <p className="text-xs text-gray-400">Be the first to leave a message!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="flex gap-3 group">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                <User className="w-4 h-4 text-gray-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-gray-900">{msg.name}</span>
                  <span className="text-xs text-gray-400">{formatDate(msg.timestamp)}</span>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                  {msg.message}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form - Progressive Disclosure */}
      <div className="border-t border-gray-200 p-3 bg-gray-50/30">
        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Message Input - Always visible */}
          <Textarea
            value={message}
            onChange={handleMessageChange}
            placeholder="Leave a message..."
            className="text-xs resize-none transition-all duration-200 min-h-[60px]"
            rows={showNameInput ? 1 : 2}
            onKeyDown={(e) => {
              // Allow Enter+Shift for new line, but Enter alone submits if both fields are filled
              if (e.key === 'Enter' && !e.shiftKey && name.trim() && message.trim()) {
                e.preventDefault();
                handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
              }
            }}
          />
          
          {/* Name Input - Appears when message has content */}
          {showNameInput && (
            <div className="overflow-hidden transition-all duration-300 ease-in-out transform translate-y-0 opacity-100">
              <Input
                ref={nameInputRef}
                type="text"
                placeholder="Your name"
                value={name}
                onChange={handleNameChange}
                className="h-8 text-xs bg-white border-gray-200 focus-visible:ring-gray-300 focus-visible:ring-1 transition-all duration-200"
                onKeyDown={(e) => {
                  // Submit on Enter when name is filled
                  if (e.key === 'Enter' && name.trim() && message.trim()) {
                    e.preventDefault();
                    handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
                  }
                }}
              />
            </div>
          )}
          
          {/* Send Button - Appears when both fields have content */}
          {showSendButton && (
            <div className="flex justify-end overflow-hidden transition-all duration-300 ease-in-out transform translate-y-0 opacity-100">
              <Button
                type="submit"
                disabled={isSubmitting || !name.trim() || !message.trim()}
                className="h-8 px-4 text-xs transition-all duration-200"
              >
                <Send className="h-3.5 w-3.5 mr-1.5" />
                Send
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Guestbook;

