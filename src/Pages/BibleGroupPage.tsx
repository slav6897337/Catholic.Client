import React from 'react';
import {defaultPage, IPage} from "../Domain/IPage";
import {Page} from "./Page";
import GoldLine from "../Components/PageElements/GoldLine";
import Avatar from "../Components/StyledComponents/Avatar";


const BibleGroupPage: React.FC = () => {
  const [page, setPage] = React.useState<IPage>(preloadPage);

  return (
    <Page onPageLoad={p => setPage(p)} onLoading={() => {}} preloadPage={page}>
      <div dangerouslySetInnerHTML={{__html: page.body}}/>

      <GoldLine style={{width: '65%'}}/>

      <Avatar name={"David Reichardt"} photo={"/photo/Dave.png"} position={"Leader"}/>
    </Page>
  );
}

export default BibleGroupPage;

const preloadBody = '<div>\n' +
  '          <p>\n' +
  '            Welcome to English Bible group!\n' +
  '            We are a group of enthusiastic Christians who come together once a week to pray, read, reflect and discuss the\n' +
  '            Old and New Testament in English language.\n' +
  '          </p>\n' +
  '          <p>\n' +
  '            Over the years we have had more than 300 people pass through our group, some just for one visit, others who\n' +
  '            continue to participate.\n' +
  '            Presently we have about 10 individuals participating regularly.\n' +
  '            Whether you are just visiting us one time, or intend to participate regularly, you are most cordially welcome!\n' +
  '          </p>\n' +
  '          <p>\n' +
  '            We are sponsored by Dom Quo Vadis , and meet there each Thursday at 18:00 throughout the year, except for holy\n' +
  '            days when Dom Quo Vadis is closed. (summer months we usually meet at Centrum Salvator, Jakubovo nam. 5,\n' +
  '            Bratislava at 18:00).\n' +
  '          </p>\n' +
  '          <p>\n' +
  '            For more information contact us at: info@catholic.sk\n' +
  '          </p>\n' +
  '          <p>\n' +
  '            Looking forward to seeing you!\n' +
  '          </p>\n' +
  '        </div>'

const preloadPage: IPage = {
  ...defaultPage,
  title: 'Bible group',
  body: preloadBody
};