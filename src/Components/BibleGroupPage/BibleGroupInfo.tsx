import React from "react";
import BlurContainer from "../PageElements/BlurContainer";

interface IProps {
  titleStyle?: React.CSSProperties;
  titleClassName?: string;
  className?: string;
  style?: React.CSSProperties;
  body: string;
  title?: string;
}

const BibleGroupInfo: React.FC<IProps> = (props) => {
  return (
    <BlurContainer
      title={props.title}
      {...props}
    >
      {props.body ?
        <div dangerouslySetInnerHTML={{__html: props.body}}/>
        :<>
          <p>
            Welcome to English Bible group!
            We are a group of enthusiastic Christians who come together once a week to pray, read, reflect and discuss the
            Old and New Testament in English language.
          </p>
          <p>
            Over the years we have had more than 300 people pass through our group, some just for one visit, others who
            continue to participate.
            Presently we have about 10 individuals participating regularly.
            Whether you are just visiting us one time, or intend to participate regularly, you are most cordially welcome!
          </p>
          <p>
            We are sponsored by Dom Quo Vadis , and meet there each Thursday at 18:00 throughout the year, except for holy
            days when Dom Quo Vadis is closed. (summer months we usually meet at Centrum Salvator, Jakubovo nam. 5,
            Bratislava at 18:00).
          </p>
          <p>
            For more information contact us at: info@catholic.sk
          </p>
          <p>
            Looking forward to seeing you!
          </p>
        </>
      }

    </BlurContainer>
  );
}

export default BibleGroupInfo;