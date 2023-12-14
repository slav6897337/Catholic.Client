export interface IPage {
  id: string,
  date: Date,
  urlSegment: string,
  title: string,
  body: string,
  bodyText?: string,
  images: string[],
  mainImage?: string,
}

export const defaultPage : IPage = {
  id: '',
  title: 'English speaking Catholic community in Slovakia Bratislava. ',
  body: '',
  urlSegment: '',
  mainImage: '',
  images: Array<string>(),
  date: new Date()
}