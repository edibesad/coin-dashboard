"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CoinData } from "@/types/coin-data";
import { useEffect, useState } from "react";
import { CoinsTable } from "./components/CoinsTable";
import { Input } from "@/components/ui/input";
import { useDebounce } from "./hooks/hooks";
import { Search } from "lucide-react";

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
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <Card className="w-full shadow-lg">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
              <div>
                <h1 className="text-2xl font-bold">Cryptocurrency Market</h1>
                <p className="text-muted-foreground mt-1">
                  Track real-time cryptocurrency prices and market data
                </p>
              </div>
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by symbol..."
                  className="pl-9"
                  onChange={(e) => {
                    setPage(0);
                    setSearch(e.target.value);
                  }}
                  value={search}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <CoinsTable coins={coins} loading={loading} />
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-muted-foreground">
                Showing {page * 10 + 1} to {Math.min((page + 1) * 10, total)} of{" "}
                {total} results
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 0 || loading}
                >
                  Previous
                </Button>
                <Button
                  onClick={() => setPage(page + 1)}
                  disabled={(page + 1) * 10 >= total || loading}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
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
