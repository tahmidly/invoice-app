import { Upload, FileText, Loader2, Sparkles, Image } from "lucide-react"
import type { ChangeEvent } from "react"
import { DndContext, useSensor, useSensors, PointerSensor } from "@dnd-kit/core"
import { useState, useCallback, useRef } from "react"

interface DropzoneProps {
  file: File | null
  isProcessing: boolean
  error: string | null
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void
  onProcess: () => void
}

export default function Dropzone({ file, isProcessing, error, onFileChange, onProcess }: DropzoneProps) {
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const sensors = useSensors(
    useSensor(PointerSensor)
  )

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(e)
    }
  }

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDraggingOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDraggingOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDraggingOver(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const fileInput = document.getElementById('file-upload') as HTMLInputElement
      if (fileInput) {
        fileInput.files = e.dataTransfer.files
        const event = new Event('change', { bubbles: true })
        fileInput.dispatchEvent(event)
      }
    }
  }, [])

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="w-10 h-10 text-fuchsia-400 mb-4" />
    }
    return <FileText className="w-10 h-10 text-fuchsia-400 mb-4" />
  }

  return (
    <DndContext sensors={sensors}>
      <div className="flex flex-col items-center w-full">
        <h2 className="text-2xl font-bold text-white mb-8 mt-2 text-center">Upload Receipts</h2>
        <div className="bg-[#091D30] rounded-2xl p-8 flex flex-col items-center w-full max-w-md">
          <div className="w-full flex flex-col items-center">
            <div
              onDragOver={!isProcessing ? handleDragOver : undefined}
              onDragLeave={!isProcessing ? handleDragLeave : undefined}
              onDrop={!isProcessing ? handleDrop : undefined}
              className={`w-full border-2 border-dashed rounded-lg p-8 text-center transition-colors 
                ${isDraggingOver ? "border-fuchsia-500 bg-fuchsia-500/10" : "border-fuchsia-400"} 
                ${isProcessing ? "opacity-70 cursor-not-allowed" : "cursor-pointer hover:border-fuchsia-500"}`}
            >
              <div className="space-y-4 w-full">
                <div className="flex flex-col items-center justify-center w-full">
                  {isProcessing ? (
                    <Loader2 className="w-10 h-10 text-fuchsia-400 animate-spin mb-4" />
                  ) : file ? (
                    getFileIcon(file)
                  ) : (
                    <FileText className="w-10 h-10 text-fuchsia-400 mb-4" />
                  )}
                  <p className="text-white mt-4">
                    {isProcessing
                      ? "Processing your file..."
                      : isDraggingOver
                        ? "Drop PDF, PNG, or JPG file here"
                        : "Drag and drop your PDF, PNG, or JPG file here"}
                  </p>
                  {!isProcessing && (
                    <>
                      <p className="text-[#cccccc] text-sm mt-2">or</p>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.png,.jpg,.jpeg"
                        id="file-upload"
                      />
                      <button
                        onClick={handleFileSelect}
                        disabled={isProcessing}
                        className="mt-4 bg-white text-black rounded-full px-8 py-2 font-semibold hover:bg-gray-100 transition-colors"
                      >
                        Select File
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {file && (
            <div className="mt-6 w-full bg-[#0A2540] rounded-lg border border-fuchsia-400/20">
              <div className="p-4 border-b border-fuchsia-400/20">
                <h3 className="font-medium text-white">Selected File</h3>
              </div>
              <div className="divide-y divide-fuchsia-400/20">
                <div className="flex items-center p-4 hover:bg-fuchsia-500/5">
                  {file.type.startsWith('image/') ? (
                    <Image className="h-5 w-5 text-fuchsia-400 mr-3" />
                  ) : (
                    <FileText className="h-5 w-5 text-fuchsia-400 mr-3" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    <p className="text-xs text-fuchsia-400">
                      {isProcessing ? "Processing..." : "Ready to analyze"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(error || localError) && (
            <div className="w-full p-2 bg-red-50 border border-red-200 rounded-lg mb-4 mt-4">
              <p className="text-sm text-red-700">{error || localError}</p>
            </div>
          )}

          <button
            onClick={onProcess}
            disabled={isProcessing}
            className="w-full mt-4 rounded-full px-8 py-3 font-semibold text-white bg-fuchsia-500 hover:bg-fuchsia-600 transition duration-300 shadow-lg flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Processing with AI...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Extract & Analyze
              </>
            )}
          </button>
        </div>
      </div>
    </DndContext>
  )
}