'use client'

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Upload, X } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
    value: string
    onChange: (url: string) => void
    label?: string
    disabled?: boolean
}

export function ImageUpload({ value, onChange, label = "Image", disabled }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Check file size (max 4.5MB for Vercel Serverless)
        if (file.size > 4.5 * 1024 * 1024) {
            alert("File is too large. Please match Vercel limit of 4.5MB.")
            if (fileInputRef.current) fileInputRef.current.value = ""
            return
        }

        setIsUploading(true)
        try {
            const formData = new FormData()
            formData.append("file", file)

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            })

            if (!res.ok) {
                const errorData = await res.text()
                throw new Error(errorData || `Upload failed with status ${res.status}`)
            }

            const data = await res.json()
            onChange(data.url)
        } catch (error: any) {
            console.error(error)
            alert(error.message || "Upload failed")
        } finally {
            setIsUploading(false)
            // Reset input
            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
        }
    }

    return (
        <div className="space-y-4 w-full">
            <Label>{label}</Label>

            {value ? (
                <div className="relative aspect-video w-full max-w-sm rounded-lg overflow-hidden border bg-muted">
                    <Image
                        src={value}
                        alt="Upload preview"
                        fill
                        className="object-cover"
                    />
                    <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={() => onChange("")}
                        disabled={disabled}
                    >
                        <X className="h-3 w-3" />
                    </Button>
                </div>
            ) : (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center w-full max-w-sm aspect-video rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 cursor-pointer bg-muted/50 hover:bg-muted transition-colors"
                >
                    {isUploading ? (
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    ) : (
                        <div className="text-center space-y-2 text-muted-foreground">
                            <Upload className="h-8 w-8 mx-auto" />
                            <span className="text-xs">Click to upload</span>
                        </div>
                    )}
                </div>
            )}

            <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
                disabled={disabled || isUploading}
            />
        </div>
    )
}
