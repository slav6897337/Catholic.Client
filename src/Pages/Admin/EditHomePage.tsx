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
import Body from "../../Components/PageElements/Body";

const EditHomePage: FunctionComponent = () => {
  const [admin, setAdmin] = React.useState<IAdmin | null>(null);
  const [page, setPage] = React.useState<IPage>(defaultPage);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {

    try {
      window.scrollTo(0, 0);
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

    window.history.back();
  };



  if (loading) return (
    <Body center={true}>
      <Loading/>
    </Body>);

  return (
    <Body className={`padding-top`}>
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
        resizeWidth={790}
        onChange={(images, mainImage) => setPage({...page, images, mainImage})}
        takeMinImage={true}
      />


      <Button
        className={styles.saveButton}
        icon='/icons/save.png'
        text='Save'
        onClick={save}/>
    </Body>
  );
}


export default EditHomePage;