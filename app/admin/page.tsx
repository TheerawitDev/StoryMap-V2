import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SeriesTab } from "@/components/admin/SeriesTab"
import { LocationsTab } from "@/components/admin/LocationsTab"
import { AdminsTab } from "@/components/admin/AdminsTab"

export default async function AdminPage() {
    const session = await auth()

    if (!session?.user?.email) {
        redirect("/api/auth/signin")
    }

    const isAdmin = await prisma.allowedAdmin.findUnique({
        where: { email: session.user.email }
    })

    if (!isAdmin) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
                <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
                <p className="text-muted-foreground">You do not have permission to view the admin dashboard.</p>
                <p className="text-sm mt-4 text-muted-foreground">Logged in as: {session.user.email}</p>
            </div>
        )
    }

    // Fetch All Data
    const [series, locations, admins] = await Promise.all([
        prisma.series.findMany({ orderBy: { id: 'desc' } }),
        prisma.location.findMany({
            include: { series: true },
            orderBy: { id: 'desc' }
        }),
        prisma.allowedAdmin.findMany()
    ])

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Manage content and settings</p>
                </div>
                <div className="text-sm text-right text-muted-foreground">
                    <p>Welcome, {session.user.name}</p>
                    <p className="text-xs">{session.user.email}</p>
                </div>
            </div>

            <Tabs defaultValue="series" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="series">Series</TabsTrigger>
                    <TabsTrigger value="locations">Locations</TabsTrigger>
                    <TabsTrigger value="admins">Admins</TabsTrigger>
                </TabsList>

                <TabsContent value="series" className="space-y-4">
                    <SeriesTab series={series} />
                </TabsContent>

                <TabsContent value="locations" className="space-y-4">
                    <LocationsTab locations={locations} series={series} />
                </TabsContent>

                <TabsContent value="admins" className="space-y-4">
                    <div className="max-w-4xl">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-1">Admin Access</h2>
                            <p className="text-sm text-muted-foreground">
                                Allow other users to access this dashboard by adding their email addresses below.
                                They must log in with Google using the whitelisted email.
                            </p>
                        </div>
                        <AdminsTab admins={admins} />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
