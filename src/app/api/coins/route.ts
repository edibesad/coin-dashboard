export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit");
  const offset = searchParams.get("offset");
  const data = await (
    await fetch("https://api.binance.com/api/v3/ticker/24hr")
  ).json();

  const symbols = data
    .filter((symbol: any) => symbol.symbol.endsWith("USDT"))
    .slice(Number(offset), Number(offset) + Number(limit))
    .map((symbol: any) => ({
      symbol: symbol.symbol,
      priceChange: symbol.priceChange,
      priceChangePercent: symbol.priceChangePercent,
      volume: symbol.volume,
      lastPrice: symbol.lastPrice,
    }));

  return new Response(JSON.stringify(symbols), {
    headers: {
      "content-type": "application/json",
    },
  });
}
