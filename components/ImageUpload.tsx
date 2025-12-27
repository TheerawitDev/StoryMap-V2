
"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Image as ImageIcon, X } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
    className?: string;
}

export function ImageUpload({ value, onChange, label = "Upload Image", className }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();
            onChange(data.url);
        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload image.");
        } finally {
            setIsUploading(false);
            // Reset input so validation can trigger again if needed
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleRemove = () => {
        onChange("");
    };

    return (
        <div className={`space-y-2 ${className}`}>
            <Label>{label}</Label>

            {value ? (
                <div className="relative aspect-video w-full max-w-sm rounded-lg overflow-hidden border bg-gray-100">
                    <Image
                        src={value}
                        alt="Uploaded image"
                        fill
                        className="object-cover"
                    />
                    <button
                        onClick={handleRemove}
                        type="button"
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-sm"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all h-40 text-gray-500"
                >
                    {isUploading ? (
                        <>
                            <Loader2 className="w-8 h-8 animate-spin mb-2 text-primary" />
                            <span className="text-sm">Uploading...</span>
                        </>
                    ) : (
                        <>
                            <ImageIcon className="w-8 h-8 mb-2" />
                            <span className="text-sm font-medium">Click to upload image</span>
                            <span className="text-xs text-gray-400 mt-1">JPG, PNG known formats</span>
                        </>
                    )}
                </div>
            )}

            <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={isUploading}
            />
        </div>
    );
}
