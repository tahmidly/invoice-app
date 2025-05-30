"use client"

import React, { useState } from "react"
import Dropzone from "../components/dropzone"
import { ReceiptData } from "../types/receipt"
import ReceiptDisplay from "../components/receipt-display"

export default function ReceiptsPage() {
    const [file, setFile] = useState<File | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [receiptData, setReceiptData] = useState<ReceiptData | null>(null)    
    const [error, setError] = useState<string | null>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0]
        if (selectedFile) {
            setFile(selectedFile)
            setError(null)
            setReceiptData(null)
        }
    }

    const processReceipt = async () => {
        if (!file) return

        setIsProcessing(true)
        setError(null)

        try {
            const formData = new FormData()
            formData.append("file", file)

            const response = await fetch("/api/process-receipt", {
                method: "POST",
                body: formData,
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.details || data.error || "Failed to process receipt")
            }

            setReceiptData(data)
        } catch (err) {
            console.error("Processing error:", err)
            setError(err instanceof Error ? err.message : "An error occurred while processing the receipt")
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <div className="min-h-screen w-full flex items-stretch justify-center py-12 px-4 ">
            <div className="w-full max-w-[1600px] grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                <div className="flex flex-col items-center justify-center min-h-[600px]">
                    <Dropzone
                        file={file}
                        isProcessing={isProcessing}
                        error={error}
                        onFileChange={handleFileChange}
                        onProcess={processReceipt}
                    />
                </div>
                <div className="flex flex-col justify-start min-h-[500px] max-h-[90vh] overflow-y-auto w-full scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {receiptData ? (
                        <ReceiptDisplay data={receiptData} />
                    ) : (
                        <div className="text-gray-400 text-lg text-center mt-20">
                            Extracted data will appear here after upload.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
} 