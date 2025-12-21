'use client';

import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, X, User, Send } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import Image from 'next/image';
import ScrollReveal from './ScrollReveal';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Load messages from localStorage on mount
  useEffect(() => {
    const storedMessages = localStorage.getItem('guestbook-messages');
    if (storedMessages) {
      try {
        setMessages(JSON.parse(storedMessages));
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !message.trim()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const newMessage: Message = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    
    // Save to localStorage
    localStorage.setItem('guestbook-messages', JSON.stringify(updatedMessages));

    // Reset form
    setName('');
    setMessage('');
    setIsSubmitting(false);
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
                <p className="text-sm font-medium">Guestbook</p>
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
          <h2 className="text-sm font-semibold text-gray-900">Guestbook</h2>
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
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-300 mb-4" />
            <p className="text-sm text-gray-500 mb-1">No messages yet</p>
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
                  <span className="text-sm font-medium text-gray-900">{msg.name}</span>
                  <span className="text-xs text-gray-400">{formatDate(msg.timestamp)}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                  {msg.message}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="border-t border-gray-200 p-3 bg-gray-50/30">
        <form onSubmit={handleSubmit} className="space-y-2">
          <Input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-8 text-xs bg-white border-gray-200 focus-visible:ring-gray-300 focus-visible:ring-1"
            required
          />
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Leave a message..."
            className="text-xs resize-none"
            rows={3}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as any);
              }
            }}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting || !name.trim() || !message.trim()}
              className="h-8 px-4 text-xs"
            >
              <Send className="h-3.5 w-3.5 mr-1.5" />
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Guestbook;

