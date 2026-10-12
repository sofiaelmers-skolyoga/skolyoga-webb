import { Program } from '@/types';

export const allPrograms: Program[] = [
  {
    id: 'yTk3wFhl1s011CoBYPpY', // Exact Firestore ID used by Skolyoga mobile app
    title: 'Hemmayoga',
    subtitle: 'Stresshantering för elever med hög skolfrånvaro',
    description:
      'Tack vare beviljade medel från Folkhälsomyndigheten kan Skolyoga erbjuda ett helt kostnadsfritt, digitalt 6-veckors program för stresshantering och nervsystemsreglering. Utformat för att sänka den inre stressen och skapa trygghet i vardagen utan prestationskrav.',
    durationWeeks: 6,
    icon: 'Sparkles',
    badge: 'Stresshantering',
    badges: ['Stresshantering'],
    tags: ['Stresshantering'],
    difficulty: 'Alla nivåer – Helt kravlöst',
    isActive: true,
    weeks: [
      {
        id: 'PzLjzMg89Tt3nuGMKAmi', // Firestore doc ID
        weekNumber: 1,
        title: 'Händerna som trygga punkter',
        exerciseName: 'Nama',
        classTitle: 'Händerna som trygga punkter',
        videoUrl: 'https://youtu.be/7Y3z8_4eZXg',
        classUrl: 'https://youtu.be/mc-83iVL60k',
        pdfUrl: '/documents/Vecka-1-handerna-som-trygga-punkter.pdf',
        description:
          'Känslor är ofta något som upplevs centralt i kroppen, i mage och bröstkorg. Genom att förflytta uppmärksamheten till händerna kan starka känslor i mitten av kroppen förminskas. Våra händer har många nervändar och upptar stor del av hjärnans kapacitet. Genom att massera dem eller trycka fingrarna mot varandra skickar vi omedelbara, lugnande signaler till hjärnan.',
        instructions: [
          'Genomför veckans övning i lugn miljö utan prestationskrav.',
          'Ladda ner materialet och använd händerna som trygga kontaktpunkter.',
          'Öva på att notera hur fokus på händerna lugnar kroppen när stress eller oro uppstår.',
        ],
        durationMinutes: 20,
      },
      {
        id: 'YwKszoBaaW38XCs0YEdI', // Firestore doc ID
        weekNumber: 2,
        title: 'Spänningar i kroppen',
        exerciseName: 'Krona',
        classTitle: 'Sympatiska spänningskedjan',
        videoUrl: 'https://youtu.be/nLqtOTwpcTo',
        classUrl: 'https://youtu.be/8eI_y8YiInM',
        pdfUrl: '/documents/Vecka-2-Spanningar-i-kroppen.pdf',
        description:
          'Vid stress och spänning aktiveras vissa delar av kroppen extra mycket, t.ex. nacke, axlar, höfter och käken. När vi känner oss stressade drar kroppen automatiskt upp axlarna mot öronen för att skydda oss. Genom att exempelvis medvetet röra på och mjuka upp nacke och axlar "lurar" vi hjärnan att förstå att faran är över, vilket minskar stressen i hela kroppen.',
        instructions: [
          'Genomför övningen i en bekväm sittande eller liggande ställning.',
          'Ladda ner arbetsmaterialet för vecka 2.',
          'Notera var spänningar sätter sig och mjuka upp axlar, nacke och käke.',
        ],
        durationMinutes: 22,
      },
      {
        id: 'T4Uwr1aZDnSRnYZaA4Al', // Firestore doc ID
        weekNumber: 3,
        title: 'Grunda ner i marken',
        exerciseName: 'Dunsa',
        classTitle: 'Grunda dig',
        videoUrl: 'https://youtu.be/H4JcO-IxrqA',
        classUrl: 'https://youtu.be/0gfmtzMDgPo',
        pdfUrl: '/documents/Vecka-3-grunda-nerat.pdf',
        description:
          'Att dunsa hälarna i golvet väcker kroppens känsla för var vi befinner oss i rummet. Detta hjälper nervsystemet att flytta fokus från snurriga tankar i huvudet, ner till den stadiga marken under oss.',
        instructions: [
          'Sätt ner båda fötterna plant mot golvet.',
          'Följ guidningen i videon och dunsa mjukt med hälarna.',
          'Känn hur underlaget ger stabilitet och trygghet.',
        ],
        durationMinutes: 20,
      },
      {
        id: 'UAlq2WvPWNpPmAMHr8hx', // Firestore doc ID
        weekNumber: 4,
        title: 'Aktivering som leder till avspänning',
        exerciseName: 'Provsekvensen',
        classTitle: 'Stresshantering genom rörelse',
        videoUrl: 'https://youtu.be/cftqApWIfS0',
        classUrl: 'https://youtu.be/8FYe9krkaSM',
        pdfUrl: '/documents/Vecka-4-aktivering-till-avspanning.pdf',
        description:
          'Ibland är kroppen för rastlös för att bara sitta still. Genom att först spänna våra stora muskelgrupper hårt och sedan släppa taget, hjälper vi musklerna att slappna av mycket djupare än innan. Det fungerar ungefär som en "reset"-knapp för kroppen.',
        instructions: [
          'Gör rörelserna i din egen takt och pausa när du vill.',
          'Spänn och slappna av i musklerna med medveten närvaro.',
          'Ladda ner materialet för vecka 4.',
        ],
        durationMinutes: 25,
      },
      {
        id: 'ZAQl1csyAftub00xBYhd', // Firestore doc ID
        weekNumber: 5,
        title: 'Lugn-och-ro-ljudet',
        exerciseName: 'Brahmari',
        classTitle: 'Vagusnerven',
        videoUrl: 'https://youtu.be/nLqtOTwpcTo',
        classUrl: 'https://youtu.be/u2OVptvbRc4',
        pdfUrl: '/documents/Vecka-5-lugn-och-ro-ljudet.pdf',
        description:
          'Vagusnerven är kroppens stora "lugn och ro"-nerv. När vi blundar och surrar som ett bi (Brahmari) skapar vi mjuka vibrationer i kroppen. Dessa vibrationer masserar vagusnerven från insidan och säger åt hjärnan att sänka pulsen och vila. Det fungerar oavsett om du tror på det eller inte – precis som att pulsen går upp av att springa, går pulsen ner av att humma.',
        instructions: [
          'Följ med i de enkla hummande andningsövningarna.',
          'Känn vibrationen i bröstkorgen och huvudet.',
          'Ladda ner materialet för vecka 5.',
        ],
        durationMinutes: 20,
      },
      {
        id: 'Q70yZ5GVzZec0cR3RnSs', // Firestore doc ID
        weekNumber: 6,
        title: 'Andetaget',
        exerciseName: 'Andas i en fyrkant',
        classTitle: 'Förbered för att andas',
        videoUrl: 'https://youtu.be/zQVfD0TJKQo',
        classUrl: 'https://youtu.be/AGyjA0eaExY',
        pdfUrl: '/documents/Vecka-6-andas-i-en-fyrkant.pdf',
        description:
          'Nervsystemet är som kroppens styrcentral. Andetaget är något som både sker automatiskt men som du också kan förändra med din vilja. Ett långsamt och djupt andetag skickar signaler till hjärnan att det är tryggt där du är. Genom att andas i ett jämnt mönster, som längs linjerna på en fyrkant, ger vi en omedelbar och tydlig signal till hjärnan att allt är lugnt och tryggt.',
        instructions: [
          'Gör det avslutande passet och andas längs fyrkanten.',
          'Ladda ner ditt diplom och reflektionsmaterialet.',
          'Fira din insats efter att ha genomfört hela programmet!',
        ],
        durationMinutes: 25,
      },
    ],
  },
  {
    id: 'trygghet',
    title: 'Trygghet',
    subtitle: 'Stärk din självkänsla och skapa en inre trygg zon',
    description:
      'Ett fördjupande 6-veckors program inriktat på självkänsla, relationer och inre trygghet. Bygger på metoder från Skolyogas Arvsfonden-projekt stillin’ between. Programmet lanseras inom kort.',
    durationWeeks: 6,
    icon: 'ShieldCheck',
    badge: 'Trygghet',
    badges: ['Trygghet', 'Kommande'],
    tags: ['Trygghet', 'Kommande'],
    difficulty: 'Mellanstadiet & Högstadiet',
    isActive: false, // Not yet released
    weeks: [
      {
        id: 'tr-w1',
        weekNumber: 1,
        title: 'Vad är trygghet?',
        exerciseName: 'Känna igen trygghet i kroppen',
        classTitle: 'Pass: Kartlägg dina trygga zoner',
        description: 'Att upptäcka hur trygghet faktiskt känns fysiskt i kroppen.',
        instructions: ['Genomför övningen i lugn takt.', 'Skriv ner tre saker som får dig att känna dig trygg.'],
        durationMinutes: 15,
      },
      {
        id: 'tr-w2',
        weekNumber: 2,
        title: 'Självmedkänsla och snälla tankar',
        exerciseName: 'Vänlig uppmärksamhet',
        classTitle: 'Pass: Att vara en god vän mot sig själv',
        description: 'Bryt negativa tankemönster med enkla kroppsförankrade övningar.',
        instructions: ['Följ guidningen.', 'Öva på att byta ut självkritik mot förståelse.'],
        durationMinutes: 15,
      },
      {
        id: 'tr-w3',
        weekNumber: 3,
        title: 'Sätta gränser med kroppen',
        exerciseName: 'Kroppshållning och integritet',
        classTitle: 'Pass: Stå stadigt i dig själv',
        description: 'Hur kroppsspråk och hållning stärker din förmåga att säga nej och sätta sunda gränser.',
        instructions: ['Öva grundande positioner.', 'Reflektera över dina gränser.'],
        durationMinutes: 15,
      },
      {
        id: 'tr-w4',
        weekNumber: 4,
        title: 'Hantera social oro och grupptryck',
        exerciseName: 'Fokus i stormen',
        classTitle: 'Pass: Hitta tillbaka till dig själv',
        description: 'Praktiska knep att ta till i korridoren, matsalen eller klassrummet när omgivningen är stökig.',
        instructions: ['Testa 2-minuters andningsankaret.', 'Öva i klassrumsmiljö.'],
        durationMinutes: 15,
      },
      {
        id: 'tr-w5',
        weekNumber: 5,
        title: 'Tillsammans i klassrummet',
        exerciseName: 'Synkroniserad andning och gemenskap',
        classTitle: 'Pass: Vi gör det tillsammans',
        description: 'Skapa grupptrygghet och stärka relationer mellan elever utan ord.',
        instructions: ['Gör övningen i par eller helklass.', 'Dela upplevelsen.'],
        durationMinutes: 15,
      },
      {
        id: 'tr-w6',
        weekNumber: 6,
        title: 'Mitt inre ankare',
        exerciseName: 'Förankrad framtid',
        classTitle: 'Pass: Diplom & personlig handlingsplan',
        description: 'Sammanfattning och diplom. Hur du bär med dig din inre trygghet överallt.',
        instructions: ['Ladda ner sammanfattningsbladet.', 'Fira dina framsteg.'],
        durationMinutes: 20,
      },
    ],
  },
];

export function getProgramById(id: string): Program | undefined {
  return allPrograms.find((p) => p.id === id);
}
