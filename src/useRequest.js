import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";

const API_URL = ` http://localhost:4000/graphql`;

const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
});

export function useReadShortestPath(readShortestPathId) {
  return useQuery(["get-shortest-path", readShortestPathId], async () => {
    const { readShortestPath } = await graphQLClient.request(
      gql`
        query ($readShortestPathId: String!) {
          readShortestPath(id: $readShortestPathId) {
            id
            name
            country
            distance
            latitude
            longitude
          }
        }
      `,
      { readShortestPathId }
    );
    return readShortestPath;
  });
}

export function useReadAllCitiesInfo() {
  return useQuery(["get-all-countryInfo"], async () => {
    const { readCountryInfo } = await graphQLClient.request(
      gql`
        query {
          readCountryInfo {
            id
            name
            country
          }
        }
      `
    );
    return readCountryInfo;
  });
}
