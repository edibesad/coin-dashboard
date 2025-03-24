export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit");
  const offset = searchParams.get("offset");
  const search = searchParams.get("search");
  const data = await (
    await fetch("https://api.binance.com/api/v3/ticker/24hr")
  ).json();
  console.log("search", search);

  let filteredData = data
    .filter((symbol: any) =>
      search ? symbol.symbol.includes(search.toUpperCase()) : true
    )
    .filter((symbol: any) => symbol.symbol.endsWith("USDT"));

  const symbols = filteredData
    .slice(Number(offset), Number(offset) + Number(limit))
    .map((symbol: any) => ({
      symbol: symbol.symbol,
      priceChange: symbol.priceChange,
      priceChangePercent: symbol.priceChangePercent,
      volume: symbol.volume,
      lastPrice: symbol.lastPrice,
    }));

  console.log("symbols", symbols);

  return new Response(
    JSON.stringify({
      data: symbols,
      total: filteredData.length,
    }),
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
}
