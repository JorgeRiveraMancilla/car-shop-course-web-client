"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParamsStore } from "@/hooks/useParamsStore";
import { AiOutlineClockCircle, AiOutlineSortAscending } from "react-icons/ai";
import { BsTagFill } from "react-icons/bs";
import { Button } from "../ui/button";

const pageSizeOptions = [4, 8, 12, 16];
const orderButtons = [
  {
    label: "Alfabético",
    icon: AiOutlineSortAscending,
    value: "make",
  },
  {
    label: "Finaliza pronto",
    icon: AiOutlineClockCircle,
    value: "endingSoon",
  },
  {
    label: "Nuevos",
    icon: BsTagFill,
    value: "new",
  },
];

export default function AuctionFilter() {
  const pageSize = useParamsStore((state) => state.pageSize);
  const setParams = useParamsStore((state) => state.setParams);
  const orderBy = useParamsStore((state) => state.orderBy);

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground mr-2">Ordenar por:</span>
        <div className="flex gap-2 flex-wrap">
          {orderButtons.map(({ label, icon: Icon, value }) => (
            <Button
              key={value}
              onClick={() => setParams({ orderBy: value })}
              variant={orderBy === value ? "default" : "outline"}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Items por página:</span>

        <Select
          defaultValue={pageSize.toString()}
          onValueChange={(value) => setParams({ pageSize: parseInt(value) })}
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
