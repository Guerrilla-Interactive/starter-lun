"use client"

import { UseQueryOptionsDefinedInitial, useQuery } from "@sanity/react-loader"

type DataComponentFn<T> = (data: T) => JSX.Element

interface PreviewLoadingErrorHOCProps<T> {
  initial: T,
  query: string,
  queryParams?: Record<string, string>,
  successFn: DataComponentFn<T>
}

export function PreviewLoadingErrorHOC<T>(props: PreviewLoadingErrorHOCProps<T>) {
  const options = { initial: { data: props.initial } } as UseQueryOptionsDefinedInitial<T>
  const query = props.query
  const queryParams = props.queryParams ?? {}
  const { data, loading, error } = useQuery<T>(query, queryParams, options)

  if (data) return props.successFn(data)
  if (loading) return <div>loading...</div>
  // At this point, there's no data and page isn't loading,
  // thus, we assume error has been ecountered
  console.error("data", data)
  console.error("error", error)
  return <div>no data, check console for error details</div>
}
