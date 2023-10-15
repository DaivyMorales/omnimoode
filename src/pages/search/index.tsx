"use client";

import { Product } from "@/types";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

const fetchProducts = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
};

export default function SearchPage() {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;
  const encodedSearchQuery = encodeURI(searchQuery || "");

  const { data, isLoading } = useSWR(
    `/api/search?q=${encodedSearchQuery}`,
    fetchProducts
  );

  if (!data?.products) {
    return null;
  }

  return (
    <div>
      <h3 className="underline">Resultados: {data.products.length}</h3>
      {data.products.map((product: Product) => (
        <div key={product.id}>
          {product.name} <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
}
