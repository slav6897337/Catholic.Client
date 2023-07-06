import React, {useEffect, useRef, useState} from 'react';
import styles from './AllNews.module.css';
import SpecificNews from './SpecificNews';
import {IBibleQuote} from "../../Domain/IBibleQuote";
import {INews} from "../../Domain/INews";
import Api from "../../Utiles/Api";
import SwiperCore, {Navigation, Pagination} from 'swiper';
import {Swiper, SwiperRef, SwiperSlide, useSwiper} from 'swiper/react';

const defaultNews: INews[] = [{
  title: 'English Bible Group',
  date: new Date(),
  description: 'English Bible Group is currently meeting every Thursday, 18:00, at Dom Quo Vadis, Bratislava. For more information click the icon on the menu bar near the top of this web page.',
  link: '/'
},
  {
    title: 'Catholic Brochure',
    date: new Date(),
    description: 'Free Catholic brochures in 10 languages are being distributed by the Legion of Mary in Slovakia and Europe. Contact us for copies or to support this project.',
    link: '/'
  },
  {
    title: 'Saint Edith Stein',
    date: new Date(),
    description: 'Spiritual reading while staying at home.',
    link: '/'
  },
  {
    title: 'Holy Mass',
    date: new Date(),
    description: 'July 7 at 6.30pm - First Friday of July',
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
                title={item.title}
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

