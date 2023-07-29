import React from 'react';
import SpecificNews from './SpecificNews';
import {INews} from "../../Domain/INews";
import Gallery from "../Carousel/Gallery";
import Api from "../../Utiles/Api";

interface IProps {
  holyMassOnly?: boolean;
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

    const request = {
      skip: news.length,
      take: news.length + 5,
      holyMassOnly: props.holyMassOnly ?? false
    }

    Api.getNews(request).then((response) => {
      setNews((prevItems) => [...prevItems, ...response.items]);
      setHasMore(response.count > response.skip + response.take);
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