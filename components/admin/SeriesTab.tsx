'use client'

import { useState } from "react"
import { Edit, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import Image from "next/image"
import { deleteSeries } from "@/app/actions/admin"
import { SeriesDialog } from "./SeriesDialog"

// Define the shape of Series data expected by the admin tab
interface Series {
    id: number;
    title: string;
    description: string | null;
    category: string;
    poster: string | null;
    isTrending: boolean;
}

interface SeriesTabProps {
    series: Series[]
}

export function SeriesTab({ series }: SeriesTabProps) {
    const [selectedSeries, setSelectedSeries] = useState<Series | undefined>(undefined)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleEdit = (item: Series) => {
        setSelectedSeries(item)
        setIsDialogOpen(true)
    }

    const handleAdd = () => {
        setSelectedSeries(undefined)
        setIsDialogOpen(true)
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this series? This will also delete all associated locations.")) return
        try {
            await deleteSeries(id)
        } catch (error) {
            console.error(error)
            alert("Failed to delete series")
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Series Management</h2>
                <Button onClick={handleAdd}>
                    <Plus className="mr-2 h-4 w-4" /> Add Series
                </Button>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">Image</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="hidden md:table-cell">Description</TableHead>
                            <TableHead className="w-[100px]">Trending</TableHead>
                            <TableHead className="w-[100px] text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {series.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <div className="relative h-12 w-8 rounded overflow-hidden bg-muted">
                                        {item.poster && (
                                            <Image
                                                src={item.poster}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                            />
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">{item.title}</TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {item.category || "Series"}
                                    </span>
                                </TableCell>
                                <TableCell className="hidden md:table-cell truncate max-w-xs">{item.description}</TableCell>
                                <TableCell>{item.isTrending ? "Yes" : "No"}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleEdit(item)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <SeriesDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                series={selectedSeries ? {
                    ...selectedSeries,
                    description: selectedSeries.description ?? "",
                    poster: selectedSeries.poster ?? "",
                    category: selectedSeries.category ?? "Series"
                } : undefined}
            />
        </div>
    )
}
