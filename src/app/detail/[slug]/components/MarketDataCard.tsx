"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowDown,
  ArrowUp,
  Clock,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface MarketDataProps {
  data?: {
    lastPrice: string | undefined;
    priceChange: string | undefined;
    priceChangePercent: string | undefined;
    highPrice: string | undefined;
    lowPrice: string | undefined;
    volume: string | undefined;
    quoteVolume: string | undefined;
  };
}

export const MarketDataCard = ({ data }: MarketDataProps) => {
  const isPositive = parseFloat(data?.priceChange || "0") >= 0;
  const [animate, setAnimate] = useState(false);
  const prevPrice = useRef(data?.lastPrice);

  useEffect(() => {
    if (data?.lastPrice !== prevPrice.current) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 1000);
      prevPrice.current = data?.lastPrice;
      return () => clearTimeout(timer);
    }
  }, [data?.lastPrice]);

  return (
    <Card className="h-full w-full bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Market Data</span>
          <div className="flex items-center gap-1 text-sm font-normal text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Live</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        <div className="grid grid-cols-2 gap-6">
          {/* Price Section */}
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Last Price</div>
            <div className="flex items-center gap-2">
              <span
                className={`text-2xl font-bold font-mono transition-all duration-300 ${
                  animate ? "scale-110 opacity-70" : "scale-100 opacity-100"
                }`}
              >
                $
                {parseFloat(data?.lastPrice || "0").toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <span
                className={`flex items-center transition-colors duration-300 ${
                  isPositive ? "text-emerald-500" : "text-rose-500"
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
              </span>
            </div>
          </div>

          {/* 24h Change */}
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">24h Change</div>
            <div className="flex items-center gap-2">
              <span
                className={`text-2xl font-bold transition-colors duration-300 ${
                  isPositive ? "text-emerald-500" : "text-rose-500"
                } ${animate ? "scale-105" : "scale-100"}`}
              >
                {parseFloat(data?.priceChangePercent || "0").toFixed(2)}%
              </span>
              {isPositive ? (
                <ArrowUp className="h-4 w-4 text-emerald-500 transition-transform duration-300 hover:translate-y-[-2px]" />
              ) : (
                <ArrowDown className="h-4 w-4 text-rose-500 transition-transform duration-300 hover:translate-y-[2px]" />
              )}
            </div>
          </div>

          {/* 24h Volume */}
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">24h Volume</div>
            <div
              className={`text-2xl font-bold font-mono transition-all duration-300 ${
                animate ? "scale-105 opacity-70" : "scale-100 opacity-100"
              }`}
            >
              {parseFloat(data?.volume || "0").toLocaleString()}
            </div>
          </div>

          {/* High/Low Section */}
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">24h Range</div>
            <div className="space-y-1">
              <div className="text-lg font-semibold text-emerald-500 font-mono">
                H: $
                {parseFloat(data?.highPrice || "0").toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="text-lg font-semibold text-rose-500 font-mono">
                L: $
                {parseFloat(data?.lowPrice || "0").toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
