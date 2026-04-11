'use client'

import { useState } from 'react'
import ImageConverter from '../components/ImageConverter'
import DocumentConverter from '../components/DocumentConverter'

export default function Home() {
  const [activeTab, setActiveTab] = useState('image')

  return (
    <div className="container">
      <header>
        <h1>🔄 Free File Converter</h1>
        <p className="subtitle">Convert images and documents instantly - No signup required</p>
      </header>

      <div className="converter-card">
        <div className="tabs">
          <button
            className={`tab${activeTab === 'image' ? ' active' : ''}`}
            onClick={() => setActiveTab('image')}
          >
            📷 Image Converter
          </button>
          <button
            className={`tab${activeTab === 'document' ? ' active' : ''}`}
            onClick={() => setActiveTab('document')}
          >
            📄 Document Converter
          </button>
        </div>

        {activeTab === 'image' && <ImageConverter />}
        {activeTab === 'document' && <DocumentConverter />}
      </div>

      <div className="features">
        <div className="feature">
          <div className="feature-icon">⚡</div>
          <h3>Lightning Fast</h3>
          <p>All conversions happen instantly in your browser</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🔒</div>
          <h3>100% Private</h3>
          <p>Files never leave your device - complete privacy</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🆓</div>
          <h3>Completely Free</h3>
          <p>No limits, no signup, no watermarks</p>
        </div>
      </div>
    </div>
  )
}
