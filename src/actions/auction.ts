"use server";

import { Auction } from "@/models/Auction";
import { PagedResult } from "@/models/PagedResult";

export async function getData(
  pageNumber: number = 1
): Promise<PagedResult<Auction>> {
  const response = await fetch(
    `http://localhost:6001/search?pageSize=8&pageNumber=${pageNumber}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}
