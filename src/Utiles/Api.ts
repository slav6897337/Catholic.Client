import Http from './Http';
import {IBibleQuote} from '../Domain/IBibleQuote';
import {IPage} from "../Domain/IPage";
import {IHeader} from "../Domain/IHeader";
import {INote} from "../Domain/INote";
import {IRequestQuery} from "../Domain/IRequestQuery";
import {INews} from "../Domain/INews";
import {IPaging} from "../Domain/IPaging";
import {IAdmin} from "../Domain/IAdmin";

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

  getNotes: async (request: IRequestQuery) => await Http.get<INote[]>(`${baseUrl}/api/notes${query(request)}`),
  createNote: async (note: INote, adminToken: string) =>
    await Http.post<INote>(`${baseUrl}/api/notes`, note, [authHeader(adminToken)]),
  updateNote: async (note: INote, adminToken: string) =>
    await Http.put<INote>(`${baseUrl}/api/notes`, note, [authHeader(adminToken)]),
  deleteNote: async (id: string, adminToken: string) =>
    await Http.delete<INote>(`${baseUrl}/api/notes/${id}`, [authHeader(adminToken)]),

  getNews: async (request: IRequestQuery) =>
    await Http.get<IPaging<INews>>(`${baseUrl}/api/news${query(request)}`),
  createNews: async (news: INews, adminToken: string) =>
    await Http.post<INews>(`${baseUrl}/api/news`, news, [authHeader(adminToken)]),
  updateNews: async (news: INews, adminToken: string) =>
    await Http.put<INews>(`${baseUrl}/api/news`, news, [authHeader(adminToken)]),
  deleteNews: async (id: string, adminToken: string) =>
    await Http.delete<INews>(`${baseUrl}/api/news/${id}`, [authHeader(adminToken)]),

  getImageUrl: (route: string) => `${baseUrl}/api${route}`,
  uploadImage: async (formData: FormData, adminToken: string) =>
    await Http.uploadFile(`${baseUrl}/api/images`, formData, [authHeader(adminToken)]),
  listImages: async () => await Http.get<string[]>(`${baseUrl}/api/images`),
  deleteImage: async (fileName: string, adminToken: string) =>
    await Http.delete<string>(`${baseUrl}/api/images/${fileName}`, [authHeader(adminToken)]),

login: async (admin: IAdmin) =>
  await Http.post<IAdmin>(`${baseUrl}/api/admins/token`, admin),
  void: ()=>{}
};

export default Api;