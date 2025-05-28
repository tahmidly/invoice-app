"use client"

import type React from "react"
import { useState } from "react"
import type { ReceiptData } from "./types/receipt"
import ReceiptDisplay from "./components/receipt-display"
import Dropzone from "./components/dropzone"
import { Bot, Check, Clock, Key, Lock, PackageSearch } from "lucide-react"

export default function ReceiptManager() {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null)
  const [error, setError] = useState<string | null>(null)



  return (
    <div className="min-h-screen  p-4">
      <div className="text-center mt-10">
        <span className="border p-2 rounded-full text-[13px]  border-[#99a1af] text-[#99a1af] px-7">AI Powered Productivity Tools</span>
        <h1 className="text-[48px] leading-[56px] mt-4  font-bold text-center bg-gradient-to-r from-[#FF6FD8] via-[#FFD86F] to-[#6FC3FF] bg-clip-text text-transparent drop-shadow-lg">
          The Most Powerful AI for Invoice <br /> Data Extraction
        </h1>
        <p className="text-[18px] text-[#99a1af] mt-8">Save hours of manual work. Upload your invoices and let AI extract every piece of information <br /> with precision.</p>
        <button
          className="
            relative overflow-hidden
            px-8 py-3 mt-14 rounded-full
            bg-white bg-opacity-20
            border border-white border-opacity-30
            backdrop-blur-md
            shadow-2xl
            transition-all duration-300
            hover:bg-opacity-30 hover:backdrop-blur-xl
            group
          "
        >
          {/* Animated highlight sweep */}
          <span
            className="
              pointer-events-none
              absolute left-[-40%] top-0 h-full w-2/3
              bg-white bg-opacity-10
              text-white
              blur-lg
              rotate-12
              transition-transform duration-500
              group-hover:translate-x-[180%]
              group-hover:bg-opacity-20
              z-0
            "
            aria-hidden="true"
          ></span>
          <span className="relative z-10  text-white transition-colors duration-300 group-hover:text-white">
            Get Started for Free
          </span>
        </button>
      </div>

      <div className="max-w-6xl mx-auto mt-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-[#091d30] p-7 h-52 border border-[#99a1af3a] rounded-2xl flex flex-col items-center justify-center text-center">
            <Check size={40} color="#FF6FD8" />
            <h3 className="mt-4 text-[20px] text-[#FF6FD8]">99% Accurate Data</h3>
            <p className="text-[#99a1af] mt-2">Our AI model is trained to extract data from invoices with 99% accuracy.</p>
          </div>

          <div className="bg-[#091d30] p-7 h-52 border border-[#99a1af3a] rounded-2xl flex flex-col items-center justify-center text-center">
            <Lock size={40} color="#FF6FD8" />
            <h3 className="mt-4 text-[20px] text-[#FF6FD8]">Simple & Secure</h3>
            <p className="text-[#99a1af] mt-2">Securely upload your invoices with full confidence.</p>
          </div>

          <div className="bg-[#091d30] p-7 h-52 border border-[#99a1af3a] rounded-2xl flex flex-col items-center justify-center text-center">
            <PackageSearch size={40} color="#FF6FD8" />
            <h3 className="mt-4 text-[20px] text-[#FF6FD8]">Fast Processing</h3>
            <p className="text-[#99a1af] mt-2">Extract invoice data in seconds with our AI-powered tool.</p>
          </div>

          <div className="bg-[#091d30] p-7 h-52 border border-[#99a1af3a] rounded-2xl flex flex-col items-center justify-center text-center">
            <Clock size={40} color="#FF6FD8" />
            <h3 className="mt-4 text-[20px] text-[#FF6FD8]">Time-Saving</h3>
            <p className="text-[#99a1af] mt-2">Let our AI do the heavy lifting in seconds.</p>
          </div>

          <div className="bg-[#091d30] p-7 h-52 border border-[#99a1af3a] rounded-2xl flex flex-col items-center justify-center text-center">
            <Key size={40} color="#FF6FD8" />
            <h3 className="mt-4 text-[20px] text-[#FF6FD8]">No Sign in Required</h3>
            <p className="text-[#99a1af] mt-2">No need to sign up or provide personal information.</p>
          </div>

          <div className="bg-[#091d30] p-7 h-52 border border-[#99a1af3a] rounded-2xl flex flex-col items-center justify-center text-center">
            <Bot size={40} color="#FF6FD8" />
            <h3 className="mt-4 text-[20px] text-[#FF6FD8]">Powerful AI</h3>
            <p className="text-[#99a1af] mt-2">Handles invoices of any format or layout.</p>
          </div>

        </div>

      </div>



      <div className="max-w-6xl mx-auto my-28">
        <h2 className="text-center text-[30px] my-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-[#FF6FD8] text-[20px] font-bold">1. Upload</h3>
            <p className="text-center text-[#d1d5dc] mt-3">Drag & drop your invoice or upload from any device</p>
          </div>

          <div className="text-center">
            <h3 className="text-[#FF6FD8] text-[20px] font-bold">2. Extract</h3>
            <p className="text-center text-[#d1d5dc] mt-3">Our AI reads and extracts data fields with high accuracy—even from complex layouts.</p>
          </div>

          <div className="text-center">
            <h3 className="text-[#FF6FD8] text-[20px] font-bold">3. Export</h3>
            <p className="text-center text-[#d1d5dc] mt-3">Download your structured data in Excel, CSV or connect to your systems via API.</p>
          </div>
        </div>
      </div>



    </div>
  )
}
