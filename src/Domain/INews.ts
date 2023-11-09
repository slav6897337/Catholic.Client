export interface INews {
  id: string,
  title: string,
  date: Date,
  description: string,
  isChurchNews: boolean,
  isHomeNews: boolean,
  link?: string,
}

export const defaultNews : INews = {
  id: '',
  title: '',
  description: '',
  date: new Date(),
  isChurchNews: false,
  isHomeNews: true,
  link: undefined,
}