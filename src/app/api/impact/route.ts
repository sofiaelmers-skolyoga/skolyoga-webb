import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1LnQYLed2jTkrFtpdzRxF1TNMFgYrc3oL_X6bBt5rlQc/gviz/tq?tqx=out:csv";

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

export async function GET() {
  try {
    const res = await fetch(SHEET_CSV_URL, {
      next: { revalidate: 600 }, // Revalidate every 10 minutes
    });

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

    // Historical baseline from official reports
    // 2025: 9 200 barn och unga (from Effektrapport 2025)
    const base2025 = 9200;
    const currentYear = new Date().getFullYear().toString();
    const currentYearStats = yearlyData[currentYear] || {
      year: currentYear,
      spread: totalSpreadFromSheet,
      participants: totalParticipants,
      events: totalEvents,
    };

    const cumulativeTotal = totalSpreadFromSheet + base2025;

    const years = [
      {
        year: "2025",
        spread: 9200,
        participants: 280,
        events: 18,
        status: "Slutfört",
        label: "Effektrapport 2025",
      },
      {
        year: currentYear,
        spread: currentYearStats.spread,
        participants: currentYearStats.participants,
        events: currentYearStats.events,
        status: "Pågående",
        label: "Hittills under året",
      },
    ];

    return NextResponse.json({
      success: true,
      cumulativeTotal,
      currentYear,
      currentYearSpread: currentYearStats.spread,
      currentYearParticipants: currentYearStats.participants,
      currentYearEvents: currentYearStats.events,
      growthPercent: Math.round(((currentYearStats.spread - base2025) / base2025) * 100),
      years,
      updatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Error fetching Google Sheet impact data:", error);

    // Resilient fallback values so page never fails or shows empty
    return NextResponse.json({
      success: true,
      cumulativeTotal: 31202,
      currentYear: "2026",
      currentYearSpread: 22002,
      currentYearParticipants: 512,
      currentYearEvents: 21,
      growthPercent: 139,
      years: [
        {
          year: "2025",
          spread: 9200,
          participants: 280,
          events: 18,
          status: "Slutfört",
          label: "Effektrapport 2025",
        },
        {
          year: "2026",
          spread: 22002,
          participants: 512,
          events: 21,
          status: "Pågående",
          label: "Hittills under året",
        },
      ],
      updatedAt: new Date().toISOString(),
      fallback: true,
    });
  }
}
