import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1LnQYLed2jTkrFtpdzRxF1TNMFgYrc3oL_X6bBt5rlQc/gviz/tq?tqx=out:csv";

const SURVEY_SHEET_ID = "1yj28PRJ-BqP3z8L441_Vp2wWZUgTeRhMtmeI3cJZSOM";
const SURVEY_HTMLVIEW_URL = `https://docs.google.com/spreadsheets/d/${SURVEY_SHEET_ID}/htmlview`;

const FALLBACK_SURVEY_TABS = [
  { gid: "1777229245", name: "2026-09-10 Nacka Kommun Kuratorer Studieteknik" },
  { gid: "1985451094", name: "2026-08-12 Bällstabergsskolan/ICAKvantumVtuna" },
  { gid: "98467603", name: "2026-06-16 Nacka Kommun Kuratorer Trygghet" },
  { gid: "1485779901", name: "2026-04-01 Stiftelsen Hjärtligt Värmdö Munkmoraskol" },
  { gid: "1678072903", name: "2026-03-26 Nacka Kommun kuratorer Stresshantering" },
];

// Robust CSV parser supporting multiline quoted strings
function parseCSV(csvText: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = "";
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentField += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      currentRow.push(currentField);
      currentField = "";
    } else if ((char === "\r" || char === "\n") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") i++;
      currentRow.push(currentField);
      rows.push(currentRow);
      currentRow = [];
      currentField = "";
    } else {
      currentField += char;
    }
  }

  if (currentRow.length > 0 || currentField) {
    currentRow.push(currentField);
    rows.push(currentRow);
  }

  return rows;
}

export interface SurveyTabSummary {
  gid: string;
  name: string;
  date: string;
  cleanTitle: string;
  responses: number;
  recommendAvg: number;
  confidentAvg: number;
  relevantAvg: number | null;
}

export interface SurveyTakeaway {
  label: string;
  count: number;
  percent: number;
}

export interface SurveyKpiData {
  totalResponses: number;
  totalSurveys: number;
  recommendAvg: number;
  recommendPositivePercent: number;
  confidentAvg: number;
  confidentPositivePercent: number;
  relevantAvg: number;
  relevantPositivePercent: number;
  practicalExercisesPercent: number;
  takeaways: SurveyTakeaway[];
  surveys: SurveyTabSummary[];
}

const DEFAULT_SURVEY_KPI: SurveyKpiData = {
  totalResponses: 71,
  totalSurveys: 5,
  recommendAvg: 4.5,
  recommendPositivePercent: 92,
  confidentAvg: 4.2,
  confidentPositivePercent: 82,
  relevantAvg: 4.6,
  relevantPositivePercent: 91,
  practicalExercisesPercent: 97,
  takeaways: [
    { label: "Övningar att använda i verksamheten", count: 69, percent: 97 },
    { label: "Lekar och övningar för att stärka relationer", count: 57, percent: 80 },
    { label: "Kunskap och fakta", count: 56, percent: 79 },
    { label: "Motivation för att arbeta med välmående", count: 54, percent: 76 },
    { label: "Övningar att använda för mig själv som ledare", count: 44, percent: 62 },
    { label: "En återhämtande utbildning för min egen skull", count: 40, percent: 56 },
  ],
  surveys: [
    {
      gid: "1777229245",
      name: "2026-09-10 Nacka Kommun Kuratorer Studieteknik",
      date: "2026-09-10",
      cleanTitle: "Nacka Kommun – Kuratorer (Studieteknik)",
      responses: 15,
      recommendAvg: 4.5,
      confidentAvg: 4.1,
      relevantAvg: 4.7,
    },
    {
      gid: "1985451094",
      name: "2026-08-12 Bällstabergsskolan/ICAKvantumVtuna",
      date: "2026-08-12",
      cleanTitle: "Bällstabergsskolan / ICA Kvantum Vallentuna",
      responses: 6,
      recommendAvg: 4.8,
      confidentAvg: 4.7,
      relevantAvg: null,
    },
    {
      gid: "98467603",
      name: "2026-06-16 Nacka Kommun Kuratorer Trygghet",
      date: "2026-06-16",
      cleanTitle: "Nacka Kommun – Kuratorer (Trygghet)",
      responses: 19,
      recommendAvg: 4.4,
      confidentAvg: 4.1,
      relevantAvg: 4.4,
    },
    {
      gid: "1485779901",
      name: "2026-04-01Stiftelsen Hjärtligt Värmdö Munkmoraskol",
      date: "2026-04-01",
      cleanTitle: "Stiftelsen Hjärtligt Värmdö – Munkmoraskolan",
      responses: 15,
      recommendAvg: 4.9,
      confidentAvg: 4.7,
      relevantAvg: 4.9,
    },
    {
      gid: "1678072903",
      name: "2026-03-26 Nacka Kommun kuratorer Stresshantering",
      date: "2026-03-26",
      cleanTitle: "Nacka Kommun – Kuratorer (Stresshantering)",
      responses: 16,
      recommendAvg: 4.3,
      confidentAvg: 4.0,
      relevantAvg: 4.6,
    },
  ],
};

async function fetchSurveyKpis(): Promise<SurveyKpiData> {
  try {
    // 1. Discover all tabs dynamically from /htmlview so new survey tabs are automatically included
    let discoveredTabs: { gid: string; name: string }[] = [];
    try {
      const htmlRes = await fetch(SURVEY_HTMLVIEW_URL, {
        next: { revalidate: 600 },
      });
      if (htmlRes.ok) {
        const htmlText = await htmlRes.text();
        const regex = /items\.push\(\{name:\s*"([^"]+)",[^}]*gid:\s*"(\d+)"/g;
        let match: RegExpExecArray | null;
        while ((match = regex.exec(htmlText)) !== null) {
          discoveredTabs.push({
            name: match[1].trim(),
            gid: match[2].trim(),
          });
        }
      }
    } catch (e) {
      console.warn("Could not parse survey htmlview, using fallback tab list:", e);
    }

    if (discoveredTabs.length === 0) {
      discoveredTabs = FALLBACK_SURVEY_TABS;
    }

    // 2. Fetch CSV for every tab in parallel
    const tabResults = await Promise.all(
      discoveredTabs.map(async (tab) => {
        const csvUrl = `https://docs.google.com/spreadsheets/d/${SURVEY_SHEET_ID}/export?format=csv&gid=${tab.gid}`;
        const res = await fetch(csvUrl, { next: { revalidate: 600 } });
        if (!res.ok) return null;
        const text = await res.text();
        return { ...tab, rows: parseCSV(text) };
      })
    );

    let totalResponses = 0;
    let recSum = 0;
    let recCount = 0;
    let recPositive = 0;

    let confSum = 0;
    let confCount = 0;
    let confPositive = 0;

    let relSum = 0;
    let relCount = 0;
    let relPositive = 0;

    const takeawayCategories = [
      "Övningar att använda i verksamheten",
      "Lekar och övningar för att stärka relationer",
      "Kunskap och fakta",
      "Motivation för att arbeta med välmående",
      "Övningar att använda för mig själv som ledare",
      "En återhämtande utbildning för min egen skull",
    ];
    const takeawayCounts: Record<string, number> = {};
    takeawayCategories.forEach((cat) => {
      takeawayCounts[cat] = 0;
    });

    const surveys: SurveyTabSummary[] = [];

    for (const tabData of tabResults) {
      if (!tabData || !tabData.rows || tabData.rows.length < 2) continue;

      const headers = tabData.rows[0].map((h) => (h || "").toLowerCase());
      const recIdx = headers.findIndex((h) => h.includes("rekommendera"));
      const confIdx = headers.findIndex((h) => h.includes("trygg"));
      const relIdx = headers.findIndex((h) => h.includes("relevant"));
      const takeawayIdx = headers.findIndex((h) => h.includes("fick du med dig"));

      let tabResponses = 0;
      let tabRecSum = 0;
      let tabRecCount = 0;
      let tabConfSum = 0;
      let tabConfCount = 0;
      let tabRelSum = 0;
      let tabRelCount = 0;

      for (let i = 1; i < tabData.rows.length; i++) {
        const row = tabData.rows[i];
        if (!row || row.length < 2) continue;

        const timestamp = (row[0] || "").trim();
        if (!timestamp) continue;

        tabResponses++;
        totalResponses++;

        if (recIdx !== -1 && row[recIdx]) {
          const val = parseFloat(row[recIdx].trim().replace(",", "."));
          if (!isNaN(val) && val >= 1 && val <= 5) {
            recSum += val;
            recCount++;
            tabRecSum += val;
            tabRecCount++;
            if (val >= 4) recPositive++;
          }
        }

        if (confIdx !== -1 && row[confIdx]) {
          const val = parseFloat(row[confIdx].trim().replace(",", "."));
          if (!isNaN(val) && val >= 1 && val <= 5) {
            confSum += val;
            confCount++;
            tabConfSum += val;
            tabConfCount++;
            if (val >= 4) confPositive++;
          }
        }

        if (relIdx !== -1 && row[relIdx]) {
          const val = parseFloat(row[relIdx].trim().replace(",", "."));
          if (!isNaN(val) && val >= 1 && val <= 5) {
            relSum += val;
            relCount++;
            tabRelSum += val;
            tabRelCount++;
            if (val >= 4) relPositive++;
          }
        }

        if (takeawayIdx !== -1 && row[takeawayIdx]) {
          const cellText = row[takeawayIdx];
          for (const cat of takeawayCategories) {
            if (cellText.includes(cat)) {
              takeawayCounts[cat]++;
            }
          }
        }
      }

      if (tabResponses > 0) {
        const dateMatch = tabData.name.match(/^(\d{4}-\d{2}-\d{2})\s*(.*)$/);
        const date = dateMatch ? dateMatch[1] : "";
        const cleanTitle = dateMatch && dateMatch[2] ? dateMatch[2].trim() : tabData.name;

        surveys.push({
          gid: tabData.gid,
          name: tabData.name,
          date,
          cleanTitle,
          responses: tabResponses,
          recommendAvg: tabRecCount > 0 ? Math.round((tabRecSum / tabRecCount) * 10) / 10 : 0,
          confidentAvg: tabConfCount > 0 ? Math.round((tabConfSum / tabConfCount) * 10) / 10 : 0,
          relevantAvg: tabRelCount > 0 ? Math.round((tabRelSum / tabRelCount) * 10) / 10 : null,
        });
      }
    }

    if (totalResponses === 0) {
      return DEFAULT_SURVEY_KPI;
    }

    const takeaways: SurveyTakeaway[] = takeawayCategories
      .map((label) => ({
        label,
        count: takeawayCounts[label],
        percent: Math.round((takeawayCounts[label] / totalResponses) * 100),
      }))
      .sort((a, b) => b.percent - a.percent);

    const practicalExercisesPercent =
      takeaways.find((t) => t.label === "Övningar att använda i verksamheten")?.percent || 97;

    return {
      totalResponses,
      totalSurveys: surveys.length,
      recommendAvg: recCount > 0 ? Math.round((recSum / recCount) * 10) / 10 : 4.5,
      recommendPositivePercent: recCount > 0 ? Math.round((recPositive / recCount) * 100) : 92,
      confidentAvg: confCount > 0 ? Math.round((confSum / confCount) * 10) / 10 : 4.2,
      confidentPositivePercent: confCount > 0 ? Math.round((confPositive / confCount) * 100) : 82,
      relevantAvg: relCount > 0 ? Math.round((relSum / relCount) * 10) / 10 : 4.6,
      relevantPositivePercent: relCount > 0 ? Math.round((relPositive / relCount) * 100) : 91,
      practicalExercisesPercent,
      takeaways,
      surveys,
    };
  } catch (error) {
    console.warn("Error fetching customer survey KPIs, using defaults:", error);
    return DEFAULT_SURVEY_KPI;
  }
}

export async function GET() {
  // Conservative baseline for 2012–2024 before systematic logging was established
  const historic2012_2024 = 45000;
  const base2025 = 9200;

  // Fetch both impact sheet and customer survey sheet in parallel
  const surveyKpiPromise = fetchSurveyKpis();

  try {
    const [res, surveyKpi] = await Promise.all([
      fetch(SHEET_CSV_URL, {
        next: { revalidate: 600 }, // Revalidate every 10 minutes
      }),
      surveyKpiPromise,
    ]);

    if (!res.ok) {
      throw new Error(`Google Sheets responded with status ${res.status}`);
    }

    const csvText = await res.text();
    const rows = parseCSV(csvText);

    // Grouping calculations
    const yearlyData: Record<
      string,
      { year: string; spread: number; participants: number; events: number }
    > = {};

    let totalSpreadFromSheet = 0;
    let totalParticipants = 0;
    let totalEvents = 0;

    // Header is row 0.
    // Column 0 = Datum, Column 4 = Antal deltagare, Column 6 = Uppskattad spridning till barn och unga
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (!row || row.length < 5) continue;

      const dateStr = (row[0] || "").trim();
      const partRaw = (row[4] || "").replace(/\s+/g, "").replace(",", ".");
      const spreadRaw = (row[6] || "").replace(/\s+/g, "").replace(",", ".");

      const participants = parseFloat(partRaw) || 0;
      const spread = parseFloat(spreadRaw) || 0;

      const yearMatch = dateStr.match(/^(\d{4})/);
      const year = yearMatch ? yearMatch[1] : "2026";

      if (!yearlyData[year]) {
        yearlyData[year] = { year, spread: 0, participants: 0, events: 0 };
      }

      if (spread > 0 || participants > 0 || dateStr) {
        yearlyData[year].spread += spread;
        yearlyData[year].participants += participants;
        yearlyData[year].events += 1;

        totalSpreadFromSheet += spread;
        totalParticipants += participants;
        totalEvents += 1;
      }
    }

    const currentYear = new Date().getFullYear().toString();
    const currentYearStats = yearlyData[currentYear] || {
      year: currentYear,
      spread: totalSpreadFromSheet,
      participants: totalParticipants,
      events: totalEvents,
    };

    // Documented period (2025 + 2026 live)
    const documentedTotal = totalSpreadFromSheet + base2025;
    // Grand total since founding in 2012
    const allTimeTotal = historic2012_2024 + documentedTotal;

    const years = [
      {
        year: "2012 – 2024",
        spread: historic2012_2024,
        participants: 1200,
        events: 160,
        status: "Konservativ schablon",
        label: "Uppbyggnad & tidiga år",
        notes: "Uppskattad räckvidd under Skolyogas första 12 år",
      },
      {
        year: "2025",
        spread: base2025,
        participants: 280,
        events: 18,
        status: "Slutfört",
        label: "Effektrapport 2025",
        notes: "Fastställt i officiell effektutvärdering",
      },
      {
        year: currentYear,
        spread: currentYearStats.spread,
        participants: currentYearStats.participants,
        events: currentYearStats.events,
        status: "Pågående",
        label: "Hittills under 2026",
        notes: "Live från evenemangsloggen i Google Sheets",
      },
    ];

    return NextResponse.json({
      success: true,
      allTimeTotal,
      documentedTotal,
      historic2012_2024,
      currentYear,
      currentYearSpread: currentYearStats.spread,
      currentYearParticipants: currentYearStats.participants,
      currentYearEvents: currentYearStats.events,
      growthPercent: Math.round(((currentYearStats.spread - base2025) / base2025) * 100),
      years,
      surveyKpi,
      updatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Error fetching Google Sheet impact data:", error);

    const documentedTotal = 22002 + base2025;
    const allTimeTotal = historic2012_2024 + documentedTotal;
    const surveyKpi = await surveyKpiPromise;

    return NextResponse.json({
      success: true,
      allTimeTotal,
      documentedTotal,
      historic2012_2024,
      currentYear: "2026",
      currentYearSpread: 22002,
      currentYearParticipants: 512,
      currentYearEvents: 21,
      growthPercent: 139,
      years: [
        {
          year: "2012 – 2024",
          spread: historic2012_2024,
          participants: 1200,
          events: 160,
          status: "Konservativ schablon",
          label: "Uppbyggnad & tidiga år",
          notes: "Uppskattad räckvidd under Skolyogas första 12 år",
        },
        {
          year: "2025",
          spread: base2025,
          participants: 280,
          events: 18,
          status: "Slutfört",
          label: "Effektrapport 2025",
          notes: "Fastställt i officiell effektutvärdering",
        },
        {
          year: "2026",
          spread: 22002,
          participants: 512,
          events: 21,
          status: "Pågående",
          label: "Hittills under 2026",
          notes: "Live från evenemangsloggen i Google Sheets",
        },
      ],
      surveyKpi,
      updatedAt: new Date().toISOString(),
      fallback: true,
    });
  }
}
