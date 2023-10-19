export const links : ILink[] = [
  {name: 'Home', path: '/'},
  {name: 'Holy Mass', path: '/holy-mass'},
  {name: 'Bible Group', path: '/bible-group'},
  {name: 'Choir', path: '/choir'},
  {name: 'Legion of Mary', path: '/legion-of-mary'},
  {name: 'News', path: '/news'},
  {name: 'Contacts', path: '/contacts'}
]

export interface ILink {
  name: string,
  path: string
}