# Skolyoga Webbapplikation

En modern, snabb och frikopplad webbapplikation för **Skolyoga**, byggd med **Next.js 14**, **Tailwind CSS**, **TypeScript** och förberedd för **Supabase (PostgreSQL + Auth)**.

Ersätter den tidigare WordPress- och Avada-installationen med en ren, versionshanterad kodbas och full kontroll över klassrumsövningar, användarkonton och data.

---

## 🌟 Nyckelfunktioner

1. **Blixtsnabbt Kunskapsbibliotek (125 övningar)**:
   - Direktfiltrering på **Kategori** (*Stresshantering, Studieteknik, Trygghet, Fokus, För skolpersonal*).
   - Filtrering på **Årskurs** (*Förskola* till *Gymnasiet*), **Längd** (*1 min, 3 min, 5 min, 10 min*) och **Anpassning** (*Sittande, NPF, Anpassad skola, Stress & oro*).
   - Inbyggd, distraktionsfri videospelare med klassrumstips för lärare.

2. **Användarkonton & Användardata**:
   - Skol- och lärarkonton med rollbaserad behörighet.
   - **Mina favoriter**: Spara snabbgenvägar till övningar med 1 klick.
   - **Spellistor**: Skapa anpassade pass för morgonsamlingar eller efter rasten.
   - GDPR-säker databasstruktur med PostgreSQL Row Level Security (RLS) i EU (Frankfurt).

3. **Modern, lugn design**:
   - Skolyogas varma färgpalett (terracotta, salviagrön/teal, varm sand).
   - Mobil- och projektoranpassat gränssnitt för lektionssalar.

4. **Versionshantering & CI/CD**:
   - Versionshanterat i Git / GitHub.
   - Automatisk driftsättning vid varje commit via Vercel.

---

## 🚀 Kom igång lokalt

1. **Klona repot och installera beroenden**:
   ```bash
   git clone <ditt-github-repo>
   cd Skolyoga_hemsida
   npm install
   ```

2. **Starta utvecklingsservern**:
   ```bash
   npm run dev
   ```
   Öppna [http://localhost:3000](http://localhost:3000) i din webbläsare.

3. **Bygg för produktion**:
   ```bash
   npm run build
   npm run start
   ```

---

## 📁 Projektstruktur

```
├── scripts/
│   └── extract_wp_data.py       # Extraherar övningar och sidor från WordPress XML
├── src/
│   ├── app/                     # Next.js App Router sidor
│   │   ├── kunskapsbiblioteket/ # 125 övningar med sök & filter
│   │   ├── mina-favoriter/      # Lärarens personliga arbetsyta
│   │   ├── utbildningar/        # 100h utbildning & workshops
│   │   ├── om-skolyoga/         # Vision, metod & kontakt
│   │   └── logga-in/            # Skol- & lärarinloggning
│   ├── components/              # Återanvändbara UI-komponenter
│   ├── context/                 # Auth & Favorites state context
│   ├── data/                    # Strukturerad JSON-data (exercises.json)
│   ├── lib/                     # Hjälpfunktioner & databas-queries
│   └── types/                   # TypeScript-definitioner
└── supabase/
    └── schema.sql               # PostgreSQL databasschema med RLS
```
