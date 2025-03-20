"use client";

import { AreaChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { useEffect, useState } from "react";
import { Area, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface CoinData {
  time: string;
  close: number;
}

export const TimePriceChart = ({ symbol }: { symbol: string }) => {
  const [data, setData] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(
      `https://api.binance.com/api/v3/klines?symbol=${symbol.toUpperCase()}&interval=1d`
    );
    fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol.toUpperCase()}&interval=1d`
    )
      .then(async (res) => {
        const jsonData = await res.json();
        const formattedData = jsonData.map((d: Array<number | string>) => ({
          time: new Date(d[0]).toLocaleDateString(),
          close: Number(d[4]),
        }));
        setData(formattedData);
      })
      .finally(() => setLoading(false));
  }, [symbol]);

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>Price Chart</CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        <ResponsiveContainer width="99%" height={300}>
          {loading ? (
            <Skeleton className="w-full h-full rounded-xl" />
          ) : (
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--chart-1))"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--chart-1))"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="time"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                opacity={0.4}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                  fontSize: "12px",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Area
                type="monotone"
                dataKey="close"
                stroke="hsl(var(--chart-1))"
                fillOpacity={1}
                fill="url(#priceGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
