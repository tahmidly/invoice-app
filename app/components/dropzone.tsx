import { Upload, FileText, Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Receipt
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input type="file" accept=".pdf" onChange={onFileChange} className="hidden" id="file-upload" />
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
            <FileText className="h-12 w-12 text-gray-400" />
            <span className="text-sm text-gray-600">Click to select a PDF receipt</span>
            <span className="text-xs text-gray-500">Get instant analytics with charts and insights</span>
          </label>
        </div>

        {file && (
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <span className="text-sm text-blue-700">{file.name}</span>
            <Button onClick={onProcess} disabled={isProcessing} className="ml-4">
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing with AI...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Extract & Analyze
                </>
              )}
            </Button>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 