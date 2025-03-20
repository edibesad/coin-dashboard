import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MarketData } from "./MarketData";
import { TimePriceChart } from "./TimePriceChart";

export const DetailsCard = ({ symbol }: { symbol: string }) => {
  return (
    <Card className="w-3/4">
      <CardHeader>
        <CardTitle>
          <h1 className="font-bold text-4xl">{symbol}</h1>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col h-full gap-4">
        <div className="flex-grow h-full">
          <TimePriceChart symbol={symbol} />
        </div>
        <div className="w-full h-full">
          <MarketData symbol={symbol} />
        </div>
      </CardContent>
    </Card>
  );
};
