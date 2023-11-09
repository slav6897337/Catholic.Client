import React from 'react';
import SpecificNews from './SpecificNews';
import {INews} from "../../Domain/INews";
import Gallery from "../Carousel/Gallery";
import Api from "../../Utiles/Api";

interface IProps {
  holyMassOnly?: boolean;
  homeOnly?: boolean;
  containerStyle?: string;
}

const AllNews: React.FC<IProps> = (props) => {
  const [news, setNews] = React.useState<INews[]>([]);
  const [hasMore, setHasMore] = React.useState<boolean>(true);

  // React.useEffect(() => {
  //   console.log('useEffect');
  //   fetchItems().catch(Api.void);
  // }, []);


  const fetchItems = async () => {
    if (!hasMore) return;

    Api.getAllNews().then((response) => {
      if(props.homeOnly) response = response.filter(n => n.isHomeNews);
      if(props.holyMassOnly) response = response.filter(n => n.isChurchNews);
      setNews(response);
      setHasMore(false);
    });
  };

  return (
    <Gallery
      title={'News'}
      onReachEnd={fetchItems}
      items={
        news.map((item, index) => (
          <SpecificNews
            title={item.title}
            date={item.date}
            description={item.description}
            link={item.link}
          />
        ))
      }
    />
  );
};

export default AllNews;