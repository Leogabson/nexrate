// src/app/api/rates/route.ts
import { NextResponse } from "next/server";

// Cache rates for 30 seconds to avoid hitting API limits
let ratesCache: any = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 30 * 1000; // 30 seconds

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const symbols = searchParams.get("symbols"); // e.g., "BTC,ETH,USDT"
    const vsCurrency = searchParams.get("vs") || "usd";

    // Check cache
    const now = Date.now();
    if (ratesCache && now - cacheTimestamp < CACHE_DURATION) {
      return NextResponse.json(ratesCache);
    }

    // Default popular coins if no symbols specified
    const coinIds = symbols
      ? symbols
          .toLowerCase()
          .split(",")
          .map((s) => getCoinGeckoId(s.trim()))
      : ["bitcoin", "ethereum", "tether", "binancecoin", "solana", "cardano"];

    // Fetch from CoinGecko
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds.join(
      ","
    )}&vs_currencies=${vsCurrency}&include_24hr_change=true&include_24hr_vol=true&include_last_updated_at=true`;

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();

    // Transform data to our format
    const rates = Object.entries(data).map(
      ([coinId, details]: [string, any]) => ({
        symbol: getSymbolFromCoinId(coinId),
        name: coinId,
        price: details[vsCurrency],
        change24h: details[`${vsCurrency}_24h_change`] || 0,
        volume24h: details[`${vsCurrency}_24h_vol`] || 0,
        lastUpdated: details.last_updated_at
          ? new Date(details.last_updated_at * 1000)
          : new Date(),
      })
    );

    const result = {
      rates,
      vsCurrency,
      timestamp: new Date(),
      source: "coingecko",
    };

    // Update cache
    ratesCache = result;
    cacheTimestamp = now;

    return NextResponse.json(result);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Fetch rates error:", error);
    }
    return NextResponse.json(
      { error: "Failed to fetch exchange rates" },
      { status: 500 }
    );
  }
}

// Helper: Map symbol to CoinGecko ID
function getCoinGeckoId(symbol: string): string {
  const mapping: { [key: string]: string } = {
    BTC: "bitcoin",
    ETH: "ethereum",
    USDT: "tether",
    BNB: "binancecoin",
    SOL: "solana",
    ADA: "cardano",
    XRP: "ripple",
    DOT: "polkadot",
    DOGE: "dogecoin",
    AVAX: "avalanche-2",
    MATIC: "matic-network",
    LINK: "chainlink",
    UNI: "uniswap",
    LTC: "litecoin",
    ATOM: "cosmos",
  };

  return mapping[symbol.toUpperCase()] || symbol.toLowerCase();
}

// Helper: Map CoinGecko ID back to symbol
function getSymbolFromCoinId(coinId: string): string {
  const reverseMapping: { [key: string]: string } = {
    bitcoin: "BTC",
    ethereum: "ETH",
    tether: "USDT",
    binancecoin: "BNB",
    solana: "SOL",
    cardano: "ADA",
    ripple: "XRP",
    polkadot: "DOT",
    dogecoin: "DOGE",
    "avalanche-2": "AVAX",
    "matic-network": "MATIC",
    chainlink: "LINK",
    uniswap: "UNI",
    litecoin: "LTC",
    cosmos: "ATOM",
  };

  return reverseMapping[coinId] || coinId.toUpperCase();
}

// Get specific pair rate
export async function POST(request: Request) {
  try {
    const { fromSymbol, toSymbol } = await request.json();

    if (!fromSymbol || !toSymbol) {
      return NextResponse.json(
        { error: "Both fromSymbol and toSymbol are required" },
        { status: 400 }
      );
    }

    const fromCoinId = getCoinGeckoId(fromSymbol);
    const toCoinId = getCoinGeckoId(toSymbol);

    // If converting to fiat, use simple price endpoint
    const fiatCurrencies = ["usd", "eur", "gbp", "jpy", "aud", "cad"];
    if (fiatCurrencies.includes(toSymbol.toLowerCase())) {
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${fromCoinId}&vs_currencies=${toSymbol.toLowerCase()}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.status}`);
      }

      const data = await response.json();
      const rate = data[fromCoinId]?.[toSymbol.toLowerCase()];

      if (!rate) {
        return NextResponse.json(
          { error: "Rate not available for this pair" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        fromSymbol,
        toSymbol,
        rate,
        inverseRate: 1 / rate,
        timestamp: new Date(),
        source: "coingecko",
      });
    }

    // For crypto-to-crypto, get both prices in USD then calculate
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${fromCoinId},${toCoinId}&vs_currencies=usd`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();
    const fromPrice = data[fromCoinId]?.usd;
    const toPrice = data[toCoinId]?.usd;

    if (!fromPrice || !toPrice) {
      return NextResponse.json(
        { error: "Rate not available for this pair" },
        { status: 404 }
      );
    }

    const rate = fromPrice / toPrice;

    return NextResponse.json({
      fromSymbol,
      toSymbol,
      rate,
      inverseRate: 1 / rate,
      fromPrice,
      toPrice,
      timestamp: new Date(),
      source: "coingecko",
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Calculate rate error:", error);
    }
    return NextResponse.json(
      { error: "Failed to calculate exchange rate" },
      { status: 500 }
    );
  }
}
