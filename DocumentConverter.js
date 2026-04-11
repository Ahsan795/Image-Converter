'use client'

import { useState, useRef } from 'react'

const DOC_FORMATS = ['pdf', 'docx', 'txt']

export default function DocumentConverter() {
  const [docFiles, setDocFiles] = useState([])
  const [selectedFormat, setSelectedFormat] = useState('pdf')
  const [dragOver, setDragOver] = useState(false)
  const [converting, setConverting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showProgress, setShowProgress] = useState(false)
  const inputRef = useRef(null)

  function handleFiles(files) {
    const docs = Array.from(files)
    if (docs.length > 0) setDocFiles(docs)
  }

  async function convertDocument(file, format) {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const content = e.target.result

        if (format === 'pdf') {
          const { jsPDF } = await import('jspdf').then(m => m.default ? m : m)
          const pdf = new jsPDF()
          let text = ''
          if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
            text = content
          } else {
            text = 'Document content preview\n\n'
            text += `Original file: ${file.name}\n`
            text += `File type: ${file.type}\n\n`
            text += 'Note: Full document conversion requires server-side processing.\n'
            text += 'This is a simplified PDF conversion for demonstration.'
          }
          const lines = pdf.splitTextToSize(text, 180)
          pdf.text(lines, 15, 15)
          pdf.save(file.name.replace(/\.[^/.]+$/, '') + '.pdf')
        } else if (format === 'txt') {
          let text = ''
          if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
            text = content
          } else {
            text = `Extracted from: ${file.name}\n\n`
            text += 'Note: Full text extraction requires server-side processing.\n'
            text += 'This is a simplified conversion for demonstration.'
          }
          const blob = new Blob([text], { type: 'text/plain' })
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = file.name.replace(/\.[^/.]+$/, '') + '.txt'
          a.click()
          URL.revokeObjectURL(url)
        } else if (format === 'docx') {
          alert('DOCX conversion requires specialized libraries. For full functionality, consider using server-side conversion tools.')
        }
        resolve()
      }
      if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        reader.readAsText(file)
      } else {
        reader.readAsArrayBuffer(file)
      }
    })
  }

  async function handleConvert() {
    setConverting(true)
    setShowProgress(true)
    setProgress(0)
    for (let i = 0; i < docFiles.length; i++) {
      await convertDocument(docFiles[i], selectedFormat)
      setProgress(((i + 1) / docFiles.length) * 100)
    }
    setShowProgress(false)
    setConverting(false)
    alert('Conversion complete! Files downloaded.')
  }

  return (
    <div>
      <div
        className={`upload-area${dragOver ? ' drag-over' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }}
      >
        <div className="upload-icon">📁</div>
        <div className="upload-text">Click to upload or drag & drop</div>
        <div className="upload-subtext">Supports: DOCX, DOC, PDF, TXT, RTF</div>
        <input
          ref={inputRef}
          type="file"
          accept=".doc,.docx,.pdf,.txt,.rtf"
          multiple
          style={{ display: 'none' }}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      <div className="format-selector">
        <label>Convert to:</label>
        <div className="format-buttons">
          {DOC_FORMATS.map(fmt => (
            <button
              key={fmt}
              className={`format-btn${selectedFormat === fmt ? ' active' : ''}`}
              onClick={() => setSelectedFormat(fmt)}
            >
              {fmt.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {docFiles.length > 0 && (
        <div className="file-preview show">
          {docFiles.map((file, i) => (
            <div key={i} className="preview-item">
              <div className="file-icon">📄</div>
              <div className="file-info">
                <div className="file-name">{file.name}</div>
                <div className="file-size">{(file.size / 1024).toFixed(2)} KB</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={`progress-bar${showProgress ? ' show' : ''}`}>
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <button
        className="convert-btn"
        disabled={docFiles.length === 0 || converting}
        onClick={handleConvert}
      >
        {docFiles.length === 0 ? 'Select files to convert' : `Convert ${docFiles.length} file(s)`}
      </button>
    </div>
  )
}
