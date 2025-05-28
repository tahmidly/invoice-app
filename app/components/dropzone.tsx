import { Upload, FileText, Loader2, Sparkles } from "lucide-react"
import type { ChangeEvent } from "react"

interface DropzoneProps {
  file: File | null
  isProcessing: boolean
  error: string | null
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void
  onProcess: () => void
}

export default function Dropzone({ file, isProcessing, error, onFileChange, onProcess }: DropzoneProps) {
  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-bold text-white mb-8 mt-2 text-center">Upload PDF Invoices</h2>
      <div className="bg-[#091D30] rounded-2xl p-8 flex flex-col items-center w-full max-w-md">
        <div className="w-full flex flex-col items-center">
          <div className="w-full border-2 border-dashed border-fuchsia-400 rounded-xl p-8 flex flex-col items-center justify-center mb-6">
            <input type="file" accept=".pdf" onChange={onFileChange} className="hidden" id="file-upload" />
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2 w-full">
              <FileText className="h-10 w-10 text-fuchsia-400 mb-2" />
              <span className="text-white font-medium">Drag and drop your PDF files here</span>
              <span className="text-[#cccccc] text-sm my-2">or</span>
              <span className="bg-white text-black rounded-full px-8 py-2 font-semibold mt-2 mb-1 inline-block">Browse Files</span>
            </label>
          </div>
        </div>
        {file && (
          <div className="w-full text-center text-white text-sm mb-4 truncate">{file.name}</div>
        )}
        {error && (
          <div className="w-full p-2 bg-red-50 border border-red-200 rounded-lg mb-4">
            <p className="text-sm text-red-700">{error}</p>
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
  )
} 