interface FoundryCSV {
  Nombre: string;
  "URL Licensing": string;
  "Base Country": string;
  "Run by women": "No" | "Yes";
}
interface Foundry {
  name: string;
  url?: string;
  country: string;
  women: boolean;
}

const translatedLicenses: Record<string, string> = {
  Desktop: "Escritorio",
  Web: "Web",
  App: "Aplicaciones",
  ePub: "ePub",
  Server: "Servidor",
  Broadcasting: "Retransmisión",
  "Social Media": "Redes Sociales",
  Corporate: "Corporativa",
  Logotype: "Logotipo",
  Video: "Vídeo",
  "Digital Ads": "Publicidad Digital",
  "Non Commercial": "No Comercial",
  "Third Party": "Terceros",
  "OEM": "OEM",
};

const translatedCountries: Record<string, string> = {
  Argentina: "Argentina",
  Australia: "Australia",
  Austria: "Austria",
  Belgium: "Bélgica",
  Brazil: "Brasil",
  Bulgaria: "Bulgaria",
  Canada: "Canadá",
  Chile: "Chile",
  Colombia: "Colombia",
  "Costa Rica": "Costa Rica",
  Croatia: "Croacia",
  Czechia: "Chequia",
  Denmark: "Dinamarca",
  Estonia: "Estonia",
  Finland: "Finlandia",
  France: "Francia",
  Germany: "Alemania",
  Greece: "Grecia",
  Iceland: "Islandia",
  India: "India",
  Indonesia: "Indonesia",
  Ireland: "Irlanda",
  Italy: "Italia",
  Japan: "Japón",
  Kazakhstan: "Kazajstán",
  Mexico: "México",
  "New Zealand": "Nueva Zelanda",
  Norway: "Noruega",
  Poland: "Polonia",
  Portugal: "Portugal",
  Romania: "Rumanía",
  Serbia: "Serbia",
  Slovakia: "Eslovaquia",
  Slovenia: "Eslovenia",
  Spain: "España",
  Sweden: "Suecia",
  Switzerland: "Suíza",
  "The Netherlands": "Países Bajos",
  Turkey: "Turquía",
  Ukraine: "Ucrania",
  "United Arab Emirates": "Emiratos Árabes Unidos",
  "United Kingdom": "Reino Unido",
  Uruguay: "Uruguay",
  USA: "Estados Unidos",
};

export function convertLicenses(
  licenses: any[],
): any {
  // @ts-ignore this.data is not defined
  const lang = this.data?.lang as string;
  return licenses.map(({ Tipo, Recuento }) => {
    return {
      Recuento,
      Tipo: lang === "es" ? translatedLicenses[Tipo] ?? Tipo : Tipo,
    };
  }).sort((a, b) => b.Recuento - a.Recuento);
}

export function convertFoundries(
  content: FoundryCSV[],
): Partial<Record<string, Foundry[]>> {
  const foundries: Foundry[] = [];
  // @ts-ignore this.data is not defined
  const lang = this.data?.lang as string;

  for (const foundry of content) {
    const countries = foundry["Base Country"].split(",").map((c) => c.trim());
    for (const country of countries) {
      foundries.push({
        name: foundry.Nombre,
        url: foundry["URL Licensing"] || undefined,
        country: lang === "es"
          ? translatedCountries[country] ?? country
          : country,
        women: foundry["Run by women"] === "Yes",
      });
    }
  }

  foundries.sort((a, b) => a.country.localeCompare(b.country));

  return Object.groupBy(foundries, (f) => f.country);
}

interface UnitCSV {
  "Measuring unit": string;
  __EMPTY?: string;
}
interface Unit {
  name: string;
  value: number;
}

export function convertUnit(content: UnitCSV[]): Unit[] {
  const count: Record<string, number> = {};

  for (const unit of content) {
    const row = `${unit["Measuring unit"] ?? ""}, ${unit.__EMPTY ?? ""}`;
    const names = row.split(",").map((u) => u.trim()).filter((u) => u);
    if (!names?.length) {
      continue;
    }

    for (const name of names) {
      count[name] = (count[name] ?? 0) + 1;
    }
  }

  return Object.entries(count).map(([name, value]) => ({
    name,
    value,
  })).sort((a, b) => b.value - a.value);
}

interface PricingCSV {
  "Cost 1 font": string;
}

export function convertPricing(content: PricingCSV[]): Pricing[] {
  const prices: number[] = [];

  for (const price of content) {
    const value = parseFloat(price["Cost 1 font"]);
    if (!isNaN(value)) {
      prices.push(value);
    }
  }

  return groupPricing(prices);
}

interface Pricing {
  min?: number;
  max?: number;
  median?: number;
  prices: number[];
}

export function groupPricing(prices: number[]): Pricing[] {
  prices.sort((a, b) => b - a);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const median = getMedian(prices);
  const step = (max - min) / 40;
  const acc: Pricing[] = [];

  for (let i = 0; i <= 40; i++) {
    acc.push({ prices: [] });
  }

  prices.forEach((price, index, prices) => {
    const group = Math.floor((price - min) / step);
    acc[group].prices.push(price);
    if (price === min) {
      acc[group].min = price;
    }
    if (price === max) {
      acc[group].max = price;
    }
    if (Math.floor(prices.length / 2) === index) {
      acc[group].median = Math.round(median);
    }
  });

  acc.reverse();

  return acc;
}

function getMedian(values: number[]): number {
  const mid = Math.floor(values.length / 2);
  return values.length % 2 !== 0
    ? values[mid]
    : (values[mid - 1] + values[mid]) / 2;
}
