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
    <Card className="h-full w-full bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Price Chart</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          {loading ? (
            <Skeleton className="w-full h-full rounded-xl" />
          ) : (
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4FC3F7" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#4FC3F7" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="time"
                stroke="currentColor"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <YAxis
                stroke="currentColor"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="currentColor"
                opacity={0.1}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  backdropFilter: "blur(8px)",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                  padding: "8px 12px",
                  color: "hsl(var(--card-foreground))",
                }}
                formatter={(value: number) => [
                  `$${value.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`,
                  "Price",
                ]}
              />
              <Area
                type="monotone"
                dataKey="close"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#priceGradient)"
                strokeWidth={2.5}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
