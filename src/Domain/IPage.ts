export interface IPage {
  id: string,
  date: Date,
  urlSegment: string,
  title: string,
  body: string,
  images: string[],
  mainImage?: string,
}

export const defaultPage : IPage = {
  id: '',
  title: '',
  body: '',
  urlSegment: '',
  mainImage: '',
  images: Array<string>(),
  date: new Date()
}