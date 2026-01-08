"use client";

import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface LocationPermissionRequestProps {
    onRequestPermission: () => void;
    error?: string | null;
}

export function LocationPermissionRequest({ onRequestPermission, error }: LocationPermissionRequestProps) {
    return (
        <div className="flex items-center justify-center min-h-[60vh] p-4">
            <Card className="w-full max-w-md shadow-lg border-2 border-primary/10">
                <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <Navigation className="w-8 h-8 text-primary animate-pulse" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-primary">เปิดใช้งานตำแหน่งที่ตั้ง</CardTitle>
                    <CardDescription className="text-base text-muted-foreground mt-2">
                        เพื่อช่วยคุณหลีกเลี่ยงพื้นที่หนาแน่นและแนะนำสถานที่ท่องเที่ยวใกล้เคียง (Enable location to avoid crowds and find smart alternatives)
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <Button
                        onClick={onRequestPermission}
                        size="lg"
                        className="w-full text-lg font-medium group"
                    >
                        <MapPin className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                        อนุญาตให้เข้าถึงตำแหน่ง
                    </Button>

                    {error && (
                        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md text-center">
                            {error}
                            <div className="mt-1 text-xs opacity-80">
                                Please enable location access in your browser settings.
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
