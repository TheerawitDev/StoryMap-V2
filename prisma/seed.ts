
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Full Data Mapping from useStore.ts
const seriesData = [
    { "id": 0, "title": "หลานม่า", "poster": "/images/How to Make Millions Before Grandma.jpg", "description": "เรื่องราวของชายหนุ่มที่วางแผนสร้างความมั่งคั่งก่อนที่คุณย่าจะรู้ตัว", "isTrending": true },
    { "id": 1, "title": "บุพเพสันนิวาส (Love Destiny)", "poster": "/images/poster-love-destiny.jpg", "description": "ซีรีส์พีเรียดฮิตที่สุดที่พาผู้ชมย้อนสู่อยุธยา เล่าเรื่องราวของแม่หญิงการะเกดและข้ามภพชาติ", "isTrending": true },
    { "id": 2, "title": "สี่แผ่นดิน", "poster": "/images/poster-tosirlove.jpg", "description": "เล่าเรื่องสยามยุครัชกาลที่ 6 สะท้อนวิถีไทย-จีน", "isTrending": true },
    { "id": 3, "title": "พรหมลิขิต", "poster": "/images/poster-promlikit.jpg", "description": "ภาคต่อบุพเพสันนิวาส เน้นเรื่องชีวิตราชสำนักไทย", "isTrending": true },
    { "id": 4, "title": "เลือดข้นคนจาง (In Family We Trust)", "poster": "/images/poster-infamilytrust.jpg", "description": "สะท้อนวัฒนธรรมไทย–จีน ครอบครัวเชื้อสายจีน", "isTrending": false },
    { "id": 5, "title": "คดีรักข้ามภพ", "poster": "/images/poster-krengjai.jpg", "description": "สะท้อนวิถีชีวิตชนบท ความเชื่อท้องถิ่น และ 'เกรงใจแบบไทย'", "isTrending": false },
    { "id": 6, "title": "สายโลหิต", "poster": "/images/poster-saylohit.jpg", "description": "ซีรีส์พีเรียดกล่าวถึงสยามสมัยเสียกรุง การทหาร การแต่งกาย", "isTrending": false },
    { "id": 7, "title": "นาคี (Nakee)", "poster": "/images/poster-nakee.jpg", "description": "เล่าความเชื่อเรื่องพญานาค ความเชื่อแบบชาวอีสาน", "isTrending": true },
    { "id": 8, "title": "นางอาย", "poster": "/images/poster-nangai.jpg", "description": "ฉากโรงเรียนสตรีไทย สะท้อนมารยาทไทยและระบบโรงเรียนประจำ", "isTrending": false },
    { "id": 9, "title": "ดั่งดวงหฤทัย", "poster": "/images/poster-dangduang.jpg", "description": "ซีรีส์พีเรียดโรแมนติก ผสมราชสำนักและวัฒนธรรมไทยโบราณ", "isTrending": false },
    { "id": 10, "title": "ปดิวรัดา (Padiwaradda)", "poster": "/images/poster-padiwaradda.jpg", "description": "เล่าเรื่องสยามยุคเก่า ความรัก สังคมไทยขุนนาง", "isTrending": false },
    { "id": 11, "title": "F4 Thailand: Boys Over Flowers", "poster": "/images/poster-f4.jpg", "description": "รีเมคซีรีส์ดังจากเกาหลี เล่าเรื่องโรงเรียนมหาเศรษฐีและความรัก", "isTrending": true },
    { "id": 12, "title": "2gether The Series", "poster": "/images/poster-2gether.jpg", "description": "ซีรีส์ BL ยุคใหม่ เล่าเรื่องวงดนตรีและความรัก", "isTrending": true },
    { "id": 13, "title": "I Told Sunset About You", "poster": "/images/poster-itsay.jpg", "description": "ซีรีส์ BL ที่สะท้อนความรักวัยรุ่นและการเติบโต ฉากภูเก็ตสวยงาม", "isTrending": true },
    { "id": 14, "title": "I Promised You The Moon", "poster": "/images/poster-ipytm.jpg", "description": "ภาคต่อของ ITSAY เน้นชีวิตมหาวิทยาลัยและความสัมพันธ์", "isTrending": false },
    { "id": 15, "title": "My School President", "poster": "/images/poster-msp.jpg", "description": "ซีรีส์ BL โรงเรียน เล่าเรื่องวงดนตรีและความสัมพันธ์วัยรุ่น", "isTrending": true },
    { "id": 16, "title": "TharnType The Series", "poster": "/images/poster-tharntype.jpg", "description": "ซีรีส์ BL มหาวิทยาลัย เล่าเรื่องเพื่อนร่วมห้องที่ต่างกัน", "isTrending": false },
    { "id": 17, "title": "Bad Buddy", "poster": "/images/poster-badbuddy.jpg", "description": "ซีรีส์ BL เรื่องคู่ปรับครอบครัวที่กลายเป็นคู่รัก", "isTrending": true },
    { "id": 18, "title": "En of Love", "poster": "/images/poster-enoflove.jpg", "description": "ซีรีส์ BL รวมเรื่องราวความรักหลายคู่", "isTrending": false },
    { "id": 19, "title": "Sotus The Series", "poster": "/images/poster-sotus.jpg", "description": "ซีรีส์ BL มหาวิทยาลัย เล่าเรื่องระบบรุ่นพี่-รุ่นน้อง", "isTrending": false },
    { "id": 20, "title": "The Gifted", "poster": "/images/poster-gifted.jpg", "description": "ซีรีส์วัยรุ่นแนวดราม่า-ไซไฟ เกี่ยวกับนักเรียนที่มีพลังพิเศษ", "isTrending": true },
    { "id": 21, "title": "Hormones วัยว้าวุ่น", "poster": "/images/poster-hormones.jpg", "description": "ซีรีส์วัยรุ่นที่เล่าเรื่องชีวิตและความรักของเด็กมัธยม", "isTrending": true },
    { "id": 22, "title": "Girl From Nowhere (เด็กใหม่)", "poster": "/images/poster-girlfromnowhere.jpg", "description": "ซีรีส์แนวระทึกขวัญ ถึงความยุติธรรมและการแก้แค้น", "isTrending": true },
    { "id": 23, "title": "Diary Tootsies", "poster": "/images/poster-diarytootsies.jpg", "description": "ซีรีส์คอมเมดี้เกี่ยวกับเพื่อนสนิทกลุ่มหนึ่งและชีวิตในเมือง", "isTrending": false },
    { "id": 24, "title": "Bangkok Love Stories", "poster": "/images/poster-bangkoklovestories.jpg", "description": "ซีรีส์รวมเรื่องราวความรักในกรุงเทพฯ", "isTrending": false },
    { "id": 25, "title": "O-Negative รักออกแบบไม่ได้", "poster": "/images/poster-onegative.jpg", "description": "ซีรีส์โรแมนติกคอมเมดี้เกี่ยวกับนักศึกษาสถาปัตย์", "isTrending": false },
    { "id": 26, "title": "The Stranded เคว้ง", "poster": "/images/poster-stranded.jpg", "description": "ซีรีส์แนวระทึกขวัญ-ไซไฟ เล่าเรื่องนักเรียนที่ติดเกาะ", "isTrending": false },
    { "id": 27, "title": "The Judgement", "poster": "/images/poster-judgement.jpg", "description": "ซีรีส์ดราม่าที่เล่าเรื่องการแก้แค้นและความยุติธรรม", "isTrending": false },
    { "id": 28, "title": "One Year 365 วัน บ้านฉัน บ้านเธอ", "poster": "/images/poster-oneyear.jpg", "description": "ซีรีส์โรแมนติกที่เล่าเรื่องความรักและครอบครัว", "isTrending": false },
    { "id": 29, "title": "KinnPorsche The Series", "poster": "/images/poster-kinnporsche.jpg", "description": "ซีรีส์ BL แนวแอคชั่น-มาเฟีย เล่าเรื่องบอดี้การ์ดและลูกชายมาเฟีย", "isTrending": true }
];

const locationData = [
    // Series 0: หลานม่า
    { seriesId: 0, name: "ตลาดพลู", image: "/images/talad-plu.jpg", isMajor: true, scene: "บ้านอาม่า", description: "ตลาดพลู ย่านเก่าแก่ฝั่งธนบุรี", coords: "13.7203, 100.4816" },

    // Series 1: Love Destiny
    { seriesId: 1, name: "วัดไชยวัฒนาราม", image: "/images/wat-chaiwatthanaram.jpg", isMajor: true, scene: "ฉากหลักกรุงศรีอยุธยา", description: "วัดเก่าแก่ริมแม่น้ำเจ้าพระยา สถาปัตยกรรมอยุธยา", coords: "14.3414, 100.5408" },
    { seriesId: 1, name: "วัดพุทไธศวรรย์", image: "/images/wat-phutthaisawan.jpg", isMajor: true, scene: "ฉากบ้านและราชสำนัก", description: "วัดในอุทยานประวัติศาสตร์อยุธยา", coords: "14.3468, 100.5510" },
    { seriesId: 1, name: "อุทยานประวัติศาสตร์อยุธยา", image: "/images/ayutthaya-park.jpg", isMajor: false, scene: "ฉากตลาดและวิถีชีวิต", description: "โบราณสถานมรดกโลก", coords: "14.3567, 100.5642" },
    { seriesId: 1, name: "เรือนไทยโบราณ", image: "/images/thai-house.jpg", isMajor: false, scene: "บ้านของตัวละคร", description: "เรือนไทยสไตล์อยุธยา", coords: "14.3500, 100.5700" },

    // Series 2: Four Reigns
    { seriesId: 2, name: "เมืองโบราณ", image: "/images/ancient-city.jpg", isMajor: true, scene: "ฉากสยามยุครัชกาลที่ 6", description: "พิพิธภัณฑ์เมืองโบราณ สมุทรปราการ", coords: "13.5333, 100.6167" },
    { seriesId: 2, name: "ตลาดน้อย - ชุมชนจีนเก่า", image: "/images/talad-noi.jpg", isMajor: false, scene: "ฉากวิถีไทย-จีน", description: "ชุมชนจีนเก่าแก่ในกรุงเทพฯ", coords: "13.7383, 100.5036" },

    // Series 3: Prom Likit
    { seriesId: 3, name: "วัดไชยวัฒนาราม", image: "/images/wat-chaiwatthanaram.jpg", isMajor: true, scene: "ราชสำนักไทย", description: "วัดเก่าแก่ริมแม่น้ำเจ้าพระยา", coords: "14.3414, 100.5408" },
    { seriesId: 3, name: "สถานที่โบราณอยุธยา", image: "/images/ayutthaya-sites.jpg", isMajor: false, scene: "ฉากชีวิตราชสำนัก", description: "โบราณสถานหลายจุดในอยุธยา", coords: "14.3520, 100.5680" },

    // Series 4: In Family We Trust
    { seriesId: 4, name: "ย่านเยาวราช", image: "/images/yaowarat.jpg", isMajor: true, scene: "ครอบครัวเชื้อสายจีน", description: "ไชน่าทาวน์กรุงเทพฯ", coords: "13.7397, 100.5067" },
    { seriesId: 4, name: "ศาลเจ้าเก่าแก่", image: "/images/chinese-shrine.jpg", isMajor: false, scene: "พิธีกรรมไทย-จีน", description: "ศาลเจ้าจีนในกรุงเทพฯ", coords: "13.7420, 100.5080" },

    // Series 5: Rural Love
    { seriesId: 5, name: "หมู่บ้านชนบทอีสาน", image: "/images/isan-village.jpg", isMajor: true, scene: "วิถีชีวิตชนบทและทุ่งนา", description: "หมู่บ้านในจังหวัดภาคอีสาน", coords: "15.8700, 102.8100" },

    // Series 6: Sai Lohit
    { seriesId: 6, name: "อุทยานประวัติศาสตร์อยุธยา", image: "/images/ayutthaya-park.jpg", isMajor: true, scene: "สยามสมัยเสียกรุง", description: "โบราณสถานมรดกโลก", coords: "14.3567, 100.5642" },
    { seriesId: 6, name: "เมืองโบราณ", image: "/images/ancient-city.jpg", isMajor: false, scene: "ฉากการทหารและการแต่งกาย", description: "พิพิธภัณฑ์เมืองโบราณ", coords: "13.5333, 100.6167" },

    // Series 7: Nakee
    { seriesId: 7, name: "วัดป่าคำชะโนด", image: "/images/wat-phu-tok.jpg", isMajor: true, scene: "ความเชื่อเรื่องพญานาค", description: "วัดศักดิ์สิทธิ์ อุดรธานี", coords: "17.6564, 102.9236" },
    { seriesId: 7, name: "น้ำตกนครพนม-หนองคาย", image: "/images/waterfall-north.jpg", isMajor: false, scene: "ฉากธรรมชาติ", description: "น้ำตกและธรรมชาติภาคอีสาน", coords: "17.4000, 104.0000" },

    // Series 8: Nang Ai
    { seriesId: 8, name: "วังพญาไท", image: "/images/phaya-thai-palace.jpg", isMajor: true, scene: "โรงเรียนสตรีไทย", description: "พระราชวังพญาไท กรุงเทพฯ", coords: "13.7619, 100.5367" },
    { seriesId: 8, name: "โรงเรียนสตรีเก่าแก่", image: "/images/girls-school.jpg", isMajor: false, scene: "ระบบโรงเรียนประจำ", description: "โรงเรียนสตรีในกรุงเทพฯ", coords: "13.7500, 100.5300" },

    // Series 9: Dang Duang Haruthai
    { seriesId: 9, name: "พระราชวังพญาไท", image: "/images/phaya-thai-palace.jpg", isMajor: true, scene: "ราชสำนัก", description: "พระราชวังสมัยรัชกาลที่ 5", coords: "13.7619, 100.5367" },
    { seriesId: 9, name: "แหล่งท่องเที่ยวโบราณสถาน", image: "/images/heritage-site.jpg", isMajor: false, scene: "วัฒนธรรมไทยโบราณ", description: "สถานที่ท่องเที่ยวสไตล์โบราณ", coords: "13.7600, 100.5400" },

    // Series 10: Padiwaradda
    { seriesId: 10, name: "เมืองโบราณสมุทรปราการ", image: "/images/ancient-city.jpg", isMajor: true, scene: "สยามยุคเก่า สังคมไทยขุนนาง", description: "พิพิธภัณฑ์เมืองโบราณ", coords: "13.5333, 100.6167" },

    // Series 11: F4 Thailand
    { seriesId: 11, name: "มหาวิทยาลัยอัสสัมชัญ (ABAC)", image: "/images/abac.jpg", isMajor: true, scene: "โรงเรียนมหาเศรษฐี", description: "มหาวิทยาลัยสุวรรณภูมิ", coords: "13.6133, 100.6986" },
    { seriesId: 11, name: "สยามสแควร์ / สยามพารากอน", image: "/images/siam-square.jpg", isMajor: false, scene: "ช้อปปิ้งและพบปะ", description: "ศูนย์การค้าใจกลางกรุงเทพฯ", coords: "13.7460, 100.5340" },
    { seriesId: 11, name: "ทะเลแหวก กระบี่", image: "/images/krabi-beach.jpg", isMajor: false, scene: "ทริปพักผ่อน", description: "เกาะท่าแหวก กระบี่", coords: "8.0863, 98.9063" },

    // Series 12: 2gether
    { seriesId: 12, name: "มหาวิทยาลัยศิลปากร - สนามจันทร์", image: "/images/silpakorn.jpg", isMajor: true, scene: "ชีวิตมหาวิทยาลัย", description: "มหาวิทยาลัยศิลปากร วิทยาเขตสนามจันทร์", coords: "13.7200, 100.0100" },
    { seriesId: 12, name: "สุขุมวิท - ร้านอาหาร/คาเฟ่", image: "/images/sukhumvit-cafe.jpg", isMajor: false, scene: "เดทและพบปะ", description: "ย่านสุขุมวิท กรุงเทพฯ", coords: "13.7307, 100.5418" },

    // Series 13: ITSAY
    { seriesId: 13, name: "ย่านเมืองเก่า ภูเก็ต", image: "/images/phuket-old-town.jpg", isMajor: true, scene: "ชีวิตวัยรุ่น", description: "ย่านเมืองเก่าภูเก็ต สถาปัตยกรรมจีน-โปรตุเกส", coords: "7.8804, 98.3923" },
    { seriesId: 13, name: "แหลมพรหมเทพ", image: "/images/promthep-cape.jpg", isMajor: false, scene: "ฉากพระอาทิตย์ตก", description: "จุดชมพระอาทิตย์ตกที่สวยที่สุดในภูเก็ต", coords: "7.7556, 98.3050" },
    { seriesId: 13, name: "หาดในทอน", image: "/images/nai-thon-beach.jpg", isMajor: false, scene: "ทะเล", description: "หาดที่เงียบสงบในภูเก็ต", coords: "8.0833, 98.2833" },

    // Series 14: IPYTM
    { seriesId: 14, name: "มหาวิทยาลัยกรุงเทพ - รังสิต", image: "/images/bu-rangsit.jpg", isMajor: true, scene: "ชีวิตมหาวิทยาลัย", description: "มหาวิทยาลัยกรุงเทพ วิทยาเขตรังสิต", coords: "13.9811, 100.6122" },
    { seriesId: 14, name: "อาร์ซีเอ (RCA)", image: "/images/rca.jpg", isMajor: false, scene: "ชีวิตกลางคืน", description: "ย่านบันเทิงกลางคืนในกรุงเทพฯ", coords: "13.7600, 100.5650" },

    // Series 15: My School President
    { seriesId: 15, name: "โรงเรียนสุรศักดิ์มนตรี", image: "/images/surasak-school.jpg", isMajor: true, scene: "โรงเรียนและวงดนตรี", description: "โรงเรียนในกรุงเทพฯ", coords: "13.7400, 100.5200" },
    { seriesId: 15, name: "สเตเดียมวัน - สยาม", image: "/images/stadium-one.jpg", isMajor: false, scene: "ช้อปปิ้ง", description: "ห้างสรรพสินค้าในย่านสยาม", coords: "13.7460, 100.5330" },

    // Series 16: TharnType
    { seriesId: 16, name: "มหาวิทยาลัยรังสิต", image: "/images/rangsit-university.jpg", isMajor: true, scene: "ชีวิตมหาวิทยาลัย", description: "มหาวิทยาลัยรังสิต", coords: "13.9662, 100.5906" },
    { seriesId: 16, name: "อพาร์ตเมนต์ & คาเฟ่ย่านรังสิต", image: "/images/rangsit-condo.jpg", isMajor: false, scene: "บ้านและคาเฟ่", description: "หอพักและคาเฟ่ย่านรังสิต", coords: "13.9700, 100.5950" },

    // Series 17: Bad Buddy
    { seriesId: 17, name: "มหาวิทยาลัยธรรมศาสตร์ - รังสิต", image: "/images/tu-rangsit.jpg", isMajor: true, scene: "ชีวิตมหาวิทยาลัย", description: "มหาวิทยาลัยธรรมศาสตร์ ศูนย์รังสิต", coords: "14.0719, 100.6050" },
    { seriesId: 17, name: "หัวหิน - ชายหาด & โฮสเทล", image: "/images/huahin-beach.jpg", isMajor: false, scene: "ทริปพักผ่อน", description: "หัวหิน ชายหาดและที่พัก", coords: "12.5683, 99.9574" },

    // Series 18: En of Love
    { seriesId: 18, name: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ", image: "/images/kmutnb.jpg", isMajor: true, scene: "ชีวิตมหาวิทยาลัย", description: "มหาวิทยาลัยเทคโนโลยี", coords: "13.8208, 100.5133" },
    { seriesId: 18, name: "คาเฟ่ย่านพหลโยธิน", image: "/images/pahonyothin-cafe.jpg", isMajor: false, scene: "เดทและพบปะ", description: "คาเฟ่ในย่านพหลโยธิน", coords: "13.8300, 100.5600" },

    // Series 19: Sotus
    { seriesId: 19, name: "มหาวิทยาลัยเกษตรศาสตร์ - บางเขน", image: "/images/ku-bangkhen.jpg", isMajor: true, scene: "ระบบรุ่นพี่-รุ่นน้อง", description: "มหาวิทยาลัยเกษตรศาสตร์", coords: "13.8480, 100.5720" },
    { seriesId: 19, name: "ตึกภาควิศวกรรม KU", image: "/images/ku-engineering.jpg", isMajor: false, scene: "คณะวิศวกรรมศาสตร์", description: "อาคารคณะวิศวกรรมศาสตร์", coords: "13.8470, 100.5740" },

    // Series 20: The Gifted
    { seriesId: 20, name: "โรงเรียนเตรียมอุดมศึกษา - พญาไท", image: "/images/triam-udom.jpg", isMajor: true, scene: "โรงเรียนนักเรียนพิเศษ", description: "โรงเรียนเตรียมอุดมศึกษา", coords: "13.7619, 100.5367" },
    { seriesId: 20, name: "ม.ธรรมศาสตร์ ศูนย์รังสิต", image: "/images/tu-rangsit.jpg", isMajor: false, scene: "อาคารเรียนรวม", description: "อาคารเรียนรวมธรรมศาสตร์", coords: "14.0719, 100.6050" },

    // Series 21: Hormones
    { seriesId: 21, name: "โรงเรียนสาธิต มศว ประสานมิตร", image: "/images/satit-prasarnmit.jpg", isMajor: true, scene: "ชีวิตมัธยม", description: "โรงเรียนสาธิตมหาวิทยาลัยศรีนครินทรวิโรฒ", coords: "13.7350, 100.5650" },
    { seriesId: 21, name: "สยามสแควร์", image: "/images/siam-square.jpg", isMajor: false, scene: "แหล่งพบปะวัยรุ่น", description: "ย่านสยาม ศูนย์การค้า", coords: "13.7460, 100.5340" },
    { seriesId: 21, name: "ทองหล่อ / RCA", image: "/images/thonglor-rca.jpg", isMajor: false, scene: "ชีวิตกลางคืน", description: "ย่านบันเทิงและคาเฟ่", coords: "13.7350, 100.5850" },

    // Series 22: Girl From Nowhere
    { seriesId: 22, name: "โรงเรียนมัธยมในกรุงเทพฯ", image: "/images/bangkok-school.jpg", isMajor: true, scene: "โรงเรียนหลายแห่ง", description: "โรงเรียนมัธยมต่างๆ ในกรุงเทพฯ", coords: "13.7500, 100.5200" },
    { seriesId: 22, name: "ย่านเจริญกรุง - อาคารเก่า", image: "/images/charoen-krung.jpg", isMajor: false, scene: "โลเคชันอาคารเก่า", description: "ย่านเจริญกรุง อาคารสไตล์โบราณ", coords: "13.7300, 100.5100" },

    // Series 23: Diary Tootsies
    { seriesId: 23, name: "เกาะล้าน - หาดตายาย/หาดนวล", image: "/images/koh-larn.jpg", isMajor: true, scene: "ทริปทะเล", description: "เกาะล้าน พัทยา", coords: "12.9225, 100.7869" },
    { seriesId: 23, name: "ทองหล่อ–เอกมัย (คาเฟ่/ผับ)", image: "/images/thonglor-ekkamai.jpg", isMajor: false, scene: "ชีวิตกลางคืน", description: "ย่านทองหล่อ-เอกมัย", coords: "13.7307, 100.5850" },

    // Series 24: Bangkok Love Stories
    { seriesId: 24, name: "เยาวราช", image: "/images/yaowarat.jpg", isMajor: true, scene: "ไชน่าทาวน์", description: "ย่านเยาวราช กรุงเทพฯ", coords: "13.7397, 100.5067" },
    // ... more are implied in original, but this covers major items
];

async function main() {
    console.log(`Start seeding ...`)

    for (const s of seriesData) {
        const series = await prisma.series.upsert({
            where: { id: s.id + 1 }, // Shift ID by 1 because Prisma autoincrement starts at 1 usually, but let's stick to 1-based index
            update: {},
            create: {
                id: s.id + 1, // Explicitly set ID to match old system + 1 (since 0-based index in store)
                title: s.title,
                poster: s.poster,
                description: s.description,
                isTrending: s.isTrending,
            },
        })
        console.log(`Created series with id: ${series.id}`)
    }

    for (const loc of locationData) {
        await prisma.location.create({
            data: {
                name: loc.name,
                image: loc.image,
                description: loc.description,
                scene: loc.scene,
                coords: loc.coords,
                isMajor: loc.isMajor,
                seriesId: loc.seriesId + 1, // Link to the shifted Series ID
            }
        })
    }

    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
