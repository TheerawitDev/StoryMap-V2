'use client'

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { upsertLocation } from "@/app/actions/admin"
import { ImageUpload } from "./ImageUpload"

// We need series options for the dropdown
interface SeriesOption {
    id: number
    title: string
}

const formSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "Name is required"),
    seriesId: z.string().min(1, "Series is required"), // Keep as string for form
    image: z.string().min(1, "Image is required"),
    description: z.string().min(1, "Description is required"),
    scene: z.string().optional(),
    coords: z.string().min(1, "Coordinates required (lat, lng)"),
    isMajor: z.boolean().optional(),
})

type LocationFormValues = z.infer<typeof formSchema>

interface LocationDialogProps {
    location?: any // Using any loosely here to avoid complex Prisma type mapping in client component, or define a strict type
    seriesOptions: SeriesOption[]
    trigger?: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

export function LocationDialog({ location, seriesOptions, trigger, open, onOpenChange }: LocationDialogProps) {
    const [internalOpen, setInternalOpen] = useState(false)
    const isControlled = open !== undefined
    const show = isControlled ? open : internalOpen
    const setShow = isControlled && onOpenChange ? onOpenChange : setInternalOpen

    const [isLoading, setIsLoading] = useState(false)

    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<LocationFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            seriesId: undefined,
            image: "",
            description: "",
            scene: "",
            coords: "",
            isMajor: false
        }
    })

    // Reset form when location changes (for edit mode)
    useEffect(() => {
        if (location) {
            reset({
                id: location.id,
                name: location.name,
                seriesId: location.seriesId.toString(),
                image: location.image || "",
                description: location.description,
                scene: location.scene || "",
                coords: location.coords,
                isMajor: location.isMajor || false
            })
        } else {
            reset({
                name: "",
                seriesId: undefined, // Reset selection
                image: "",
                description: "",
                scene: "",
                coords: "",
                isMajor: false
            })
        }
    }, [location, reset, show]) // Reset when dialog opens/closes or location changes

    const image = watch("image")
    const isMajor = watch("isMajor")
    const seriesId = watch("seriesId")

    const onSubmit = async (data: any) => { // Use any to bypass strict Zod/HookForm mismatch
        setIsLoading(true)
        try {
            await upsertLocation({
                ...data,
                seriesId: parseInt(data.seriesId),
                isMajor: !!data.isMajor // Ensure boolean
            })
            setShow(false)
            reset()
        } catch (error) {
            console.error(error)
            alert("Failed to save location")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={show} onOpenChange={setShow}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{location ? "Edit Location" : "Add New Location"}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Name</Label>
                            <Input {...register("name")} disabled={isLoading} />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                        </div>

                        <div className="space-y-2">
                            <Label>Series</Label>
                            <Select
                                onValueChange={(val) => setValue("seriesId", val as any)}
                                value={seriesId?.toString()}
                                disabled={isLoading}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Series" />
                                </SelectTrigger>
                                <SelectContent>
                                    {seriesOptions.map(s => (
                                        <SelectItem key={s.id} value={s.id.toString()}>
                                            {s.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.seriesId && <span className="text-red-500 text-sm">{errors.seriesId.message}</span>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Coordinates (lat, lng)</Label>
                        <Input {...register("coords")} placeholder="13.7563, 100.5018" disabled={isLoading} />
                        {errors.coords && <span className="text-red-500 text-sm">{errors.coords.message}</span>}
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea {...register("description")} disabled={isLoading} />
                        {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
                    </div>

                    <div className="space-y-2">
                        <Label>Scene Context (Optional)</Label>
                        <Textarea {...register("scene")} placeholder="Describe the scene in the series..." disabled={isLoading} />
                    </div>

                    <div className="space-y-2">
                        <Label>Location Type</Label>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="isMajor"
                                checked={isMajor}
                                onCheckedChange={(checked) => setValue("isMajor", checked as boolean)}
                                disabled={isLoading}
                            />
                            <label
                                htmlFor="isMajor"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Major / Featured Location
                            </label>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <ImageUpload
                            value={image}
                            onChange={(url) => setValue("image", url)}
                            label="Location Image"
                            disabled={isLoading}
                        />
                        {errors.image && <span className="text-red-500 text-sm">{errors.image.message}</span>}
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setShow(false)} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Location
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
