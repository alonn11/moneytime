"use client";

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Navigation } from '@/components/layout/Navigation';
import ServicesProvidePage from '@/components/pages/ServicesProvidePage';
import { useAuth } from '@/lib/hooks/useAuth';

export default function ServicesPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>טוען...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Navigation />
        <div className="relative">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-3xl"></div>
          <div className="relative p-6">
            <ServicesProvidePage />
          </div>
        </div>
      </div>
    </div>
  );
}