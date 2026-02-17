
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const locationId = searchParams.get('locationId');

    if (!locationId) {
        return NextResponse.json({ error: 'Location ID is required' }, { status: 400 });
    }

    try {
        const reviews = await prisma.review.findMany({
            where: { locationId: parseInt(locationId) },
            include: {
                user: {
                    select: { name: true, image: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { rating, comment, locationId, image } = body;

        if (!rating || !locationId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const review = await prisma.review.create({
            data: {
                rating: parseInt(rating),
                comment,
                image,
                userId: session.user.id,
                locationId: parseInt(locationId),
            },
        });

        return NextResponse.json(review);
    } catch (error) {
        console.error("Error creating review:", error);
        return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
    }
}
