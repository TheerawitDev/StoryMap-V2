'use client'

import { useState } from "react"
import { Edit, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Image from "next/image"
import { deleteLocation } from "@/app/actions/admin"
import { LocationDialog } from "./LocationDialog"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"

interface SeriesSummary {
    id: number;
    title: string;
    category: string;
}

interface Location {
    id: number;
    name: string;
    image: string | null;
    seriesId: number;
    series?: SeriesSummary;
    description: string | null;
    scene: string | null;
    coords: string | null;
    isMajor: boolean;
}

interface LocationsTabProps {
    locations: Location[]
    series: SeriesSummary[]
}

export function LocationsTab({ locations, series }: LocationsTabProps) {
    const [selectedLocation, setSelectedLocation] = useState<Location | undefined>(undefined)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [filterSeriesId, setFilterSeriesId] = useState<string>("all")

    const handleEdit = (item: Location) => {
        setSelectedLocation(item)
        setIsDialogOpen(true)
    }

    const handleAdd = () => {
        setSelectedLocation(undefined)
        setIsDialogOpen(true)
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this location?")) return
        try {
            await deleteLocation(id)
        } catch (error) {
            console.error(error)
            alert("Failed to delete location")
        }
    }

    const filteredLocations = filterSeriesId === "all"
        ? locations
        : locations.filter(l => l.seriesId.toString() === filterSeriesId)

    const columns: ColumnDef<Location>[] = [
        {
            accessorKey: "image",
            header: "Image",
            cell: ({ row }) => (
                <div className="relative h-12 w-16 rounded overflow-hidden bg-muted">
                    {row.original.image && (
                        <Image
                            src={row.original.image}
                            alt={row.original.name}
                            fill
                            className="object-cover"
                        />
                    )}
                </div>
            ),
        },
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => (
                <div>
                    <div className="font-medium">{row.getValue("name")}</div>
                    <div className="text-xs text-muted-foreground md:hidden">{row.original.series?.title}</div>
                </div>
            ),
        },
        {
            accessorKey: "series.title", // Access nested data
            // header: "Series", // Removed duplicate
            cell: ({ row }) => <div className="hidden md:block">{row.original.series?.title}</div>,
            header: ({ column }) => <div className="hidden md:block">Series</div>, // Hide header on mobile too if needed, but CSS in cell is easier
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-semibold">Locations</h2>
                    <Select value={filterSeriesId} onValueChange={setFilterSeriesId}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by Series" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Series</SelectItem>
                            {series.map(s => (
                                <SelectItem key={s.id} value={s.id.toString()}>{s.title}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button onClick={handleAdd}>
                    <Plus className="mr-2 h-4 w-4" /> Add Location
                </Button>
            </div>

            <DataTable columns={columns} data={filteredLocations} searchKey="name" />

            <LocationDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                location={selectedLocation ? {
                    seriesId: selectedLocation.seriesId.toString(),
                    image: selectedLocation.image ?? "",
                    description: selectedLocation.description ?? "",
                    scene: selectedLocation.scene ?? "",
                    coords: selectedLocation.coords ?? ""
                } : undefined}
                seriesOptions={series}
            />
        </div>
    )
}
