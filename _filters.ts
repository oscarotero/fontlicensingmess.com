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

export function convertFoundries(
  content: FoundryCSV[],
): Partial<Record<string, Foundry[]>> {
  const foundries: Foundry[] = [];

  for (const foundry of content) {
    const countries = foundry["Base Country"].split(",").map((c) => c.trim());
    for (const country of countries) {
      foundries.push({
        name: foundry.Nombre,
        url: foundry["URL Licensing"] || undefined,
        country,
        women: foundry["Run by women"] === "Yes",
      });
    }
  }

  foundries.sort((a, b) => a.country.localeCompare(b.country));

  return Object.groupBy(foundries, (f) => f.country);
}

interface UnitCSV {
  "Measuring unit": string;
}
interface Unit {
  name: string;
  value: number;
}

export function convertUnit(content: UnitCSV[]): Unit[] {
  const count: Record<string, number> = {};

  for (const unit of content) {
    const name = unit["Measuring unit"];
    if (count[name] === undefined) {
      count[name] = 0;
    }

    count[name]++;
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
  const mid = Math.floor(prices.length / 2);
  const median = prices[mid];
  const step = (max - min) / 40;
  const acc: Pricing[] = [];

  for (let i = 0; i <= 40; i++) {
    acc.push({ prices: [] });
  }

  prices.forEach((price) => {
    const group = Math.floor((price - min) / step);
    acc[group].prices.push(price);
    if (price === min) {
      acc[group].min = price;
    }
    if (price === max) {
      acc[group].max = price;
    }
    if (price === median) {
      acc[group].median = price;
    }
  });

  acc.reverse();

  return acc;
}
