TASK BREAKDOWN — Business Growth Audit Web App

EPIC 0 — Product Setup & Architecture

Loyihani boshlang‘ich sozlash va arxitektura tayyorlash

Next.js (App Router) asosida loyiha yaratish
TypeScript ni yoqish va sozlash
Tailwind CSS va ShadCN UI ni o‘rnatish
ESLint va Prettier sozlash
Git repozitoriy yaratish

Acceptance:

Local development muhiti ishlaydi
/app, /components, /lib strukturasi toza

Muhit o‘zgaruvchilari va tashqi xizmatlar konfiguratsiyasi

.env fayl strukturasi
Supabase API kalitlarini ulash
Telegram Bot tokenini sozlash
Reklama platformalari uchun CPL konstantalarini belgilash

EPIC 1 — UX FLOW & WIREFRAME LOGIC

Foydalanuvchi oqimini to‘liq aniqlash va cheklovlarini belgilash

Landing sahifadan Quiz sahifaga o‘tish
Quiz → Lead Gate → Dashboard ketma-ketligi
Back tugmasi faqat ruxsat etilgan joylarda ishlashi

Acceptance:

Foydalanuvchi bosqichlarni sakrab o‘ta olmaydi

Quiz davomiyligi uchun progress bar va avtomatik o‘tish logikasini yaratish

Savollarga javob berilgach avtomatik keyingi savolga o‘tish
Progress foiz ko‘rinishida yangilanib boradi

EPIC 2 — LANDING PAGE (Onboarding)

Landing sahifaning dizayni va strukturasini yaratish

Asosiy sarlavha (headline)
Qo‘shimcha izoh (sub-headline)
Asosiy chaqiruv tugmasi (CTA)
Mobile-first layout

Acceptance:

Sahifa bitta ekranga sig‘adi
CTA bosilganda Quiz boshlanadi

CTA bosilishi uchun kelajakda analitika ulash imkonini beruvchi hook qo‘shish

Event tracking uchun tayyor strukturani qo‘shish

EPIC 3 — QUIZ ENGINE (AUDIT CORE)

Audit savollari uchun yagona ma’lumot modeli yaratish

Savol identifikatori
Savol matni
Savol turi (boolean, select, input, slider)
Vazn koeffitsienti
Jarima flagi

Biznes asoslarini tekshiruvchi savollar blokini ishlab chiqish

Foydalanuvchi roli
CRM mavjudligi
Sotuv bo‘limi mavjudligi
Ijtimoiy tarmoqlar holati

Logic:

Boolean qiymatlar saqlanadi
Foundation score avtomatik hisoblanadi

Trafik va biznes kontekstini aniqlovchi savollar blokini yaratish

Biznes sohasi
Asosiy reklama platformasi
Platformaga mos CPL benchmarkni saqlash

Moliyaviy ko‘rsatkichlar uchun input blokini ishlab chiqish

Oylik daromad maqsadi
O‘rtacha chek
Sotuv konversiyasi foizi

Logic:

Konversiya bo‘sh bo‘lsa default qiymat qo‘yiladi
Nol yoki manfiy qiymatlar bloklanadi

EPIC 4 — CALCULATION ENGINE (AUDITOR LOGIC)

Asosiy moliyaviy formulalar uchun hisoblash modulini yaratish

Kerakli mijozlar sonini hisoblash
Kerakli lidlar sonini hisoblash
Ideal reklama byudjetini hisoblash

Tizimsizlik uchun jarima mexanizmini ishlab chiqish

CRM yo‘qligi uchun +20%
Sotuv bo‘limi yo‘qligi uchun +20%
Ijtimoiy ishonch pastligi uchun +10%

Acceptance:

Jarimalar qo‘shilib boradi
Natijada izoh bilan ko‘rsatiladi

Real byudjet va yo‘qotilayotgan pulni hisoblash

RealBudget hisoblash
WasteMoney aniqlash
Oylik yo‘qotish ko‘rsatish

Biznes o‘sish ssenariylarini hisoblash

1x o‘sish (tizimlashtirish orqali)
2x o‘sish (scale orqali)
ROI foizini chiqarish

EPIC 5 — LEAD GATE & DATA CAPTURE

Natija oldidan analiz animatsiyasini yaratish

3 soniyalik loader
“Ma’lumotlar tahlil qilinmoqda…” matni

Lead yig‘ish formasi yaratish

Ism maydoni
Telefon raqam maydoni (+998 mask)

Acceptance:

Majburiy validatsiya
To‘g‘ri kiritilmaguncha submit o‘chirilgan

Audit natijalari va foydalanuvchi ma’lumotlarini Supabase bazasiga yozish

Savollar javoblari
Hisoblangan metrikalar
Lead ma’lumotlari
Vaqt belgisi

Yangi lead kelganda Telegram orqali xabarnoma yuborish

Ism

Telefon
Daromad maqsadi
Yo‘qotilayotgan pul
Xavf darajasi

EPIC 6 — DASHBOARD (RESULT PAGE)

Xavf darajasini ko‘rsatuvchi vizual indikator yaratish

Past / O‘rtacha / Yuqori zonalar
Ranglar asosida

Asosiy moliyaviy ko‘rsatkichlarni vizual ko‘rsatish

Kerakli lidlar soni
Ideal byudjet
Real byudjet
Yo‘qotilayotgan pul (alohida ajratilgan)

1x va 2x o‘sish prognoz kartalarini yaratish

Hozirgi holat bilan farq
Aniq raqamlar bilan

Foydalanuvchiga moslashtirilgan harakatlar rejasini chiqarish

CRM yo‘q bo‘lsa → CRM qadam
Sotuv bo‘limi yo‘q bo‘lsa → Sotuv qadam
Ijtimoiy ishonch past bo‘lsa → Kontent qadam

Asosiy chaqiruv tugmasini qo‘shish

“Menga tizimni qurib bering”
Telegram yoki qo‘ng‘iroqqa yo‘naltirish

EPIC 7 — UI/UX POLISH

Loyiha rang tizimini yakuniy sozlash

Yashil — daromad
Qizil — yo‘qotish
To‘q ko‘k — ishonch

Shriftlar va spacingni mobil va desktop uchun optimallashtirish

Katta raqamlar o‘qilishi
Mobil qulaylik

Yumshoq va professional animatsiyalar qo‘shish

Raqamlar count-up
Gauge silliq harakati

EPIC 8 — PERFORMANCE & QUALITY

Ilova tezligini optimallashtirish

Lazy loading
Code splitting
Lighthouse audit

Xatoliklarni ushlash va fallback mexanizmlarini qo‘shish

Input xatolari
Hisoblash xatolari
Tarmoq uzilishi

EPIC 9 — DEPLOYMENT

Production muhitga joylash

Vercel deploy
Environment variables sozlash

To‘liq tizimni tekshirish (smoke test)

Foydalanuvchi to‘liq yo‘li
Telegramga lead kelishi
Supabase’da ma’lumot saqlanishi

EPIC 10 — OPTIONAL (SCALE READY)

Admin uchun leadlar jadvalini ko‘rish imkonini yaratish

Supabase table view
CSV eksport

PDF formatda audit hisobotini yaratish

Yuklab olish imkoniyati