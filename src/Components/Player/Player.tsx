import React, {FunctionComponent, useEffect, useRef, useState} from "react";
import styles from "./Player.module.css";
import GoldBorder from "../StyledComponents/GoldBorder";

interface IProps {
  containerStyle?: React.CSSProperties;
  container?: string;
  title?: string;
}

interface ISong {
  name: string;
  src: string;
}

const Player: FunctionComponent<IProps> = (props) => {
  const [currentSong, setCurrentSong] =
    useState<string | null>(songs.length ? songs[0].src : null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.load();
      if (!isFirstRender.current) {
        audioRef.current.play();
      } else {
        isFirstRender.current = false;
      }

    }
  }, [currentSong]);

  const playSong = (song: string) => {
    setCurrentSong(song);
  };

  return (
    <GoldBorder container={styles.goldContainerAdjustment}>
      {props.title && <h1 className={styles.title}>{props.title}</h1>}

      <audio controls ref={audioRef} className={styles.player}>
        {currentSong && <source src={currentSong} type="audio/mpeg"/>}
      </audio>

      <div>
        {songs.map((song, index) => (
          <div key={index}>
            <button className={`${styles.song} ${song.src === currentSong ? styles.selected : null}`}
                    onClick={() => playSong(song.src)}>
              <img src={"/icons/song.svg"} alt={"play"}/>
              {song.name}
            </button>
          </div>
        ))}
      </div>
    </GoldBorder>
  );
};

const songs: ISong[] = [
  {
    name: "All I need",
    src: "/songs/all_i_need.mp3"
  },
  {
    name: "Breathe",
    src: "/songs/breathe.mp3"
  },
  {
    name: "Heaven's Road",
    src: "/songs/heavens_road.mp3"
  },
  {
    name: "Holy Love",
    src: "/songs/holy_love.mp3"
  },
  {
    name: "How Beautiful",
    src: "/songs/how_beautiful.mp3"
  },
  {
    name: "In Your Hands",
    src: "/songs/in_your_hands.mp3"
  },
  {
    name: "Power of Your Love",
    src: "/songs/power_of_your_love.mp3"
  },
  {
    name: "Rock My Soul",
    src: "/songs/rock_my_soul.mp3"
  },
  {
    name: "Shout to the Lord",
    src: "/songs/shout_to_the_lord.mp3"
  },
  {
    name: "Sing Halelujah",
    src: "/songs/sing_halelujah.mp3"
  },
  {
    name: "Sweet Mercies",
    src: "/songs/sweet_mercies.mp3"
  }
]

export default Player;
