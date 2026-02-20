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
// Real Data: Curated local businesses near major filming locations
export const MOCK_LOCAL_BUSINESSES: LocalBusiness[] = [
    // --- Near Grand Palace / Wat Phra Kaew ---
    {
        id: 'lb-k-panich',
        name: "ก.พานิช (K. Panich)",
        type: 'food',
        coords: "13.7523, 100.4996",
        description: "ร้านข้าวเหนียวมูนระดับตำนาน เปิดขายมาตั้งแต่ปี 2475 การันตีด้วย Michelin Bib Gourmand",
        recommendedItem: "ข้าวเหนียวมูนมะม่วง (Mango Sticky Rice)"
    },
    {
        id: 'lb-pad-thai-thip-samai',
        name: "ทิพย์สมัย ผัดไทยประตูผี",
        type: 'food',
        coords: "13.7528, 100.5048",
        description: "ร้านผัดไทยที่โด่งดังที่สุดในกรุงเทพฯ ขึ้นชื่อเรื่องผัดไทยห่อไข่และน้ำส้มคั้นสด",
        recommendedItem: "ผัดไทยห่อไข่ (Superb Pad Thai)"
    },
    {
        id: 'lb-amulet-market',
        name: "ตลาดพระท่าพระจันทร์",
        type: 'gift',
        coords: "13.7548, 100.4893",
        description: "ตลาดพระเครื่องและวัตถุมงคลที่เก่าแก่และมีชื่อเสียงที่สุดในกรุงเทพฯ",
        recommendedItem: "พระเครื่องและวัตถุมงคล"
    },

    // --- Near Wat Arun (Tha Tian / West Bank) ---
    {
        id: 'lb-tha-tian-market',
        name: "ตลาดท่าเตียน",
        type: 'other',
        coords: "13.7463, 100.4905",
        description: "ตลาดเก่าแก่ริมแม่น้ำเจ้าพระยา แหล่งรวมอาหารทะเลแห้งย่านที่คึกคักไปด้วยคาเฟ่",
        recommendedItem: "อาหารทะเลแห้ง (Dried Seafood)"
    },
    {
        id: 'lb-wang-lang',
        name: "ตลาดวังหลัง",
        type: 'food',
        coords: "13.7554, 100.4856",
        description: "สวรรค์ของนักกินและนักช้อป แหล่งรวมสตรีทฟู้ดอร่อยและสินค้าราคาประหยัดฝั่งธนฯ",
        recommendedItem: "หมูทอดวังหลัง & อรทัยซูชิ"
    },

    // --- Chinatown (Yaowarat) ---
    {
        id: 'lb-tk-seafood',
        name: "T&K Seafood (เสื้อเขียว)",
        type: 'food',
        coords: "13.7408, 100.5097",
        description: "ร้านอาหารทะเลเยาวราชในตำนาน บรรยากาศสตรีทฟู้ดแท้ๆ รสชาติจัดจ้าน",
        recommendedItem: "กุ้งแม่น้ำเผา (Grilled Prawns)"
    },
    {
        id: 'lb-guay-jub-ouan',
        name: "ก๋วยจั๊บอ้วนโภชนา (หน้าโรงหนัง)",
        type: 'food',
        coords: "13.7405, 100.5095",
        description: "ก๋วยจั๊บน้ำใสในตำนาน เผ็ดร้อนพริกไทย การันตีความอร่อยด้วย Michelin Bib Gourmand",
        recommendedItem: "ก๋วยจั๊บน้ำใส (Crispy Pork Soup)"
    },
    {
        id: 'lb-yaowarat-toast',
        name: "ขนมปังเจ้าอร่อยเด็ดเยาวราช",
        type: 'food',
        coords: "13.7410, 100.5085",
        description: "ขนมปังปิ้งไส้ทะลักในตำนาน คิวยาวตลอดคืน กรอบนอกนุ่มใน",
        recommendedItem: "ขนมปังราดสังขยาใบเตย"
    },

    // --- Siam / Shopping Area ---
    {
        id: 'lb-mango-tango',
        name: "Mango Tango",
        type: 'drink',
        coords: "13.7448, 100.5349",
        description: "คาเฟ่มะม่วงสไตล์โมเดิร์นใจกลางสยาม เมนูมะม่วงสร้างสรรค์หลากหลาย",
        recommendedItem: "สมูทตี้มะม่วง (Mango Smoothie)"
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
