import { SymbolData } from "@/app/types/symobl-data";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");
    const search = searchParams.get("search");
    const data = await (
      await fetch("https://api.binance.com/api/v3/ticker/24hr")
    ).json();
    console.log("search", search);
    console.log("data", data);

    if (data) {
      return new Response(
        JSON.stringify({
          data: [],
          total: 0,
        }),
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
    }

    const filteredData = data
      .filter((symbol: SymbolData) =>
        search ? symbol.symbol.includes(search.toUpperCase()) : true
      )
      .filter((symbol: SymbolData) => symbol.symbol.endsWith("USDT"));

    const symbols = filteredData
      .slice(Number(offset), Number(offset) + Number(limit))
      .map(
        (symbol: {
          symbol: string;
          priceChange: string;
          priceChangePercent: string;
          volume: string;
          lastPrice: string;
        }) => ({
          symbol: symbol.symbol,
          priceChange: symbol.priceChange,
          priceChangePercent: symbol.priceChangePercent,
          volume: symbol.volume,
          lastPrice: symbol.lastPrice,
        })
      );

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
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    } else {
      return new Response("An unknown error occurred", { status: 500 });
    }
  }
}
