export const links : ILink[] = [
  {name: 'Home', path: '/'},
  {name: 'Holy Mass', path: '/holy-mass'},
  {name: 'Bible Group', path: '/english-bible-group'},
  {name: 'Choir', path: '/choir'},
  {name: 'Legion of Mary', path: '/legion-of-mary'},
  {name: 'Catholic Table', path: '/catholic-table'},
  {name: 'News', path: '/news'},
  {name: 'Contact', path: '/contacts'}
]

export interface ILink {
  name: string,
  path: string
}