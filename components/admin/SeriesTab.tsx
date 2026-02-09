'use client'

import { useState } from "react"
import { Edit, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { deleteSeries } from "@/app/actions/admin"
import { SeriesDialog } from "./SeriesDialog"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"

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

    const columns: ColumnDef<Series>[] = [
        {
            accessorKey: "poster",
            header: "Poster",
            cell: ({ row }) => (
                <div className="relative h-12 w-8 rounded overflow-hidden bg-muted">
                    {row.original.poster && (
                        <Image
                            src={row.original.poster}
                            alt={row.original.title}
                            fill
                            className="object-cover"
                        />
                    )}
                </div>
            ),
        },
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
        },
        {
            accessorKey: "category",
            header: "Category",
            cell: ({ row }) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {row.getValue("category") || "Series"}
                </span>
            ),
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) => <div className="max-w-[300px] truncate" title={row.getValue("description")}>{row.getValue("description")}</div>,
        },
        {
            accessorKey: "isTrending",
            header: "Trending",
            cell: ({ row }) => <div>{row.getValue("isTrending") ? "Yes" : "No"}</div>,
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <div className="flex justify-end gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(row.original)}
                    >
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleDelete(row.original.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ]

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Series Management</h2>
                <Button onClick={handleAdd}>
                    <Plus className="mr-2 h-4 w-4" /> Add Series
                </Button>
            </div>

            <DataTable columns={columns} data={series} searchKey="title" />

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
