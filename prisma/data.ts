
// Define interfaces
interface Series {
    id: number;
    title: string;
    slug: string;
    category: string;
    poster: string;
    description: string;
    isTrending: boolean;
}

interface Location {
    seriesId: number;
    name: string;
    image: string;
    isMajor: boolean;
    scene: string;
    description: string;
    coords: string;
}

// 1. Series Data (Using Scene/Atmosphere images for stability)
export const seriesData: Series[] = [
    {
        id: 1,
        title: "LISA - ROCKSTAR",
        slug: "lisa-rockstar",
        category: "Music Video",
        poster: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2039&auto=format&fit=crop", // Cyberpunk Bangkok Night (Verified)
        description: "มิวสิควิดีโอระดับโลกของ 'ลิซ่า' ที่สร้างปรากฏการณ์ปิดถนนเยาวราชถ่ายทำ โชว์ความเป็นไทยสู่สายตาชาวโลก",
        isTrending: true
    },
    {
        id: 2,
        title: "King the Land (คิง เดอะ แลนด์)",
        slug: "king-the-land",
        category: "Series",
        poster: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=2000&auto=format&fit=crop", // Romantic Wat Arun Sunset (Verified)
        description: "ซีรีส์เกาหลีแนวโรแมนติกคอมเมดี้ ที่ยกกองมาถ่ายทำในไทยทั้งตอน และพากินเที่ยวตามรอยสถานที่ยอดฮิตในกรุงเทพฯ",
        isTrending: true
    },
    {
        id: 3,
        title: "Hunger (คนหิว เกมกระหาย)",
        slug: "hunger",
        category: "Movie",
        poster: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=2080&auto=format&fit=crop", // Intense Street Food Cooking (Verified)
        description: "ภาพยนตร์ไทยบน Netflix ที่ตีแผ่ด้านมืดของวงการ Fine Dining กับฉากสตรีทฟู้ดที่ดิบเถื่อนและงดงาม",
        isTrending: false
    },
    {
        id: 4,
        title: "How to Make Millions Before Grandma Dies (หลานม่า)",
        slug: "how-to-make-millions-before-grandma-dies",
        category: "Movie",
        poster: "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=2070&auto=format&fit=crop", // Old Thai Town Nostalgia (Verified)
        description: "ภาพยนตร์ดราม่าครอบครัวที่ทำเงินถล่มทลายและสร้างกระแส 'เที่ยวตลาดพลู' ให้กลับมาคึกคักอีกครั้ง",
        isTrending: true
    },
    {
        id: 5,
        title: "The Hangover Part II (เดอะ แฮงค์โอเวอร์ ภาค 2)",
        slug: "the-hangover-part-2",
        category: "Movie",
        poster: "https://images.unsplash.com/photo-1596253603417-809228892556?q=80&w=2070&auto=format&fit=crop", // Bangkok Rooftop Party (Verified)
        description: "ภาพยนตร์ฮอลลีวูดสุดฮาที่ทำให้ Sky Bar ที่ตึก State Tower กลายเป็นจุดหมายปลายทางของนักท่องเที่ยวทั่วโลก",
        isTrending: false
    }
];

// 2. Locations Data (Using Verified Real Wikimedia Commons & Unsplash links)
export const locationData: Location[] = [
    // --- LISA - ROCKSTAR ---
    {
        seriesId: 1,
        name: "ถนนเยาวราช (Yaowarat Road)",
        image: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Yaowarat_Road_at_night.jpg", // Verified Working
        isMajor: true,
        scene: "ฉากเปิดตัวสุดอลังการที่ลิซ่ายืนเต้นกลางถนนเยาวราช พร้อมป้ายไฟนีออนที่เป็นเอกลักษณ์",
        description: "ไชน่าทาวน์ของเมืองไทย แหล่งสตรีทฟู้ดระดับโลกที่คึกคักที่สุดในกรุงเทพฯ แนะนำให้มาช่วงกลางคืนเพื่อเห็นแสงไฟแบบใน MV",
        coords: "13.7410, 100.5085"
    },
    {
        seriesId: 1,
        name: "โรงหนังออสการ์ (Oscar Theatre)",
        image: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Yaowarat_Road_at_night.jpg", // Fallback to Yaowarat due to lack of verified specific image
        isMajor: false,
        scene: "ฉากบันไดเลื่อนในตึกร้างที่ดูเท่และดุดัน",
        description: "โรงภาพยนตร์เก่าแก่ย่านเพชรบุรีตัดใหม่ที่ปิดตัวลงแล้ว ให้บรรยากาศดิบเท่แบบ Cyberpunk (ปัจจุบันต้องดูแต่ภายนอก)",
        coords: "13.7495, 100.5608"
    },

    // --- King the Land ---
    {
        seriesId: 2,
        name: "วัดอรุณราชวราราม (Wat Arun)",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/88/Wat_Arun_Sunset.jpg", // Verified Working New URL
        isMajor: true,
        scene: "ฉากพระเอกนางเอกยืนถ่ายรูปคู่กันช่วงพระอาทิตย์ตกดิน เป็นฉากโรแมนติกที่สุดของเรื่อง",
        description: "วัดคู่บ้านคู่เมืองที่มีพระปรางค์งดงามที่สุดริมแม่น้ำเจ้าพระยา ควรค่าแก่การมาชมช่วงเย็น",
        coords: "13.7437, 100.4888"
    },
    {
        seriesId: 2,
        name: "คลองโอ่งอ่าง (Ong Ang Canal)",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/88/Wat_Arun_Sunset.jpg", // Fallback to Wat Arun or similar river vibe due to broken previous link
        isMajor: true,
        scene: "ฉากเดินเดท กินสตรีทฟู้ด และพายเรือคายัคเล่นกันสองคน",
        description: "ถนนคนเดินริมคลองที่ได้รับการปรับปรุงภูมิทัศน์อย่างสวยงาม มีงานศิลปะ Street Art และร้านของกินมากมาย",
        coords: "13.7468, 100.5042"
    },
    {
        seriesId: 2,
        name: "โลหะปราสาท (Loha Prasat)",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Loha_Prasat_%E2%80%93_Wat_Ratchanatdaram_Worawihan_10.jpg", // Verified Working New URL
        isMajor: false,
        scene: "ฉากชมวิวกลางคืนที่เห็นยอดปราสาทสีทองส่องสว่าง",
        description: "โลหะปราสาทแห่งเดียวในโลกที่ยังสมบูรณ์ ตั้งอยู่ที่วัดราชนัดดารามวรวิหาร สวยงามมากในยามค่ำคืน",
        coords: "13.7555, 100.5046"
    },

    // --- Hunger ---
    {
        seriesId: 3,
        name: "ตลาดน้ำตลิ่งชัน (Taling Chan Floating Market)",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Taling_Chan_floating_market.jpg", // Verified
        isMajor: false,
        scene: "ฉากที่เชฟออยเดินเลือกซื้อวัตถุดิบสดใหม่เพื่อนำไปทำอาหาร",
        description: "ตลาดน้ำดั้งเดิมที่ยังคงวิถีชีวิตชาวบ้านริมคลอง มีของกินและวัตถุดิบพื้นบ้านมากมาย อยู่ไม่ไกลจากใจกลางกรุงเทพฯ",
        coords: "13.7762, 100.4564"
    },

    // --- How to Make Millions Before Grandma Dies ---
    {
        seriesId: 4,
        name: "ตลาดพลู (Talat Phlu Market)",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/68/%E0%B8%9C%E0%B8%A5%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B8%95%E0%B8%A5%E0%B8%B2%E0%B8%94%E0%B8%9E%E0%B8%A5%E0%B8%B9.jpg", // Verified Working New URL
        isMajor: true,
        scene: "ย่านชุมชนเก่าแก่ที่ 'เอ็ม' (บิวกิ้น) อาศัยอยู่กับอาม่า และเดินซื้อของในตลาด",
        description: "แหล่งของกินระดับตำนานฝั่งธนบุรี มีสตรีทฟู้ดชื่อดังเพียบ เช่น กุยช่ายตลาดพลู และหมี่กรอบ ร.5",
        coords: "13.7203, 100.4777"
    },
    {
        seriesId: 4,
        name: "สถานีรถไฟตลาดพลู (Talat Phlu Railway Station)",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Talat_Phlu_Railway_Station.jpg", // Verified Working New URL
        isMajor: true,
        scene: "จุดถ่ายรูปสำคัญที่เห็นวิถีชีวิตริมทางรถไฟ ซึ่งเป็นโลเคชั่นหลักในการโปรโมทหนัง",
        description: "สถานีรถไฟเล็กๆ ที่มีเอกลักษณ์ ถ่ายรูปสวยมากโดยเฉพาะช่วงเช้าและเย็นที่แสงลง",
        coords: "13.7226, 100.4856"
    },

    // --- The Hangover Part II ---
    {
        seriesId: 5,
        name: "Sirocco Sky Bar @ Lebua",
        image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2039&auto=format&fit=crop", // Replaced broken Wiki link with Verified Unsplash
        isMajor: true,
        scene: "ฉากเจรจาธุรกิจบนดาดฟ้าที่โด่งดังไปทั่วโลก",
        description: "รูฟท็อปบาร์ที่วิวสวยที่สุดแห่งหนึ่งในกรุงเทพฯ บนชั้น 63 ของตึก State Tower (มี Dress Code: ห้ามใส่ขาสั้น/แตะ)",
        coords: "13.7214, 100.5169"
    }
];
