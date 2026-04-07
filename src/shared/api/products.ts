import { gql, API_URL, imageUrl } from "./client";
import type {
  Product,
  ProductDetail,
  CreateProductInput,
  CreateProductResult,
} from "@/shared/types/product.types";

export { imageUrl };
export type { Product, ProductDetail, CreateProductInput, CreateProductResult };

/** Get the price for the lowest fromDays tier (base daily price) */
export function getBasePrice(
  prices: { fromDays: number; price: number }[],
): number {
  if (!prices.length) return 0;
  return prices.reduce((min, p) => (p.fromDays < min.fromDays ? p : min)).price;
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

// ── Fetch Products ───────────────────────────────────────────────────────────

export async function fetchProducts(
  skip = 0,
  take = 10,
): Promise<Product[]> {
  const data = await gql<{ products: Product[] }>(`
    query {
      products(pagination: { skip: ${skip}, take: ${take} }) {
        id
        title
        ownerId
        images
        prices
        location {
          address
          coords
        }
        owner {
          username
          avatar
        }
      }
    }
  `);
  return data.products;
}

// ── Fetch Single Product ─────────────────────────────────────────────────────

export async function fetchProduct(id: string): Promise<ProductDetail> {
  const data = await gql<{ product: ProductDetail }>(
    `
      query GetProduct($id: String!) {
        product(id: $id) {
          id
          title
          category
          description
          prices
          rating
          reviewCount
          images
          cancelCondition
          createdAt
          owner {
            id
            email
            username
            avatar
            description
            phone
            createdAt
            products {
              id
              title
              category
              images
              prices
              location {
                address
                coords
              }
            }
          }
          location {
            id
            name
            address
            coords
          }
          reviews {
            id
            rating
            comment
            userId
            createdAt
          }
        }
      }
    `,
    { id },
  );
  return data.product;
}
