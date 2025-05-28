import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Store, Calendar, Receipt, DollarSign, BarChart3, Table } from "lucide-react"
import type { ReceiptData } from "../types/receipt"
import ReceiptAnalytics from "./receipt-analytics"

interface ReceiptDisplayProps {
  data: ReceiptData
}

export default function ReceiptDisplay({ data }: ReceiptDisplayProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const confidenceColor =
    data.confidence > 0.8
      ? "bg-[#D946EF] text-white"
      : data.confidence > 0.6
        ? "bg-yellow-100 text-yellow-800"
        : "bg-orange-100 text-orange-800"

  return (
    <div className="space-y-6">
      <div className="bg-[#091D30] text-white rounded-3xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Receipt Analysis
            </CardTitle>
            <div className="flex gap-2">
              <Badge className={confidenceColor}>{Math.round(data.confidence * 100)}% confidence</Badge>
              {data.confidence < 0.6 && (
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  Basic Processing
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="table" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="table" className="flex items-center gap-2">
                <Table className="h-4 w-4" />
                Table View
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics & Charts
              </TabsTrigger>
            </TabsList>

            <TabsContent value="table" className="space-y-6 mt-6">
              {/* Merchant Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium ">
                    <Store className="h-4 w-4" />
                    Merchant
                  </div>
                  <div>
                    <p className="font-semibold">{data.merchantName || "Not detected"}</p>
                    {data.merchantAddress && <p className="text-sm ">{data.merchantAddress}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Calendar className="h-4 w-4" />
                    Date
                  </div>
                  <p className="font-semibold">{data.receiptDate || "Not detected"}</p>
                </div>
              </div>

              <Separator />

              {/* Items */}
              {data.items.length > 0 && (
                <div className="space-y-4">
                  <h3 className=" text-[#D946EF] text-2xl">Items</h3>
                  <div className="space-y-2 overflow-x-auto">
                    {data.items.map((item, index) => (
                      <div key={index} className="flex flex-col md:flex-row justify-between items-start p-3 bg-gray-50 rounded-lg min-w-[250px]">
                        <div className="flex-1">
                          <p className="font-medium text-gray-600">{item.description}</p>
                          {item.quantity && item.unitPrice && (
                            <p className="text-sm text-gray-600">
                              {item.quantity} × {formatCurrency(item.unitPrice)}
                            </p>
                          )}
                        </div>
                        {item.totalPrice && <p className="font-semibold text-gray-600">{formatCurrency(item.totalPrice)}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              {/* Totals */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium  mb-3">
                  <DollarSign className="h-4 w-4 text-white" />
                  Summary
                </div>

                {data.subtotal > 0 && (
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(data.subtotal)}</span>
                  </div>
                )}

                {data.tax > 0 && (
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>{formatCurrency(data.tax)}</span>
                  </div>
                )}

                {data.totalAmount > 0 && (
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span className="font-bold text-2xl">Total:</span>
                    <span className="text-[#D946EF] font-bold text-2xl">{formatCurrency(data.totalAmount)}</span>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <ReceiptAnalytics data={data} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </div>


    </div>
  )
}
