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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { upsertSeries } from "@/app/actions/admin"
import { ImageUpload } from "./ImageUpload"

const formSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    category: z.string().optional(),
    poster: z.string().min(1, "Poster image is required"),
    isTrending: z.boolean().optional(), // Removed default, handle in defaultValues
})

type SeriesFormValues = z.infer<typeof formSchema>

interface SeriesDialogProps {
    series?: SeriesFormValues
    trigger?: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

export function SeriesDialog({ series, trigger, open, onOpenChange }: SeriesDialogProps) {
    const [internalOpen, setInternalOpen] = useState(false)
    const isControlled = open !== undefined
    const show = isControlled ? open : internalOpen
    const setShow = isControlled && onOpenChange ? onOpenChange : setInternalOpen

    const [isLoading, setIsLoading] = useState(false)

    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<SeriesFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: series || {
            title: "",
            description: "",
            category: "Series",
            poster: "",
            isTrending: false
        }
    })

    useEffect(() => {
        if (series) {
            reset({
                ...series,
                category: series.category || "Series",
                isTrending: series.isTrending ?? false
            })
        } else {
            reset({
                title: "",
                description: "",
                category: "Series",
                poster: "",
                isTrending: false
            })
        }
    }, [series, reset, show])

    const poster = watch("poster")
    const isTrending = watch("isTrending")

    const onSubmit = async (data: SeriesFormValues) => {
        setIsLoading(true)
        try {
            await upsertSeries({
                ...data,
                isTrending: !!data.isTrending
            })
            setShow(false)
            reset()
        } catch (error) {
            console.error(error)
            alert("Failed to save series")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={show} onOpenChange={setShow}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{series ? "Edit Series" : "Add New Series"}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label>Category</Label>
                        <Select
                            onValueChange={(val) => setValue("category", val)}
                            defaultValue={watch("category") || "Series"}
                            disabled={isLoading}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Series">Series</SelectItem>
                                <SelectItem value="Movie">Movie</SelectItem>
                                <SelectItem value="Music Video">Music Video</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Title</Label>
                        <Input {...register("title")} disabled={isLoading} />
                        {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea {...register("description")} disabled={isLoading} className="min-h-[100px]" />
                        {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
                    </div>

                    <div className="space-y-2">
                        <Label>Trending</Label>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="isTrending"
                                checked={isTrending}
                                onCheckedChange={(checked) => setValue("isTrending", checked as boolean)}
                                disabled={isLoading}
                            />
                            <label
                                htmlFor="isTrending"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Set as Trending Series
                            </label>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <ImageUpload
                            value={poster}
                            onChange={(url) => setValue("poster", url)}
                            label="Poster Image"
                            disabled={isLoading}
                        />
                        {errors.poster && <span className="text-red-500 text-sm">{errors.poster.message}</span>}
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setShow(false)} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Series
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
