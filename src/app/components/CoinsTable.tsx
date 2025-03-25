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
              <TableCell>{parseFloat(coin.lastPrice).toFixed(2)}</TableCell>
              <TableCell>{parseFloat(coin.priceChange).toFixed(2)}</TableCell>
              <TableCell>{parseFloat(coin.volume).toFixed(2)}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
