'use client'

import { useState, useRef } from 'react'

const IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'webp', 'bmp']

export default function ImageConverter() {
  const [imageFiles, setImageFiles] = useState([])
  const [selectedFormat, setSelectedFormat] = useState('jpg')
  const [dragOver, setDragOver] = useState(false)
  const [converting, setConverting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showProgress, setShowProgress] = useState(false)
  const inputRef = useRef(null)

  function handleFiles(files) {
    const imgs = Array.from(files).filter(f => f.type.startsWith('image/'))
    if (imgs.length > 0) setImageFiles(imgs)
  }

  async function convertImage(file, format) {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = img.width
          canvas.height = img.height
          const ctx = canvas.getContext('2d')
          if (format === 'jpeg' || format === 'jpg') {
            ctx.fillStyle = 'white'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
          }
          ctx.drawImage(img, 0, 0)
          const mimeType = (format === 'jpg' || format === 'jpeg') ? 'image/jpeg' : `image/${format}`
          canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = file.name.replace(/\.[^/.]+$/, '') + '.' + format
            a.click()
            URL.revokeObjectURL(url)
            resolve()
          }, mimeType, 0.95)
        }
        img.src = e.target.result
      }
      reader.readAsDataURL(file)
    })
  }

  async function handleConvert() {
    setConverting(true)
    setShowProgress(true)
    setProgress(0)
    for (let i = 0; i < imageFiles.length; i++) {
      await convertImage(imageFiles[i], selectedFormat)
      setProgress(((i + 1) / imageFiles.length) * 100)
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
        <div className="upload-icon">🖼️</div>
        <div className="upload-text">Click to upload or drag & drop</div>
        <div className="upload-subtext">Supports: PNG, JPG, JPEG, WebP, HEIC, BMP, GIF</div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      <div className="format-selector">
        <label>Convert to:</label>
        <div className="format-buttons">
          {IMAGE_FORMATS.map(fmt => (
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

      {imageFiles.length > 0 && (
        <div className="file-preview show">
          {imageFiles.map((file, i) => (
            <div key={i} className="preview-item">
              <div className="file-icon">🖼️</div>
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
        disabled={imageFiles.length === 0 || converting}
        onClick={handleConvert}
      >
        {imageFiles.length === 0 ? 'Select files to convert' : `Convert ${imageFiles.length} file(s)`}
      </button>
    </div>
  )
}
