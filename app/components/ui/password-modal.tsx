'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (password: string) => void;
  errorMessage?: string;
}

export const PasswordModal: React.FC<PasswordModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  errorMessage = '',
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(errorMessage);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setError(errorMessage);
  }, [errorMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please enter a password');
      return;
    }
    onSuccess(password);
  };

  const handleClose = () => {
    setPassword('');
    setError('');
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  if (!isOpen || !mounted || typeof window === 'undefined') return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity"
      onClick={handleClose}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="password-modal-title"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div
        className="bg-white rounded-lg shadow-2xl border border-gray-200 w-full max-w-md mx-4 p-6 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="password-modal-title" className="text-lg font-semibold text-gray-900 mb-2">
          Password Required
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Please enter the password to access this case study.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              ref={inputRef}
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className={error ? 'border-red-300 focus-visible:ring-red-200' : ''}
              aria-label="Password input"
            />
            {error && (
              <p className="mt-2 text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

