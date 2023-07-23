import React, {useEffect} from 'react';
import './HomePage.css';
import {useLocation} from "react-router-dom";
import Api from "../Utiles/Api";
import log from "loglevel";

interface IProps {

}

interface IState {
  selectedDate: Date;
}

const NewsPage: React.FC<IProps> = (props) => {
  const location = useLocation();
  const [page, setPage] = React.useState<string>("");

  useEffect(() => {
    const pageSegment = location.pathname.split("/")[1];

    if (pageSegment) {
      try {
        Api.getPage(pageSegment).then((pageInfo) => {
          if (pageInfo) {
            setPage(pageInfo.body);
          }
        });
      } catch (e) {
        log.info(e);
      }

    }
  }, [location]);

  return (
    <div className="home">
      <div className="home__background">
        {page}
      </div>
    </div>
  );
}

export default NewsPage;