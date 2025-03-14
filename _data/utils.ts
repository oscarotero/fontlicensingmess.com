interface GroupPricing {
  min?: number;
  max?: number;
  median?: number;
  prices: number[];
}

export function groupPricing(prices: number[]): GroupPricing[] {
  prices.sort((a, b) => b - a);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const mid = Math.floor(prices.length / 2);
  const median = prices[mid];
  const step = (max - min) / 20;
  const acc: GroupPricing[] = [];

  for (let i = 0; i <= 20; i++) {
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
