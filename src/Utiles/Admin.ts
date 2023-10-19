import {IAdmin} from "../Domain/IAdmin";
import {IPage} from "../Domain/IPage";
import Api from "./Api";
import {INews} from "../Domain/INews";
import {INote} from "../Domain/INote";

const AdminHelper = {
  getAdminCredentials: (redirectToLogin = true) => {
    const adminStr = localStorage.getItem('admin-info');
    let adminInfo: IAdmin | null = null;
    if (adminStr) {
      adminInfo = JSON.parse(adminStr ?? '');
    }

    if (redirectToLogin && !adminInfo?.token) {
      window.open('/admin/log-in', '_self');
    }

    return adminInfo;
  },
  setAdminCredentials: (admin: IAdmin) => {
    if (admin?.token) {
      localStorage.setItem('admin-info', JSON.stringify(admin));
      window.open('/admin', '_self');
    }
  },
  savePage: async (page: IPage, admin: string, closeAfterSaving: false) => {
    if (!page) return;

    if (!page.id) {
      page.urlSegment = page.title.toLowerCase().trim().replace(/ /g, '-');
      await Api.createPage(page, admin);
    } else {
      await Api.updatePage(page.id, page, admin);
    }

    if(closeAfterSaving){
      window.close()
    }
  },
  saveNews: async (news: INews, admin:string, closeAfterSaving: false) => {
    if (!news) return;

    if (!news.id) {
      await Api.createNews(news, admin);
    } else {
      await Api.updateNews(news.id, news, admin);
    }

    if(closeAfterSaving){
      window.close()
    }
  },
  saveNotes: async (note: INote, admin:string, closeAfterSaving: false) => {
    if (!note) return;

    if (!note.id) {
      await Api.createNote(note, admin);
    } else {
      await Api.updateNote(note.id, note, admin);
    }

    if(closeAfterSaving){
      window.close()
    }
  },
};

export default AdminHelper;