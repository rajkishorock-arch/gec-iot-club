import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, X, Image as ImageIcon, Plus, Check } from 'lucide-react';

/**
 * Resizes and compresses image to prevent localStorage quota exhaustion
 */
export const processImageFile = (file, maxWidth = 1280, maxHeight = 960, quality = 0.85) => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Selected file is not an image'));
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => resolve(e.target.result); // Fallback to raw base64
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const ImageUploader = ({
  value, // string for single, array of strings for multiple
  onChange,
  multiple = false,
  label = "Upload Image",
  helpText = "Supports file upload from device, paste (Ctrl+V), or image URL"
}) => {
  const [tab, setTab] = useState('upload'); // 'upload' | 'url'
  const [urlInput, setUrlInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Normalise values to array for uniform handling
  const images = multiple 
    ? (Array.isArray(value) ? value : (value ? [value] : []))
    : (value ? [value] : []);

  const handleFiles = async (files) => {
    if (!files || files.length === 0) return;
    const fileList = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (fileList.length === 0) return;

    try {
      const processed = await Promise.all(fileList.map(f => processImageFile(f)));
      if (multiple) {
        onChange([...images, ...processed]);
      } else {
        onChange(processed[0]);
      }
    } catch (err) {
      console.error("Image processing error:", err);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handlePaste = (e) => {
    if (e.clipboardData && e.clipboardData.files && e.clipboardData.files.length > 0) {
      e.preventDefault();
      handleFiles(e.clipboardData.files);
    }
  };

  const handleAddUrl = (e) => {
    e?.preventDefault();
    if (!urlInput.trim()) return;
    if (multiple) {
      onChange([...images, urlInput.trim()]);
    } else {
      onChange(urlInput.trim());
    }
    setUrlInput('');
  };

  const handleRemove = (index) => {
    if (multiple) {
      const next = images.filter((_, idx) => idx !== index);
      onChange(next);
    } else {
      onChange('');
    }
  };

  return (
    <div className="space-y-3" onPaste={handlePaste}>
      <div className="flex items-center justify-between">
        <label className="block text-[#001e2b] font-semibold text-xs">{label}</label>
        <div className="flex items-center gap-1 bg-[#f4f7f6] p-0.5 rounded-lg border border-[#e1e5e8] text-[11px]">
          <button
            type="button"
            onClick={() => setTab('upload')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all ${
              tab === 'upload' ? 'bg-white text-[#001e2b] shadow-xs font-bold' : 'text-[#5c6c7a] hover:text-[#001e2b]'
            }`}
          >
            <Upload className="w-3 h-3 inline mr-1" />
            Upload / Paste
          </button>
          <button
            type="button"
            onClick={() => setTab('url')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all ${
              tab === 'url' ? 'bg-white text-[#001e2b] shadow-xs font-bold' : 'text-[#5c6c7a] hover:text-[#001e2b]'
            }`}
          >
            <LinkIcon className="w-3 h-3 inline mr-1" />
            Image URL
          </button>
        </div>
      </div>

      {tab === 'upload' ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${
            isDragging 
              ? 'border-[#00684a] bg-emerald-50/60 scale-[1.01]' 
              : 'border-[#cfd7df] hover:border-[#00684a] bg-[#fafcfb] hover:bg-emerald-50/20'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple={multiple}
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
          <div className="flex flex-col items-center justify-center gap-2 py-2">
            <div className="w-10 h-10 rounded-full bg-[#eafaf1] text-[#00684a] flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#001e2b]">
                Click to browse files or drag & drop here
              </p>
              <p className="text-[11px] text-[#738290] mt-0.5">
                {multiple ? "Select single or multiple photos from your system" : "Select a photo from your computer or press Ctrl+V to paste"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleAddUrl(e); }}
            placeholder="https://images.unsplash.com/..."
            className="flex-1 px-3.5 py-2 rounded-xl border border-[#e1e5e8] bg-white text-xs outline-none focus:border-[#00684a] font-mono"
          />
          <button
            type="button"
            onClick={handleAddUrl}
            className="px-4 py-2 bg-[#001e2b] text-[#00ed64] rounded-xl text-xs font-bold hover:bg-[#003144] transition-colors"
          >
            {multiple ? 'Add URL' : 'Set URL'}
          </button>
        </div>
      )}

      {/* Previews / Gallery */}
      {images.length > 0 && (
        <div className="space-y-2 pt-1">
          <span className="text-[11px] font-bold text-[#5c6c7a] uppercase tracking-wider font-mono">
            {multiple ? `Attached Images (${images.length})` : 'Selected Image Preview'}
          </span>
          <div className={`grid gap-3 ${multiple ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4' : 'grid-cols-1'}`}>
            {images.map((imgSrc, idx) => (
              <div 
                key={idx} 
                className="relative rounded-xl overflow-hidden border border-[#e1e5e8] bg-slate-900 group aspect-video shadow-xs"
              >
                <img 
                  src={imgSrc} 
                  alt={`Upload preview ${idx + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                />
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleRemove(idx); }}
                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/80 hover:bg-rose-600 text-white flex items-center justify-center transition-colors cursor-pointer shadow-md"
                  title="Remove image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                {multiple && (
                  <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-black/75 text-white text-[10px] font-mono font-bold">
                    #{idx + 1}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {helpText && <p className="text-[11px] text-[#738290] leading-normal">{helpText}</p>}
    </div>
  );
};

export default ImageUploader;
