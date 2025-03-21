"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CoinData } from "@/types/coin-data";
import { useEffect, useState } from "react";
import { CoinsTable } from "./components/CoinsTable";
import { Input } from "@/components/ui/input";
import { useDebounce } from "./hooks/hooks";

export default function Home() {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setLoading(true);
    fetchCoins(page, debouncedSearch)
      .then(async (response) => {
        const json = await response.json();
        setCoins(json.data);
        setTotal(json.total);
      })
      .finally(() => setLoading(false));
  }, [debouncedSearch, page]);

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
                onChange={(e) => {
                  setPage(0);
                  return setSearch(e.target.value);
                }}
                value={search}
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
                onClick={() => setPage(page - 1)}
                disabled={page === 0 || loading}
              >
                Previous
              </Button>
              <Button
                className="cursor-pointer"
                onClick={() => setPage(page + 1)}
                disabled={page * 10 > total || loading}
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

async function fetchCoins(page: number, search?: string) {
  const query = new URLSearchParams({
    limit: "10",
    offset: (page * 10).toString(),
    ...(search ? { search } : {}),
  });

  const response = await fetch(`/api/coins?${query.toString()}`);
  return response;
}
