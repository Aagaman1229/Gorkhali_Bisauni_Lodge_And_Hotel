"use client"

import { useState, useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { exportData } from "@/lib/actions"
import { Download, FileSpreadsheet } from "lucide-react"
import { toast } from "sonner"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Exporting..." : "Export & Download"}
    </Button>
  )
}

export function ExportDataClient() {
  const [exportType, setExportType] = useState("bookings")
  const [result, setResult] = useState<{ headers: string[]; rows: string[][] } | null>(null)
  const [exportState, exportAction] = useActionState(exportData, null)

  function downloadCSV(headers: string[], rows: string[][]) {
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${exportType}_${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportResult = exportState as { success: boolean; headers: string[]; rows: string[][] } | null
  if (exportResult?.success && exportResult.headers && exportResult.rows && exportResult !== result) {
    const data = exportResult as { headers: string[]; rows: string[][] }
    setResult(data)
    downloadCSV(data.headers, data.rows)
    toast.success(`${exportType} exported!`)
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Export Data</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Download className="h-4 w-4" /> Export to CSV
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form action={exportAction} className="space-y-4">
              <div className="space-y-1">
                <Label>Data Type</Label>
                <select
                  name="type"
                  value={exportType}
                  onChange={(e) => setExportType(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-zinc-300 bg-background px-3 py-1 text-sm dark:border-zinc-700"
                >
                  <option value="bookings">Bookings</option>
                  <option value="bills">Bills</option>
                  <option value="orders">Food Orders</option>
                  <option value="expenses">Expenses</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>From Date</Label>
                  <Input name="from_date" type="date" required />
                </div>
                <div className="space-y-1">
                  <Label>To Date</Label>
                  <Input name="to_date" type="date" required />
                </div>
              </div>
              <SubmitButton />
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileSpreadsheet className="h-4 w-4" /> Quick Export Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-zinc-500">Download reports for common periods:</p>
            <div className="flex flex-wrap gap-2">
              {["bookings", "bills", "orders", "expenses"].map((type) => (
                <form key={type} action={exportAction}>
                  <input type="hidden" name="type" value={type} />
                  <input type="hidden" name="from_date" value={new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split("T")[0]} />
                  <input type="hidden" name="to_date" value={new Date().toISOString().split("T")[0]} />
                  <Button type="submit" variant="outline" size="sm">
                    <Download className="mr-1 h-3 w-3" /> This Month {type}
                  </Button>
                </form>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {result && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">Preview ({result.rows.length} rows)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-80 overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-zinc-500 dark:border-zinc-700">
                    {result.headers.map((h, i) => (
                      <th key={i} className="pb-2 pr-3 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.rows.slice(0, 10).map((row, i) => (
                    <tr key={i} className="border-b border-zinc-100 dark:border-zinc-800">
                      {row.map((cell, j) => (
                        <td key={j} className="py-1.5 pr-3 whitespace-nowrap">{cell}</td>
                      ))}
                    </tr>
                  ))}
                  {result.rows.length > 10 && (
                    <tr><td colSpan={result.headers.length} className="py-2 text-center text-zinc-400">...and {result.rows.length - 10} more rows</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
