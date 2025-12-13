
import { defineLive } from "next-sanity/live";
import { client } from './client'

export const { sanityFetch, SanityLive } = defineLive({
  client,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  serverToken: false as any, 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  browserToken: false as any,
});
