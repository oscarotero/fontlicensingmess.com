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

const translatedUnits: Record<string, [string, string, string]> = {
  "Number of Users": [
    "Number of Users",
    "Número de Usuarias",
    "Número de Usuarias",
  ],
  "Workstations": [
    "Workstations",
    "Dispositivos",
    "Dispositivos",
  ],
  "Number of Employees": [
    "Number of Employees",
    "Número de Empleadas",
    "Número de Empregadas",
  ],
  "Pageviews/Month": [
    "Pageviews/Month",
    "Páginas vistas/mes",
    "Páxinas vistas/mes",
  ],
  "Unique Visitors/Month": [
    "Unique Visitors/Month",
    "Visitantes únicas/mes",
    "Visitantes únicas/mes",
  ],
  "Number of Domains": [
    "Number of Domains",
    "Número de Dominios",
    "Número de Dominios",
  ],
  "Use Case": ["Use Case", "Caso de Uso", "Caso de Uso"],
  "Monthly Users": [
    "Monthly Users",
    "Usuarias Mensuales",
    "Usuarias Mensuais",
  ],
  "Downloads": ["Downloads", "Descargas", "Descargas"],
  "Number of Years": [
    "Number of Years",
    "Número de Años",
    "Número de Anos",
  ],
  "Operating Systems": [
    "Operating Systems",
    "Sistemas Operativos",
    "Sistemas Operativos",
  ],
  "PDFs/month": [
    "PDFs/month",
    "PDFs/mes",
    "PDFs/mes",
  ],
  "Countries": ["Countries", "Países", "Países"],
  "Budget": ["Budget", "Presupuesto", "Orzamento"],
  "Audience Size": [
    "Audience Size",
    "Tamaño de la Audiencia",
    "Tamaño da Audiencia",
  ],
  "Platform": [
    "Platform",
    "Plataforma",
    "Plataforma",
  ],
  "Number of Followers": [
    "Number of Followers",
    "Número de Seguidoras",
    "Número de Seguidoras",
  ],
  "Brands": ["Brands", "Marcas", "Marcas"],
  "Unlimited": ["Unlimited", "Ilimitado", "Ilimitado"],
  "Annual Fee": [
    "Annual Fee",
    "Cuota Anual",
    "Cota Anual",
  ],
  "Impressions": [
    "Impressions",
    "Impresiones",
    "Impresións",
  ],
};

const translatedLicenses: Record<string, [string, string, string]> = {
  Desktop: ["Desktop", "Escritorio", "Escritorio"],
  Web: ["Web", "Web", "Web"],
  App: ["App", "Aplicaciones", "Aplicacións"],
  ePub: ["ePub", "ePub", "ePub"],
  Server: ["Server", "Servidor", "Servidor"],
  Broadcasting: ["Broadcasting", "Retransmisión", "Retransmisión"],
  "Social Media": ["Social Media", "Redes Sociales", "Redes Sociais"],
  Corporate: ["Corporate", "Corporativa", "Corporativa"],
  Logotype: ["Logotype", "Logotipo", "Logotipo"],
  Video: ["Video", "Vídeo", "Vídeo"],
  "Digital Ads": ["Digital Ads", "Publicidad Digital", "Publicidade Dixital"],
  "Non Commercial": ["Non Commercial", "No Comercial", "Non Comercial"],
  "Third Party": ["Third Party", "Terceros", "Terceiros"],
  "OEM": ["OEM", "OEM", "OEM"],
};

const translatedCountries: Record<string, [string, string, string]> = {
  Argentina: ["Argentina", "Argentina", "Arxentina"],
  Australia: ["Australia", "Australia", "Australia"],
  Austria: ["Austria", "Austria", "Austria"],
  Belgium: ["Belgium", "Bélgica", "Bélxica"],
  Brazil: ["Brazil", "Brasil", "Brasil"],
  Bulgaria: ["Bulgaria", "Bulgaria", "Bulgaria"],
  Canada: ["Canada", "Canadá", "Canadá"],
  Chile: ["Chile", "Chile", "Chile"],
  Colombia: ["Colombia", "Colombia", "Colombia"],
  "Costa Rica": ["Costa Rica", "Costa Rica", "Costa Rica"],
  Croatia: ["Croatia", "Croacia", "Croacia"],
  Czechia: ["Czechia", "Chequia", "Chequia"],
  Denmark: ["Denmark", "Dinamarca", "Dinamarca"],
  Estonia: ["Estonia", "Estonia", "Estonia"],
  Finland: ["Finland", "Finlandia", "Finlandia"],
  France: ["France", "Francia", "Francia"],
  Germany: ["Germany", "Alemania", "Alemaña"],
  Greece: ["Greece", "Grecia", "Grecia"],
  Iceland: ["Iceland", "Islandia", "Islandia"],
  India: ["India", "India", "India"],
  Indonesia: ["Indonesia", "Indonesia", "Indonesia"],
  Ireland: ["Ireland", "Irlanda", "Irlanda"],
  Italy: ["Italy", "Italia", "Italia"],
  Japan: ["Japan", "Japón", "Xapón"],
  Kazakhstan: ["Kazakhstan", "Kazajstán", "Cazaquistán"],
  Mexico: ["Mexico", "México", "México"],
  "New Zealand": ["Nueva Zelanda", "Nueva Zelanda", "Nova Zelanda"],
  Norway: ["Norway", "Noruega", "Noruega"],
  Poland: ["Poland", "Polonia", "Polonia"],
  Portugal: ["Portugal", "Portugal", "Portugal"],
  Romania: ["Romania", "Rumanía", "Romanía"],
  Serbia: ["Serbia", "Serbia", "Serbia"],
  Slovakia: ["Slovakia", "Eslovaquia", "Eslovaquia"],
  Slovenia: ["Slovenia", "Eslovenia", "Eslovenia"],
  Spain: ["Spain", "España", "España"],
  Sweden: ["Sweden", "Suecia", "Suecia"],
  Switzerland: ["Switzerland", "Suíza", "Suíza"],
  "The Netherlands": ["The Netherlands", "Países Bajos", "Países Baixos"],
  Turkey: ["Turkey", "Turquía", "Turquía"],
  Ukraine: ["Ukraine", "Ucrania", "Ucraína"],
  "United Arab Emirates": [
    "United Arab Emirates",
    "Emiratos Árabes Unidos",
    "Emiratos Árabes Unidos",
  ],
  "United Kingdom": ["United Kingdom", "Reino Unido", "Reino Unido"],
  Uruguay: ["Uruguay", "Uruguay", "Uruguai"],
  USA: ["USA", "Estados Unidos", "Estados Unidos"],
};

export function convertLicenses(
  licenses: any[],
): any {
  // @ts-ignore this.data is not defined
  const lang = this.data?.lang as string;
  const key = langKey(lang);
  return licenses.map(({ Tipo, Recuento }) => {
    return {
      Recuento,
      Tipo: translatedLicenses[Tipo][key],
    };
  }).sort((a, b) => b.Recuento - a.Recuento);
}

export function convertFoundries(
  content: FoundryCSV[],
): Partial<Record<string, Foundry[]>> {
  const foundries: Foundry[] = [];
  // @ts-ignore this.data is not defined
  const lang = this.data?.lang as string;
  const key = langKey(lang);

  for (const foundry of content) {
    const countries = foundry["Base Country"].split(",").map((c) => c.trim());
    for (const country of countries) {
      foundries.push({
        name: foundry.Nombre,
        url: foundry["URL Licensing"] || undefined,
        country: translatedCountries[country][key],
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
  // @ts-ignore this.data is not defined
  const lang = this.data?.lang as string;
  const key = langKey(lang);

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
    name: translatedUnits[name]?.[key] ?? name,
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

interface LanguageCSV {
  Idiomas: string;
  "English based": "No" | "Yes";
}
interface Language {
  englishBased: boolean;
  languages: string[];
  englishOnly: boolean;
}

export function convertLanguages(content: LanguageCSV[]): Language[] {
  const languages: Language[] = [];

  // @ts-ignore this.data is not defined
  const lang = this.data?.lang as string;
  const key = langKey(lang);

  for (const item of content) {
    const language: Language = {
      englishBased: item["English based"] === "Yes",
      languages: [],
      englishOnly: false,
    };

    const langs = new Set(item.Idiomas.split(",").map((l) => l.trim()));
    language.languages = Array.from(langs).map((lang) =>
      translatedLanguages[lang]?.[key] ?? lang
    );
    language.englishOnly = langs.size === 1 && langs.has("Inglés");
    languages.push(language);
  }

  return languages;
}

const translatedLanguages: Record<string, [string, string, string]> = {
  "Inglés": ["English", "Inglés", "Inglés"],
  "Ruso": ["Russian", "Ruso", "Ruso"],
  "Alemán": ["German", "Alemán", "Alemán"],
  "Portugués": ["Portuguese", "Portugués", "Portugués"],
  "Francés": ["French", "Francés", "Francés"],
  "Japonés": ["Japanese", "Japonés", "Xaponés"],
  "Árabe": ["Arabian", "Árabe", "Árabe"],
  "Eslovaco": ["Slovak", "Eslovaco", "Eslovaco"],
  "Español": ["Spanish", "Español", "Español"],
};

interface TiersCSV {
  Limit: string;
  Count: number;
}

interface Tier {
  value: number;
  count: number;
}

export function convertTiers(content: TiersCSV[]): Tier[] {
  const tiers: Tier[] = content.map((item) => ({
    value: toNumber(item.Limit),
    count: toNumber(item.Count) ?? 0,
  }));

  return tiers;
}

function toNumber(value: string | number): number {
  if (typeof value === "number") {
    return value;
  }
  if (value.toLowerCase() === "unlimited") {
    return Infinity;
  }
  return parseInt(value.replaceAll(".", ""), 10);
}

const enFormatNumber = new Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
  notation: "compact",
});

const esFormatNumber = new Intl.NumberFormat("es-ES", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
  notation: "compact",
});

export function formatNumber(number: number, unit: [string, string]): string {
  // @ts-ignore this.data is not defined
  const lang = this.data?.lang as string;

  if (number === Infinity) {
    return lang === "en" ? "Unlimited" : "Ilimitado";
  }

  const formattedNumber = lang === "en"
    ? enFormatNumber.format(number)
    : esFormatNumber.format(number);

  const suffix = number === 1 ? unit[0] : unit[1];

  return `${formattedNumber} ${suffix ?? ""}`.trim();
}

function langKey(lang: string): number {
  switch (lang) {
    case "en":
      return 0;
    case "es":
      return 1;
    case "gl":
      return 2;
  }
  throw new Error(`Unknown language: ${lang}`);
}
