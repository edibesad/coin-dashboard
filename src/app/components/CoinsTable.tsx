import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SymbolData } from "../types/symobl-data";
import { ArrowDown, ArrowUp } from "lucide-react";

export function CoinsTable({
  coins,
  loading,
}: {
  coins: SymbolData[];
  loading: boolean;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Symbol</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">24h Change</TableHead>
          <TableHead className="text-right">24h Volume</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading &&
          Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20 ml-auto" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-16 ml-auto" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24 ml-auto" />
              </TableCell>
            </TableRow>
          ))}
        {!loading &&
          coins.map((coin) => {
            const priceChange = parseFloat(coin.priceChange);
            const isPositive = priceChange >= 0;

            return (
              <TableRow
                key={coin.symbol}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => {
                  window.location.href = `/detail/${coin.symbol}`;
                }}
              >
                <TableCell className="font-medium">{coin.symbol}</TableCell>
                <TableCell className="text-right font-mono">
                  $
                  {parseFloat(coin.lastPrice).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <div
                    className={`flex items-center justify-end gap-1 ${
                      isPositive ? "text-emerald-500" : "text-rose-500"
                    }`}
                  >
                    {isPositive ? (
                      <ArrowUp className="h-4 w-4" />
                    ) : (
                      <ArrowDown className="h-4 w-4" />
                    )}
                    {Math.abs(priceChange).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono">
                  {parseFloat(coin.volume).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}
