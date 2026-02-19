import { CrowdLocationData, getDistance } from "./crowdUtils";

export interface LocalBusiness {
    id: string;
    name: string;
    type: 'food' | 'drink' | 'gift' | 'other';
    coords: string;
    image?: string;
    description: string;
    recommendedItem?: string;
}

// Real Data: Curated local businesses near major filming locations
export const MOCK_LOCAL_BUSINESSES: LocalBusiness[] = [
    // --- Near Grand Palace / Wat Phra Kaew ---
    {
        id: 'lb-k-panich',
        name: "K. Panich Sticky Rice",
        type: 'food',
        coords: "13.7523, 100.4996",
        image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&q=80&w=300",
        description: "Legendary mango sticky rice shop serving since 1932. Michelin Bib Gourmand.",
        recommendedItem: "Mango Sticky Rice"
    },
    {
        id: 'lb-pad-thai-thip-samai',
        name: "Thipsamai Pad Thai",
        type: 'food',
        coords: "13.7528, 100.5048",
        image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&q=80&w=300",
        description: "The most famous Pad Thai in Bangkok, known for their egg-wrapped noodles.",
        recommendedItem: "Superb Pad Thai"
    },
    {
        id: 'lb-amulet-market',
        name: "Tha Prachan Amulet Market",
        type: 'gift',
        coords: "13.7548, 100.4893",
        image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&q=80&w=300",
        description: "Historic market for Buddhist amulets and traditional charms.",
        recommendedItem: "Sacred Amulets"
    },

    // --- Near Wat Arun (Tha Tian / West Bank) ---
    {
        id: 'lb-tha-tian-market',
        name: "Tha Tian Market",
        type: 'other',
        coords: "13.7463, 100.4905",
        image: "https://images.unsplash.com/photo-1580974852861-c048383049b8?auto=format&fit=crop&q=80&w=300",
        description: "Historic dried seafood and wholesale market with riverside cafes.",
        recommendedItem: "Dried Seafood & Spices"
    },
    {
        id: 'lb-wang-lang',
        name: "Wang Lang Market",
        type: 'food',
        coords: "13.7554, 100.4856",
        image: "https://images.unsplash.com/photo-1582260654060-631165239a5c?auto=format&fit=crop&q=80&w=300", // Street food
        description: "Vibrant local market famous for cheap shopping and southern Thai street food.",
        recommendedItem: "Fried Pork with Sticky Rice"
    },

    // --- Chinatown (Yaowarat) ---
    {
        id: 'lb-tk-seafood',
        name: "T&K Seafood (Green Shirts)",
        type: 'food',
        coords: "13.7408, 100.5097",
        image: "https://images.unsplash.com/photo-1596627581515-77981d30a84d?auto=format&fit=crop&q=80&w=300", // Seafood
        description: "Famous open-air seafood stall with the staff in green shirts. Often crowded!",
        recommendedItem: "Grilled River Prawns"
    },
    {
        id: 'lb-guay-jub-ouan',
        name: "Guay Jub Ouan Pochana",
        type: 'food',
        coords: "13.7405, 100.5095",
        image: "https://plus.unsplash.com/premium_photo-1664472659345-3ae6244f7771?auto=format&fit=crop&q=80&w=300", // Noodle like
        description: "Michelin-recognized peppery rolled rice noodle soup.",
        recommendedItem: "Crispy Pork Noodle Soup"
    },
    {
        id: 'lb-yaowarat-toast',
        name: "Yaowarat Toasted Buns",
        type: 'food',
        coords: "13.7410, 100.5085",
        image: "https://images.unsplash.com/photo-1619623635582-730c4e09f538?auto=format&fit=crop&q=80&w=300", // Bread/Bun
        description: "Viral toasted buns with overflowing fillings like pandan custard.",
        recommendedItem: "Pandan Custard Bun"
    },

    // --- Siam / Shopping Area ---
    {
        id: 'lb-mango-tango',
        name: "Mango Tango",
        type: 'drink',
        coords: "13.7448, 100.5349",
        image: "https://images.unsplash.com/photo-1547516508-4c1f9c7c47ee?auto=format&fit=crop&q=80&w=300",
        description: "Modern dessert cafe dedicated entirely to mango treats.",
        recommendedItem: "Mango Smoothie"
    }
];

export function getNearbyBusinesses(targetLocation: { coords: string }, radiusKm: number = 2.0): LocalBusiness[] {
    const [lat1, lng1] = targetLocation.coords.split(',').map(s => parseFloat(s.trim()));
    if (isNaN(lat1) || isNaN(lng1)) return [];

    return MOCK_LOCAL_BUSINESSES.map(biz => {
        const [lat2, lng2] = biz.coords.split(',').map(s => parseFloat(s.trim()));
        const distance = getDistance(lat1, lng1, lat2, lng2);
        return { ...biz, distance };
    })
        .filter((biz: any) => biz.distance <= radiusKm)
        .sort((a: any, b: any) => a.distance - b.distance);
}

export function convertBusinessToLocation(biz: LocalBusiness): CrowdLocationData {
    return {
        id: biz.id,
        name: biz.name,
        visitorCount: Math.floor(Math.random() * 50), // Low count for local shops
        capacity: 50,
        image: biz.image,
        coords: biz.coords,
        description: `[Local Support] ${biz.description} - Must try: ${biz.recommendedItem}`,
        trend: 'stable'
    };
}
