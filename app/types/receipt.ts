export interface ReceiptItem {
  description: string
  quantity?: number
  unitPrice?: number
  totalPrice?: number
}

export interface ReceiptData {
  merchantName?: string
  merchantAddress?: string
  receiptDate?: string
  totalAmount?: number
  subtotal?: number
  tax?: number
  items: ReceiptItem[]
  confidence: number
  rawText?: string
}
