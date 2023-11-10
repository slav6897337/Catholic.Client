import React, {FunctionComponent, useEffect} from 'react';
import log from "loglevel";
import Api from "../../Utiles/Api";
import {defaultPage, IPage} from "../../Domain/IPage";
import Loading from "../../Components/PageElements/Loading";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from "./EditHomePage.module.css";
import Button from "../../Components/StyledComponents/Button";
import AdminHelper from "../../Utiles/Admin";
import {IAdmin} from "../../Domain/IAdmin";
import BodyEditor from "../../Components/AdminPage/BodyEditor";
import ImagePicker from "../../Components/AdminPage/ImagePicker";

const EditHomePage: FunctionComponent = () => {
  const [admin, setAdmin] = React.useState<IAdmin | null>(null);
  const [page, setPage] = React.useState<IPage>(defaultPage);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {

    try {
      const admin = AdminHelper.getAdminCredentials();
      setAdmin(admin);

      Api.getPage('home').then((page) => {
        if (page) {
          page.images ??= [];
          setPage(page);
          setLoading(false);
        }
      });
    } catch (e) {
      log.info(e);
    }
  }, []);

  const save = async () => {
    if (!page || !page.body || !page.id) return;
    setLoading(true);

    page.urlSegment = 'home';
    await Api.updatePage(page.id, page, admin?.token ?? '');
    setLoading(false);

    window.close()
  };



  if (loading) return (
    <div className={`body center`}>
      <Loading/>
    </div>);

  return (
    <div className={`body padding-top`}>


      <BodyEditor
        body={page.body}
        title='Main Text'
        onBodyUpdate={body => setPage({...page, body} as IPage)}
      />

      <ImagePicker
        title='Image Gallery'
        images={page.images}
        mainImage={page.mainImage}
        crop={{width: 790, height: 520}}
        onChange={(images, mainImage) => setPage({...page, images, mainImage})}
      />


      <Button
        className={styles.saveButton}
        icon='/icons/save.png'
        text='Save'
        onClick={save}/>
    </div>
  );
}


export default EditHomePage;