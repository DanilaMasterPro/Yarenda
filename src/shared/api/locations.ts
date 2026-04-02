import { gql } from "./client";

// ── Types ────────────────────────────────────────────────────────────────────

export interface CreateLocationInput {
  name: string;
  address: string;
  coords: [number, number];
}

export interface LocationResult {
  id: string;
  name: string;
  address: string;
}

// ── API Functions ────────────────────────────────────────────────────────────

export async function createLocationRequest(
  input: CreateLocationInput,
): Promise<LocationResult> {
  const data = await gql<{ createLocation: LocationResult }>(`
    mutation {
      createLocation(input: {
        name: ${JSON.stringify(input.name)}
        address: ${JSON.stringify(input.address)}
        coords: [${input.coords[0]}, ${input.coords[1]}]
      }) {
        id
        name
        address
      }
    }
  `);
  return data.createLocation;
}
