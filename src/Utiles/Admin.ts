import {IAdmin} from "../Domain/IAdmin";

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
};

export default AdminHelper;