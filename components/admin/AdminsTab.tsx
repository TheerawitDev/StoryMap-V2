'use client'

import { useState } from "react"
import { Loader2, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { addAdmin, removeAdmin } from "@/app/actions/admin"

interface AdminsTabProps {
    admins: { email: string }[]
}

export function AdminsTab({ admins }: AdminsTabProps) {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleAdd = async () => {
        if (!email) return
        setIsLoading(true)
        try {
            await addAdmin(email)
            setEmail("")
        } catch (error) {
            console.error(error)
            alert("Failed to add admin")
        } finally {
            setIsLoading(false)
        }
    }

    const handleRemove = async (emailToRemove: string) => {
        if (!confirm(`Remove admin access for ${emailToRemove}?`)) return
        try {
            await removeAdmin(emailToRemove)
        } catch (error) {
            console.error(error)
            alert("Failed to remove admin")
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-end gap-4 max-w-md">
                <div className="space-y-2 flex-1">
                    <Input
                        placeholder="new.admin@gmail.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <Button onClick={handleAdd} disabled={isLoading || !email}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
                    Add Admin
                </Button>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Allowed Email</TableHead>
                            <TableHead className="w-[100px] text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {admins.map((admin) => (
                            <TableRow key={admin.email}>
                                <TableCell className="font-medium">{admin.email}</TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                        onClick={() => handleRemove(admin.email)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {admins.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={2} className="text-center text-muted-foreground h-24">
                                    No permitted admins found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
