import React, {useEffect, useRef, useState} from 'react';
import styles from './AllNews.module.css';
import SpecificNews from './SpecificNews';
import {IBibleQuote} from "../../Domain/IBibleQuote";
import {INews} from "../../Domain/INews";
import Api from "../../Utiles/Api";
import SwiperCore, {Navigation, Pagination} from 'swiper';
import {Swiper, SwiperRef, SwiperSlide, useSwiper} from 'swiper/react';

const defaultNews: INews[] = [{
  title: 'Text Title1',
  date: new Date(),
  description: 'English Bible Group is currently meeting every Thursday, 18:00, at Dom Quo Vadis, Bratislava. For more information click the icon on the menu bar near the top of this web page.',
  link: '/'
},
  {
    title: 'Text Title2',
    date: new Date(),
    description: 'English Bible Group is currently meeting every Thursday, 18:00, at Dom Quo Vadis, Bratislava. For more information click the icon on the menu bar near the top of this web page.',
    link: '/'
  },
  {
    title: 'Text Title3',
    date: new Date(),
    description: 'English Bible Group is currently meeting every Thursday, 18:00, at Dom Quo Vadis, Bratislava. For more information click the icon on the menu bar near the top of this web page.',
    link: '/'
  },
  {
    title: 'Text Title4',
    date: new Date(),
    description: 'English Bible Group is currently meeting every Thursday, 18:00, at Dom Quo Vadis, Bratislava. For more information click the icon on the menu bar near the top of this web page.',
    link: '/'
  }
];

const specificNewsWidth = 22 * 16 + 16 * 2;



const AllNews: React.FC = () => {
  const [news, setNews] = React.useState<INews[]>(defaultNews);
  const [width, setWidth] = useState(window.innerWidth);


  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const fetchItems = async () => {
    setNews((prevItems) => [...prevItems, ...defaultNews]);
  };

  const handleSwiperSlideChange = async (swiper: SwiperCore) => {
    const {isEnd} = swiper;
    if (isEnd) {
      await fetchItems();
    }
  };

  return (
    <div className={styles.allNews}>
      <h1 className={styles.allNewsTitle}>News</h1>
      <div className={styles.allNewsContainer}>
        <Swiper
          slidesPerView={Math.floor(width / specificNewsWidth)}
          spaceBetween={20}
          navigation={true}
          modules={[Pagination, Navigation]}
          pagination={{
            clickable: true,
            horizontalClass: styles.swiperPagination
          }}

          onReachEnd={handleSwiperSlideChange}
          wrapperClass={styles.swiperWrapper}
        >
          {news.map((item, index) => (
            <SwiperSlide key={index}>
              <SpecificNews
                title={`${item.title} ${index}`}
                date={item.date}
                description={item.description}
                link={item.link}
              />
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>
  );
};

export default AllNews;

