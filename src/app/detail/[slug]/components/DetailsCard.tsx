import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MarketData } from "./MarketData";
import { TimePriceChart } from "./TimePriceChart";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const DetailsCard = ({ symbol }: { symbol: string }) => {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <CardTitle>
            <h1 className="text-2xl font-bold">{symbol}</h1>
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <div className="grid md:grid-cols-2 gap-6">
          <MarketData symbol={symbol} />
          <TimePriceChart symbol={symbol} />
        </div>
      </CardContent>
    </Card>
  );
};
