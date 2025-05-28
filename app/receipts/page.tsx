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
        if (selectedFile && selectedFile.type === "application/pdf") {
            setFile(selectedFile)
            setError(null)
            setReceiptData(null)
        } else {
            setError("Please select a PDF file")
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
        <div className="min-h-screen flex flex-col items-center justify-center ">
            <div className="max-w-6xl mx-auto space-y-6">
                <Dropzone
                    file={file}
                    isProcessing={isProcessing}
                    error={error}
                    onFileChange={handleFileChange}
                    onProcess={processReceipt}
                />
                {receiptData && <ReceiptDisplay data={receiptData} />}
            </div>
        </div>
    )
} 