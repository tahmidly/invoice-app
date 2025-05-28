"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { TrendingUp, DollarSign, ShoppingCart, Receipt, PieChartIcon, BarChart3, TrendingDown } from "lucide-react"
import type { ReceiptData } from "../types/receipt"

interface ReceiptAnalyticsProps {
  data: ReceiptData
  receipts?: ReceiptData[] // For multiple receipts analysis
}

export default function ReceiptAnalytics({ data, receipts = [data] }: ReceiptAnalyticsProps) {
  // Prepare data for different chart types
  const itemsData = data.items.map((item, index) => ({
    name: item.description.length > 20 ? item.description.substring(0, 20) + "..." : item.description,
    fullName: item.description,
    value: item.totalPrice || 0,
    quantity: item.quantity || 1,
    unitPrice: item.unitPrice || 0,
    color: `hsl(${(index * 137.5) % 360}, 70%, 50%)`,
  }))

  // Cost breakdown data
  const costBreakdown = [
    { name: "Subtotal", value: typeof data.subtotal === 'number' ? data.subtotal : 0, color: "#3b82f6" },
    { name: "Tax", value: typeof data.tax === 'number' ? data.tax : 0, color: "#ef4444" },
  ].filter((item) => item.value > 0)

  // Price distribution data
  const priceRanges = [
    { range: "$0-5", count: 0, total: 0 },
    { range: "$5-10", count: 0, total: 0 },
    { range: "$10-20", count: 0, total: 0 },
    { range: "$20+", count: 0, total: 0 },
  ]

  data.items.forEach((item) => {
    const price = item.totalPrice || 0
    if (price <= 5) {
      priceRanges[0].count++
      priceRanges[0].total += price
    } else if (price <= 10) {
      priceRanges[1].count++
      priceRanges[1].total += price
    } else if (price <= 20) {
      priceRanges[2].count++
      priceRanges[2].total += price
    } else {
      priceRanges[3].count++
      priceRanges[3].total += price
    }
  })

  // Summary statistics
  const totalItems = Array.isArray(data.items) ? data.items.length : 0
  const averageItemPrice = totalItems > 0 ? ((typeof data.subtotal === 'number' ? data.subtotal : data.totalAmount) || 0) / totalItems : 0
  const mostExpensiveItem = (Array.isArray(data.items) && data.items.length > 0)
    ? data.items.reduce(
        (max, item) => ((item.totalPrice || 0) > (max.totalPrice || 0) ? item : max),
        data.items[0]
      )
    : { description: "N/A", totalPrice: 0 }
  const taxRate = typeof data.subtotal === 'number' && data.subtotal > 0 ? ((typeof data.tax === 'number' ? data.tax : 0) / data.subtotal) * 100 : 0

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Receipt className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold">{totalItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold">{formatCurrency(data.totalAmount || 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Item Price</p>
                <p className="text-2xl font-bold">{formatCurrency(averageItemPrice)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingDown className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Tax Rate</p>
                <p className="text-2xl font-bold">{formatPercentage(taxRate)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Items Distribution Pie Chart */}
        {itemsData.length > 0 && (
          <div className="min-w-0 overflow-x-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5" />
                  Items Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Amount",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px] w-full"
                >
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={itemsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {itemsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload
                            return (
                              <div className="bg-white p-3 border rounded-lg shadow-lg">
                                <p className="font-medium">{data.fullName}</p>
                                <p className="text-sm text-gray-600">Amount: {formatCurrency(data.value)}</p>
                                {data.quantity > 1 && <p className="text-sm text-gray-600">Quantity: {data.quantity}</p>}
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Cost Breakdown */}
        {costBreakdown.length > 0 && (
          <div className="min-w-0 overflow-x-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Cost Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Amount",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px] w-full"
                >
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={costBreakdown} margin={{ right: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `$${value}`} />
                      <ChartTooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-white p-3 border rounded-lg shadow-lg">
                                <p className="font-medium">{label}</p>
                                <p className="text-sm text-gray-600">{formatCurrency(payload[0].value as number)}</p>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Bar dataKey="value" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Price Range Distribution */}
        <div className="min-w-0 overflow-x-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Price Range Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  count: {
                    label: "Items",
                    color: "hsl(var(--chart-3))",
                  },
                  total: {
                    label: "Total Value",
                    color: "hsl(var(--chart-4))",
                  },
                }}
                className="h-[300px] w-full"
              >
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={priceRanges} margin={{ right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `$${value}`} />
                    <ChartTooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-3 border rounded-lg shadow-lg">
                              <p className="font-medium">{label}</p>
                              <p className="text-sm text-gray-600">Items: {payload[0].value}</p>
                              <p className="text-sm text-gray-600">Total: {formatCurrency(payload[1].value as number)}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="count" fill="#8b5cf6" name="Number of Items" />
                    <Bar yAxisId="right" dataKey="total" fill="#06b6d4" name="Total Value" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Item Analysis */}
        <div className="min-w-0">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Item Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-green-800">Most Expensive Item</p>
                    <p className="text-sm text-green-600">{mostExpensiveItem.description}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {formatCurrency(mostExpensiveItem.totalPrice || 0)}
                  </Badge>
                </div>

                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium text-blue-800">Average Item Price</p>
                    <p className="text-sm text-blue-600">Across {totalItems} items</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">{formatCurrency(averageItemPrice)}</Badge>
                </div>

                {typeof data.tax === 'number' && data.tax > 0 && (
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <div>
                      <p className="font-medium text-orange-800">Tax Information</p>
                      <p className="text-sm text-orange-600">{formatPercentage(taxRate)} rate</p>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800">{formatCurrency(data.tax)}</Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed Items Bar Chart */}
      {itemsData.length > 0 && (
        <div className="min-w-0 overflow-x-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Items Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: {
                    label: "Price",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[400px] w-full"
              >
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={itemsData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} interval={0} />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <ChartTooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-white p-3 border rounded-lg shadow-lg">
                              <p className="font-medium">{data.fullName}</p>
                              <p className="text-sm text-gray-600">Price: {formatCurrency(data.value)}</p>
                              {data.quantity > 1 && (
                                <p className="text-sm text-gray-600">
                                  Quantity: {data.quantity} × {formatCurrency(data.unitPrice)}
                                </p>
                              )}
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
