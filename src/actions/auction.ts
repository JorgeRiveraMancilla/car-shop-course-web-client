"use server";

import { Auction } from "@/models/auction";
import { PagedResult } from "@/models/pagedResult";

export async function getData(query: string): Promise<PagedResult<Auction>> {
  const response = await fetch(`http://localhost:6001/search${query}`);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}
