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
  coords?: [number, number];
}

// ── API Functions ────────────────────────────────────────────────────────────

export async function getUserLocationsRequest(): Promise<LocationResult[]> {
  const data = await gql<{ profile: { locations: LocationResult[] } }>(`
    query {
      profile {
        locations {
          id
          name
          address
          coords
        }
      }
    }
  `);
  return data.profile.locations;
}

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
