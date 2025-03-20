"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CoinData } from "@/types/coin-data";
import { useEffect, useState } from "react";

export default function Home() {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/coins?limit=10&&offset=${page * 10}`)
      .then(async (response) => setCoins(await response.json()))
      .finally(() => setLoading(false));
  }, [page]);
  return (
    <div className="container mx-auto">
      <div className="w-full h-screen flex items-center justify-center">
        <Card className="w-full">
          <CardHeader>
            <h2 className="text-xl font-semibold">Top Cryptocurrencies</h2>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Change</TableHead>
                  <TableHead>24h Volume</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading &&
                  Array.from({ length: 10 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton className="h-4 w-1/2" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-1/2" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-1/2" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-1/2" />
                      </TableCell>
                    </TableRow>
                  ))}
                {!loading &&
                  coins.map((coin) => (
                    <TableRow
                      className="cursor-pointer"
                      key={coin.symbol}
                      onClick={() => {
                        window.location.href = `/detail/${coin.symbol}`;
                      }}
                    >
                      <TableCell>{coin.symbol}</TableCell>
                      <TableCell>
                        {parseFloat(coin.lastPrice).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {parseFloat(coin.priceChange).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {parseFloat(coin.volume).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
          <div className="flex justify-between p-4">
            <div></div>
            <div className="flex gap-4">
              <Button
                className="cursor-pointer"
                onClick={() => {
                  setLoading(true);
                  setPage(page - 1);
                }}
                disabled={page === 0}
              >
                Previous
              </Button>
              <Button
                className="cursor-pointer"
                onClick={() => {
                  setLoading(true);
                  setPage(page + 1);
                }}
                disabled={page * 10 >= 560}
              >
                Next
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
