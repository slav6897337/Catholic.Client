import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import styles from "./Page.module.css";
import ImageGallery from "../Components/Carousel/ImageGallery";
import Api from "../Utiles/Api";
import log from "loglevel";
import {defaultPage, IPage} from "../Domain/IPage";
import {Image} from "../Components/StyledComponents/Image";
import {useScrollToTop} from "../hookcs/useScrollToTop";
import {NotFound} from "../Components/StyledComponents/NotFound";
import BlurContainer from "../Components/PageElements/BlurContainer";
import {links} from "../Navigation/Lincks";
import useWindowDimensions from "../hookcs/useWindowDimensions";
import Body from "../Components/PageElements/Body";

interface IPageProps {
  preloadPage?: IPage;
  onPageLoad: (page: IPage) => void;
  onLoading: (loading: boolean) => void;
  isNotNewsPageFlag?: (flag: boolean) => void;
  className?: string;
  blurContainer?: boolean;
  children: React.ReactNode;
  showNotFound?: boolean;
}

export const Page: React.FC<IPageProps> = (
  {
    children,
    preloadPage,
    onPageLoad,
    onLoading,
    className,
    isNotNewsPageFlag,
    blurContainer = true,
    showNotFound = true
  }) => {
  useScrollToTop();
  const {width} = useWindowDimensions();
  const location = useLocation();
  const [page, setPage] = React.useState<IPage>(preloadPage ?? defaultPage);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const [notFound, setNotFound] = useState<boolean>(false);

  const pagePath = location.pathname.split("/")[1];
  const isNotNewsPage = !links.some(l => l.path === `/${pagePath}`);
  const hasBackgroundImage = page?.mainImage && width > 760;

  useEffect(() => {
    onLoading(true);
    if (isNotNewsPageFlag) {
      isNotNewsPageFlag(isNotNewsPage);
    }
    const script = document.createElement('script');

    if (pagePath) {
      try {
        Api.getPage(pagePath).then((pageInfo) => {
          if (pageInfo) {
            document.title = pageInfo.title + defaultPage.title;
            script.type = 'application/ld+json';
            const type = isNotNewsPage ? 'Article' : 'NewsArticle';
            script.innerHTML = JSON.stringify({
              "@context": "https://schema.org",
              "@type": type,
              "headline": pageInfo.title,
              "datePublished": pageInfo.date
            });
            document.head.appendChild(script);
            setPage(pageInfo);
            onPageLoad(pageInfo);
          } else if (showNotFound) {
            setNotFound(true);
          }
          onLoading(false);
        });
      } catch (e) {
        log.info(e);
      }
    }

  }, [location]);


  if (notFound) return (
    <Body center={true}>
      <NotFound/>
    </Body>
  );

  return (
    <Body
      className={styles.bodyAdditionalPadding}
      headerContent={
        <div className={styles.titleContainer}>
          <p>{isNotNewsPage ? 'News' : page.title}</p>
        </div>
      }
    >
      {hasBackgroundImage ?
        <Image
          className={styles.backgroundImage}
          alt='Bacground Image'
          selfSrc={page.mainImage}
          onSizeChange={s => setContainerHeight(s.size.height)}
        />
        : null}

      {blurContainer ?
        <BlurContainer
          className={`${hasBackgroundImage
            ? styles.bodyBlurContainerWithImageOnBack
            : styles.bodyBlurContainer} ${className}`}
          title={page.title}
          style={{minHeight: hasBackgroundImage ? containerHeight : undefined}}>
          {children}
        </BlurContainer>
        : children}

      {page.images.length ?
        isNotNewsPage ?
          null :
          //<ImageViewer images={page?.images}/> :
          <ImageGallery
            className={styles.bodyImageGallery}
            images={page.images ?? []}
          />
        : null}
    </Body>
  );

}
