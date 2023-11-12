export interface INote {
  id: string,
  title: string,
  date: Date,
  isChurchNote: boolean,
  isHomeNote: boolean,
  additionalTitle: string,
  info: string,
}

export const defaultNotes : INote = {
  id: '',
  title: '',
  date: new Date(),
  additionalTitle: '',
  info: '',
  isChurchNote: false,
  isHomeNote: true,
}