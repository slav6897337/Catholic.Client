export interface INote {
  id: string,
  title: string,
  date: string,
  isChurchNote: boolean,
  isHomeNote: boolean,
  additionalTitle: string,
  info: string,
}

export const defaultNotes : INote = {
  id: '',
  title: '',
  date: '',
  additionalTitle: '',
  info: '',
  isChurchNote: false,
  isHomeNote: true,
}