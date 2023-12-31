import type { z } from "groqd"
import { cache } from "react"

import { client } from "./client.server"
import { loadQuery } from "./store"

type Query = string
type Payload<T> = { schema: T; query: Query }

export class BaseQuery<T> {
  query: string
  schema: T

  constructor({ query, schema }: Payload<T>) {
    this.query = query
    this.schema = schema
  }

  public value(): Payload<T> {
    return { schema: this.schema, query: this.query }
  }
}

type QueryExecutor = (query: string, params?: object) => Promise<any>

type BaseType<T = any> = z.ZodType<T>

export const makeSafeQueryRunnerCustom =
  (fn: QueryExecutor) =>
    <T extends BaseType>(
      { query, schema }: BaseQuery<T>,
      params?: object
    ): Promise<z.infer<T>> =>
      fn(query, params).then((res) => schema.parse(res))

export const makeSafeQueryRunnerCustomSourceMeta =
  (fn: QueryExecutor) =>
    <T extends BaseType>(
      { query, schema }: BaseQuery<T>,
      params?: object
    ): Promise<z.infer<T>> =>
      fn(query, params).then((res) => schema.parse(res.data))

const clientFetch = cache(client.fetch.bind(client))

export const tClientNew = makeSafeQueryRunnerCustomSourceMeta(loadQuery)
export const tClient = makeSafeQueryRunnerCustom((query, params) =>
  clientFetch(query, params ?? {})
)
