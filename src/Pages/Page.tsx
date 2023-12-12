import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import styles from "./Page.module.css";
import Header from "../Components/PageElements/Header";
import ImageGallery from "../Components/Carousel/ImageGallery";
import Api from "../Utiles/Api";
import log from "loglevel";
import {defaultPage, IPage} from "../Domain/IPage";
import {Image} from "../Components/StyledComponents/Image";
import {useScrollToTop} from "../hookcs/useScrollToTop";
import {NotFound} from "../Components/StyledComponents/NotFound";
import BlurContainer from "../Components/PageElements/BlurContainer";
import {links} from "../Navigation/Lincks";
import ImageViewer from "../Components/Carousel/ImageViewer";

interface IPageProps {
  preloadPage?: IPage;
  onPageLoad: (page: IPage) => void;
  onLoading: (loading: boolean) => void;
  isNotNewsPageFlag?: (flag: boolean) => void;
  className?: string;
  blurContainer?: boolean;
  children: React.ReactNode;
}

export const Page: React.FC<IPageProps> = (
  {
    children,
    preloadPage,
    onPageLoad,
    onLoading,
    className,
    isNotNewsPageFlag,
    blurContainer = true
  }) => {
  useScrollToTop();
  const location = useLocation();
  const [page, setPage] = React.useState<IPage>(preloadPage ?? defaultPage);
  const [containerHeight, setContainerHeight] = useState<number>( 0);

  useEffect(() => {
    onLoading(true);
    if (isNotNewsPageFlag) {
      isNotNewsPageFlag(isNotNewsPage);
    }

    if (pagePath) {
      try {
        Api.getPage(pagePath).then((pageInfo) => {
          if (pageInfo) {
            setPage(pageInfo);
            onPageLoad(pageInfo);
          }
          onLoading(false);
        });
      } catch (e) {
        log.info(e);
      }
    }
  }, [location]);

  const pagePath = location.pathname.split("/")[1];
  const isNotNewsPage = !links.some(l => l.path === `/${pagePath}`);
  console.log(pagePath);

  console.log(isNotNewsPage);

  if (!page) return (
    <div className='body center'>
      <NotFound/>
    </div>
  );

  return (
    <>
      <Header>
        <div className={styles.titleContainer}>
          <p>{isNotNewsPage ? 'News' : page.title}</p>
        </div>
      </Header>
      <div className={`body ${styles.bodyAdditionalPadding}`}>
        {page.mainImage ?
          <Image
            className={styles.backgroundImage}
            alt='Bacground Image'
            selfSrc={page.mainImage}
            onSizeChange={s => setContainerHeight(s.size.height)}
          />
          : null}

        {blurContainer ?
          <BlurContainer
            className={`${page.mainImage
              ? styles.bodyBlurContainerWithImageOnBack
              : styles.bodyBlurContainer} ${className}`}
            title={page.title}
            style={{minHeight: page.mainImage ?containerHeight : undefined}}>
            {children}
          </BlurContainer>
          : children}

        {page.images.length ?
          isNotNewsPage ?
            <ImageViewer images={page?.images}/> :
            <ImageGallery
              className={styles.bodyImageGallery}
              images={page.images ?? []}
            />
          : null}
      </div>
    </>
  );

}
