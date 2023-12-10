import Http from './Http';
import {IBibleQuote} from '../Domain/IBibleQuote';
import {IPage} from "../Domain/IPage";
import {IHeader} from "../Domain/IHeader";
import {INote} from "../Domain/INote";
import {IRequestQuery} from "../Domain/IRequestQuery";
import {INews} from "../Domain/INews";
import {IPaging} from "../Domain/IPaging";
import {IAdmin} from "../Domain/IAdmin";
import IHolyMass from "../Domain/IHolyMass";

const baseUrl = process.env.REACT_APP_API_BASE_URL ?? '';

const authHeader = (adminToken: string): IHeader => ({key: 'Authorization', value: `Bearer ${adminToken}`});
const query = (request: IRequestQuery): string => {
  if (!request || (!request.holyMassOnly && !request.skip && !request.take)) {
    return '';
  }

  const holyMassOnly = request.holyMassOnly ? `holyMassOnly=${request.holyMassOnly}` : '';
  const skip = request.skip ? `skip=${request.skip}` : '';
  const take = request.take ? `take=${request.take}` : '';
  const query = [holyMassOnly, skip, take].filter(q => q).join('&');
  return query ? `?${query}` : '';
};

const resizeQuery = (resizeWidth: number | null, resizeHeight: number | null): string => {
  if (!resizeWidth && !resizeHeight) {
    return '';
  }

  const width = resizeWidth ? `resizeWidth=${resizeWidth}` : '';
  const height = resizeHeight ? `resizeHeight=${resizeHeight}` : '';
  const query = [width,height].filter(q => q).join('&');
  return query ? `?${query}` : '';
};

const Api = {

  getDailyBibleQuote: async () => await Http.get<IBibleQuote>(`${baseUrl}/api/daily-bible-quote`),

  listPages: async () => await Http.get<string[]>(`${baseUrl}/api/pages-list`),
  getPage: async (pageName: string) => await Http.get<IPage>(`${baseUrl}/api/pages/${pageName}`),
  getPages: async () => await Http.get<IPage[]>(`${baseUrl}/api/pages`),
  createPage: async (page: IPage, adminToken: string) =>
    await Http.post<IPage>(`${baseUrl}/api/pages`, page, [authHeader(adminToken)]),
  updatePage: async (id: string, page: IPage, adminToken: string) =>
    await Http.put<IPage>(`${baseUrl}/api/pages/${id}`, page, [authHeader(adminToken)]),
  deletePage: async (id: string, adminToken: string) =>
    await Http.delete(`${baseUrl}/api/pages/${id}`, [authHeader(adminToken)]),

  listHollyMasses: async () => {
    const masses = await Http.get<IHolyMass[]>(`${baseUrl}/api/holy-mass`);
    return masses.map(mass => ({
      ...mass,
      schedule: new Date(mass.schedule)
    }));
  },
  addHollyMass: async (hollyMass: IHolyMass, adminToken: string) =>{
    const newHolyMass = await Http.post<IHolyMass>(`${baseUrl}/api/holy-mass`, hollyMass, [authHeader(adminToken)]);
    return {...newHolyMass, schedule: new Date(newHolyMass.schedule)};
  },
  updateHollyMass: async (id: string, holyMass: IHolyMass, adminToken: string) =>{
    const newHolyMass = await Http.put<IHolyMass>(`${baseUrl}/api/holy-mass/${id}`, holyMass,[authHeader(adminToken)]);
    return {...newHolyMass, schedule: new Date(newHolyMass.schedule)};
  },
  deleteHollyMass: async (id: string, adminToken: string) =>
    await Http.delete(`${baseUrl}/api/holy-mass/${id}`, [authHeader(adminToken)]),

  getNotes: async (request: IRequestQuery) => await Http.get<INote[]>(`${baseUrl}/api/notes${query(request)}`),
  getAllNotes: async () =>
    await Http.get<INote[]>(`${baseUrl}/api/notes/all`),
  createNote: async (note: INote, adminToken: string) =>
    await Http.post<INote>(`${baseUrl}/api/notes`, note, [authHeader(adminToken)]),
  updateNote: async (id: string, note: INote, adminToken: string) =>
    await Http.put<INote>(`${baseUrl}/api/notes/${id}`, note, [authHeader(adminToken)]),
  deleteNote: async (id: string, adminToken: string) =>
    await Http.delete<INote>(`${baseUrl}/api/notes/${id}`, [authHeader(adminToken)]),

  getAllNews: async () =>
    await Http.get<INews[]>(`${baseUrl}/api/news/all`),
  getNews: async (request: IRequestQuery) =>
    await Http.get<IPaging<INews>>(`${baseUrl}/api/news${query(request)}`),
  createNews: async (news: INews, adminToken: string) =>
    await Http.post<INews>(`${baseUrl}/api/news`, news, [authHeader(adminToken)]),
  updateNews: async (id: string, news: INews, adminToken: string) =>
    await Http.put<INews>(`${baseUrl}/api/news/${id}`, news, [authHeader(adminToken)]),
  deleteNews: async (id: string, adminToken: string) =>
    await Http.delete<INews>(`${baseUrl}/api/news/${id}`, [authHeader(adminToken)]),

  getImageUrl: (route: string) => `${baseUrl}${route}`,
  uploadImage: async (
    formData: FormData,
    adminToken: string,
    resizeWidth: number | null = null,
    resizeHeight: number | null = null) =>
    await Http.uploadFile(`${baseUrl}/api/images${resizeQuery(resizeWidth, resizeHeight)}`,
      formData,
      [authHeader(adminToken)]),
  listImages: async () => await Http.get<string[]>(`${baseUrl}/api/images`),
  deleteImage: async (fileName: string, adminToken: string) =>
    await Http.delete<string>(`${baseUrl}/api${fileName}`, [authHeader(adminToken)]),

login: async (admin: IAdmin) =>
  await Http.post<IAdmin>(`${baseUrl}/api/admins/token`, admin),
  void: ()=>{}
};

export default Api;