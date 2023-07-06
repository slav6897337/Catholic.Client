import React, {useEffect} from 'react';
import './HomePage.css';
import {useLocation} from "react-router-dom";

interface IProps {

}

interface IState {
  selectedDate: Date;
}

const NewsPage: React.FC<IProps> = (props) => {
  const location = useLocation();
  const [page, setPage] = React.useState<string>("");

  useEffect(() => {

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