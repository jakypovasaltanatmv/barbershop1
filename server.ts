import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '1mb' }));

interface BookingRecord {
  id: string;
  name: string;
  phone: string;
  serviceId: string;
  barberId: string;
  branchId: string;
  date: string;
  time: string;
  notes?: string;
  createdAt: string;
}

const bookings: BookingRecord[] = [];

const SYSTEM_INSTRUCTION = `You are the AI Grooming Concierge for KARA Barbershop in Bishkek, Kyrgyzstan.
Always respond politely, concisely, and helpfully in the user's language (Kyrgyz, Russian, or English).
If the user writes in Kyrgyz (кыргызча), answer in natural Kyrgyz. If in Russian, answer in natural Russian. If in English, answer in English. If unclear, match the UI language hint provided.

Barbershop details:
- Name: KARA Barbershop
- Branches in Bishkek:
  1. Center Branch (Борбордук филиал / Центральный филиал): Chuy Avenue 128, Bishkek (Чүй пр., 128). Daily 09:00–22:00. Phone: +996 555 880 128.
  2. South Branch (Түштүк филиал / Южный филиал): Manas Avenue 44, Bishkek (Манас пр., 44). Daily 10:00–22:00. Phone: +996 555 880 044.
- Services & Prices (in KGS / сом):
  1. Signature Haircut (Фирмалык чач кырктыруу / Фирменная стрижка) — 1 200 сом · 45 мин
  2. Skin Fade & Precision Trim (Скин-фейд / Скин-фейд и окантовка) — 1 000 сом · 40 мин
  3. Hot Towel Straight Razor Shave (Ысык сүлгү менен сакал кыруу / Королевское бритьё) — 900 сом · 35 мин
  4. Beard Sculpting & Oil Care (Сакал формалоо / Моделирование бороды) — 800 сом · 30 мин
  5. KARA Full Ritual (Haircut + Beard + Steam Facial) (Толук комплекс / Полный комплекс KARA) — 1 900 сом · 75 мин
  6. Father & Son Package (Ата жана уул / Отец и сын) — 1 800 сом · 70 мин
- Master Barbers:
  - Улугбек Асанов (Ulugbek Asanov) — Founder & Senior Master, 12 years experience, classic scissor cuts & executive styling.
  - Дмитрий Волков (Dmitry Volkov) — Master Barber & Beard Architect, 9 years experience, skin fades & straight razor rituals.
  - Азамат Токтогулов (Azamat Toktogulov) — Senior Stylist, 7 years experience, modern textured crops & fades.
  - Эрлан Бекмуратов (Erlan Bekmuratov) — Barber & Grooming Specialist, 5 years experience, sharp fades & beard care.

Guidelines:
- Give tailored hairstyle advice based on face shape, hair texture, or maintenance preferences.
- Help guests choose the right service, master barber, and branch.
- Remind them they can confirm their exact slot using the Booking Form on the page or by calling +996 555 880 128.
- Never invent fake booking confirmations inside chat; instruct them to use the booking form for final confirmation.`;

app.post('/api/chat', async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.status(500).json({
        error: 'GEMINI_API_KEY is not configured on the server.',
      });
      return;
    }

    const { messages, language } = req.body as {
      messages?: Array<{ role: 'user' | 'model'; text: string }>;
      language?: 'ky' | 'ru' | 'en';
    };

    if (!Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: 'Messages array is required.' });
      return;
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const langHint =
      language === 'ky'
        ? 'Preferred UI language: Kyrgyz (кыргызча).'
        : language === 'ru'
          ? 'Preferred UI language: Russian (русский).'
          : 'Preferred UI language: English.';

    const contents = messages.map((m) => ({
      role: m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.text }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents,
      config: {
        systemInstruction: `${SYSTEM_INSTRUCTION}\n${langHint}`,
      },
    });

    const reply = response.text?.trim();
    if (!reply) {
      res.status(502).json({ error: 'Empty response from AI service.' });
      return;
    }

    res.json({ reply });
  } catch (err: unknown) {
    console.error('Gemini chat error:', err);
    const message =
      err instanceof Error ? err.message : 'Failed to process chat request.';
    res.status(500).json({ error: message });
  }
});

app.get('/api/bookings', (_req, res) => {
  res.json({ bookings });
});

app.post('/api/bookings', (req, res) => {
  const { name, phone, serviceId, barberId, branchId, date, time, notes } =
    req.body as Partial<BookingRecord>;

  if (!name || !phone || !serviceId || !barberId || !branchId || !date || !time) {
    res.status(400).json({ error: 'Missing required booking fields.' });
    return;
  }

  const booking: BookingRecord = {
    id: `KR-${Math.floor(100000 + Math.random() * 900000)}`,
    name: String(name).trim(),
    phone: String(phone).trim(),
    serviceId: String(serviceId),
    barberId: String(barberId),
    branchId: String(branchId),
    date: String(date),
    time: String(time),
    notes: notes ? String(notes).trim() : undefined,
    createdAt: new Date().toISOString(),
  };

  bookings.push(booking);
  res.status(201).json({ booking });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`KARA Barbershop server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
