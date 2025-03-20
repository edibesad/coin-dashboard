"use client";

import { useEffect, useState } from "react";
import { MarketDataCard } from "./MarketDataCard";
interface SocketData {
  e: string; // Event type
  E: number; // Event time
  s: string; // Symbol
  p: string; // Price change
  P: string; // Price change percent
  w: string; // Weighted average price
  x: string; // First trade price
  c: string; // Last price
  Q: string; // Last quantity
  b: string; // Best bid price
  B: string; // Best bid quantity
  a: string; // Best ask price
  A: string; // Best ask quantity
  o: string; // Open price
  h: string; // High price
  l: string; // Low price
  v: string; // Total traded base asset volume
  q: string; // Total traded quote asset volume
  O: number; // Statistics open time
  C: number; // Statistics close time
  F: number; // First trade ID
  L: number; // Last trade ID
  n: number; // Total number of trades
}

export const MarketData = ({ symbol }: { symbol: string }) => {
  const [data, setData] = useState<SocketData | null>(null);

  useEffect(() => {
    const socket = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`
    );

    socket.onmessage = (event) => {
      const data: SocketData = JSON.parse(event.data);
      console.log("data", data);
      setData(data);
    };

    socket.onopen = () => {
      console.log("Socket connected");
    };

    socket.onerror = (error) => {
      console.error("Socket error:", error);
    };

    socket.onclose = () => {
      console.log("Socket closed");
    };

    return () => {
      socket.close();
    };
  }, [symbol]);

  return (
    <MarketDataCard
      data={{
        lastPrice: data ? parseFloat(data?.c).toFixed(4) : undefined,
        priceChange: data?.p,
        priceChangePercent: data?.P,
        highPrice: data ? parseFloat(data?.h).toFixed(4) : undefined,
        lowPrice: data ? parseFloat(data?.l).toFixed(4) : undefined,
        volume: data ? parseFloat(data?.v).toFixed(2) : undefined,
        quoteVolume: data?.q,
      }}
    />
  );
};
