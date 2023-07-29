export interface IPaging<T> {
  count: number
  items: T[],
  skip: number,
  take: number,
}