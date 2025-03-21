"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CoinData } from "@/types/coin-data";
import { useEffect, useState } from "react";
import { CoinsTable } from "./components/CoinsTable";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoins(page)
      .then(async (response) => {
        const json = await response.json();
        setCoins(json.data);
      })
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="container mx-auto">
      <div className="w-full h-screen flex items-center justify-center">
        <Card className="w-full">
          <CardHeader>
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">Top Cryptocurrencies</h2>
              <Input
                placeholder="Symbol"
                className="w-64"
                onSubmit={(value) => {
                  setLoading(true);
                  fetchCoins(page)
                    .then(async (response) => {
                      const json = await response.json();
                      setCoins(json.data);
                    })
                    .finally(() => setLoading(false));
                }}
              />
            </div>
          </CardHeader>
          <CardContent>
            <CoinsTable coins={coins} loading={loading} />
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

async function fetchCoins(page: number) {
  const response = await fetch(`/api/coins?limit=10&offset=${page * 10}`);
  return response;
}
