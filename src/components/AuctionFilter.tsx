"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  pageSize: number;
  setPageSize: (size: number) => void;
};

const pageSizeOptions = [4, 8, 12, 16];

export default function AuctionFilter({ pageSize, setPageSize }: Props) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div></div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Items por página:</span>

        <Select
          defaultValue={pageSize.toString()}
          onValueChange={(value) => setPageSize(Number(value))}
        >
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>

          <SelectContent>
            {pageSizeOptions.map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
