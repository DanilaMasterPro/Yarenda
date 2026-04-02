import { gql } from "./client";

// ── Types ────────────────────────────────────────────────────────────────────

export interface PriceInput {
  fromDays: number;
  price: number;
}

export interface CreateProductInput {
  category: string;
  title: string;
  description: string;
  prices: PriceInput[];
  locationIds: string[];
  cancelCondition: string;
  marketPrice: number;
  images: string[];
}

export interface CreateProductResult {
  id: string;
  title: string;
  category: string;
}

// ── API Functions ────────────────────────────────────────────────────────────

export async function createProductRequest(
  input: CreateProductInput,
): Promise<CreateProductResult> {
  const pricesGql = input.prices
    .map((p) => `{ fromDays: ${p.fromDays}, price: ${p.price} }`)
    .join("\n      ");

  const locationIdsGql = input.locationIds
    .map((id) => JSON.stringify(id))
    .join(", ");

  const imagesGql = input.images.map((u) => JSON.stringify(u)).join(", ");

  const data = await gql<{ createProduct: CreateProductResult }>(`
    mutation {
      createProduct(input: {
        category: ${JSON.stringify(input.category)}
        title: ${JSON.stringify(input.title)}
        description: ${JSON.stringify(input.description)}
        prices: [
          ${pricesGql}
        ]
        locationIds: [${locationIdsGql}]
        cancelCondition: ${JSON.stringify(input.cancelCondition)}
        marketPrice: ${input.marketPrice}
        images: [${imagesGql}]
      }) {
        id
        title
        category
      }
    }
  `);
  return data.createProduct;
}
