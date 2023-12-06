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
import {Collapse} from "../../Components/StyledComponents/Collapse";
import {useScrollToTop} from "../../hookcs/useScrollToTop";

const EditNewsPage: FunctionComponent = () => {
  const {id} = useParams();
  const [admin, setAdmin] = React.useState<IAdmin | null>(null);
  const [news, setNews] = React.useState<INews>(defaultNews);
  const [page, setPage] = React.useState<IPage>(defaultPage);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [collapse, setCollapse] = React.useState<boolean>(false);
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
                setCollapse(true);
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
    const urlSegment = page.urlSegment ? page.urlSegment : page.body ? generateUrlSegment(title) : '';
    const newPage:IPage = {...page, title, urlSegment};
    const newNews:INews = {...news, title, link: urlSegment};
    await saveNews(newNews);
    await savePage(newPage);
    setLoading(false);

    window.history.back();

  };

  const savePage = async (pageForSaving:IPage) => {
    if (!pageForSaving || !pageForSaving.body) return;
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

  if (loading) return (
    <div className={`body center`}>
      <Loading/>
    </div>);

  return (
    <div className={`body padding-top`}>

      <div className={styles.blockContainer}>
        <p className={styles.header}>Title</p>
        <input className={styles.inputStyling} type="text" value={news.title ?? page?.title}
               onChange={e => updateTitle(e)}/>
      </div>

      <div className={styles.blockContainer}>
        <p className={styles.header}>News Description</p>
        <textarea
          className={styles.inputDescriptionStyling}
          maxLength={200}
          value={news.description}
          onChange={e => setNews({...news, description: e.target.value} as INews)}
        />
      </div>

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

      <Collapse isExpanded={collapse} text='Add Page for News' onClick={value => setCollapse(value)}>
        <PageEditor page={page ?? {} as IPage} onChange={updatePage} showTitle={false}/>
      </Collapse>

      <Button
        className={styles.saveButton}
        icon='/icons/save.png'
        text='Save'
        onClick={save}/>

    </div>
  );
}


export default EditNewsPage;