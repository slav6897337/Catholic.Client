import React, {FunctionComponent, useEffect} from 'react';
import log from "loglevel";
import Api from "../../Utiles/Api";
import {defaultPage, IPage} from "../../Domain/IPage";
import Loading from "../../Components/PageElements/Loading";
import {useParams} from "react-router-dom";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from "./EditNewsPage.module.css";
import Button from "../../Components/StyledComponents/Button";
import AdminHelper from "../../Utiles/Admin";
import {IAdmin} from "../../Domain/IAdmin";
import {defaultNews, INews} from "../../Domain/INews";
import PageEditor from "../../Components/AdminPage/PageEditor";
import Checkbox from "../../Components/StyledComponents/Checkbox";
import {useScrollToTop} from "../../hookcs/useScrollToTop";
import Body from "../../Components/PageElements/Body";

const EditNewsPage: FunctionComponent = () => {
  const {id} = useParams();
  const [admin, setAdmin] = React.useState<IAdmin | null>(null);
  const [news, setNews] = React.useState<INews>(defaultNews);
  const [page, setPage] = React.useState<IPage>(defaultPage);
  const [loading, setLoading] = React.useState<boolean>(true);
  useScrollToTop();

  useEffect(() => {
    const admin = AdminHelper.getAdminCredentials();
    setAdmin(admin);

    if (!id) {
      setLoading(false);
      return;
    }
    try {
      Api.getAllNews().then((newsResponse) => {
        const newsBuId = newsResponse?.find((item) => item.id === id);
        if (newsBuId) {
          setNews(newsBuId);
          if (newsBuId?.link) {
            Api.getPage(newsBuId.link).then((page) => {
              if (page) {
                page.images ??= [];
                setPage(page);
              }
              setLoading(false);
            });
          } else {
            setLoading(false);
          }
        }
      });
    } catch (e) {
      log.info(e);
    }
  }, []);

  const save = async () => {
    setLoading(true);
    const title = news.title ? news.title : page.title;
    const image = resizedImage();
    const urlSegment = page.urlSegment ? page.urlSegment : page.body || image ? generateUrlSegment(title) : '';
    const newPage:IPage = {...page, title, urlSegment};
    const newNews:INews = {...news, title, description: page.bodyText ?? '', link: urlSegment, image: image};
    await saveNews(newNews);
    await savePage(newPage);
    setLoading(false);

    window.history.back();

  };

  const savePage = async (pageForSaving:IPage) => {
    if (!pageForSaving || !(pageForSaving.body || pageForSaving.mainImage || pageForSaving.images)) return;
    let newPage: IPage;
    if (!pageForSaving.id) {
      newPage = await Api.createPage(pageForSaving, admin?.token ?? '');
    } else {
      newPage = await Api.updatePage(pageForSaving.id, pageForSaving, admin?.token ?? '');
    }
    setPage(newPage);
  };

  const saveNews = async (newsForSaving: INews) => {
    if (!newsForSaving) return;
    let newNews: INews;
    if (!newsForSaving.id) {
      newNews = await Api.createNews(newsForSaving, admin?.token ?? '');
    } else {
      newNews = await Api.updateNews(newsForSaving.id, newsForSaving, admin?.token ?? '');
    }
    setNews(newNews);
  };

  const updateTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage({...page, title: event.target.value} as IPage)
    setNews({...news, title: event.target.value, link: page.body ? generateUrlSegment(news.title) : null} as INews)
  };

  const updatePage = (page: IPage) => {
    setPage(page);
    if (!news.link) {
      setNews({...news, link: generateUrlSegment(news.title)})
    }
  };

  const generateUrlSegment = (title: string) => {
    return title.toLowerCase().trim().replace(/ /g, '-');
  }

  const resizedImage = () => {
    if(!page || !(page.mainImage || page.images?.length)) return;
    const image = page.mainImage ? page.mainImage : page.images[0];
    const lastIndex = image.lastIndexOf("/");
    return image.substring(0, lastIndex + 1) + 'min_' + image.substring(lastIndex + 1);
  };

  if (loading) return (
    <Body center={true}>
      <Loading/>
    </Body>);

  return (
    <Body className={`padding-top`}>

      <div className={styles.blockContainer}>
        <p className={styles.header}>Title</p>
        <input className={styles.inputStyling} type="text" value={news.title ?? page?.title}
               onChange={e => updateTitle(e)}/>
      </div>

      <PageEditor page={page ?? {} as IPage} onChange={updatePage} showTitle={false} resizeHeight={240}/>

      <Checkbox
        value={news.isHomeNews}
        text='Show on Catholic.sk'
        onClick={isHomeNews => setNews({...news, isHomeNews} as INews)}
      />

      <Checkbox
        value={news.isChurchNews}
        text='Show on Hollymass.sk'
        onClick={isChurchNews => setNews({...news, isChurchNews} as INews)}
      />

      <Button
        className={styles.saveButton}
        icon='/icons/save.png'
        text='Save'
        onClick={save}/>

    </Body>
  );
}


export default EditNewsPage;