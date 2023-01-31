import React, { useEffect, useState } from "react";
import AttractVid from "../../assets/videos/main-attract-drop-curtain.mp4";
import PvVid from "../../assets/videos/main-pv.mp4";
import BullPenVid from "../../assets/videos/BullPen.mp4";
import EntryVid from "../../assets/videos/Entry.mp4";
import HairMakeupVid from "../../assets/videos/HairMakeup.mp4";
import LoadingVid from "../../assets/videos/Loading.mp4";
import Stage06Vid from "../../assets/videos/Stage06.mp4";
import CrossfadeImage from "react-crossfade-image";

export default function Attract(props) {
  const { active, videoRef } = props;
  const [video, setVideo] = useState(null);
  const [galImg, setGalImg] = useState(null);
  const [tagImg, setTagImg] = useState(null);
  const [loop, setLoop] = useState(true);
  const [imgBg, setImgBg] = useState(null);
  const [fadeOut, setFadeOut] = useState(false);

  const handleImages = (num) => {
    if (num < 10) {
      setGalImg(`0${num}`);
      setTagImg(`0${num}`);
      setImgBg(`0${num}`);
    } else {
      setGalImg(num);
      setTagImg(num);
      setImgBg(num);
    }
  };

  useEffect(() => {
    if (String(active).includes("galleryImg")) {
      setVideo(null);
      let num = parseInt(String(active).replace("galleryImg", ""));
      handleImages(num);
    } else if (active === "gallery") {
      setVideo(null);
      let num = 1;
      handleImages(num);
    } else {
      switch (active) {
        case "node1": {
          setVideo(BullPenVid);
          setLoop(false);
          setTagImg("main-360-tag-office-suite");
          break;
        }
        case "node2": {
          setVideo(Stage06Vid);
          setLoop(false);
          setTagImg("main-360-tag-stage6");
          break;
        }
        case "node3": {
          setVideo(HairMakeupVid);
          setLoop(false);
          setTagImg("main-360-tag-hair-make-room");
          break;
        }
        case "node4": {
          setVideo(LoadingVid);
          setLoop(false);
          setTagImg("main-360-tag-hallway");
          break;
        }
        case "node5": {
          setVideo(EntryVid);
          setLoop(false);
          setTagImg("main-360-tag-reception");
          break;
        }
        case "pv": {
          setVideo(PvVid);
          setLoop(false);
          setTagImg(null);
          break;
        }
      }
    }

    return () => {
      setVideo(null);
      setLoop(true);
      setGalImg(null);
      setTagImg(null);
    };
  }, [active, video]);

  return (
    <div className="attract-wrapper">
      
        <video
          src={AttractVid}
          id={"video0"}
          preload="auto"
          autoPlay
          muted="false"
          loop
          className="backgroundVid"
        />
      
      <div className={!video && !galImg ? "hidden" : "visible"}>
      {video !== null && (
        <div className="video-wrapper">
          <div>
            <video
              src={video}
              key={video}
              id={"video1"}
              preload="auto"
              autoPlay
              muted="false"
              ref={videoRef}
              className="videoPlaying"
            />
          </div>

          {tagImg !== null && (
            <div className="attract-img-view">
              <img src={require(`../../assets/images/${tagImg}.png`)} />
            </div>
          )}
        </div>
      )}
      
      {galImg !== null && (
        <div className="img-view">
          {imgBg !== null && (
            <CrossfadeImage
              src={require(`../../assets/images/main-screen-gallery-${galImg}-bg.png`)}
              className="bg-img-view"
            />
          )}
          <div className="gal-img-view">
            <CrossfadeImage
              src={require(`../../assets/images/main-screen-gallery-${galImg}.png`)}
            />
          </div>

          {tagImg !== null && (
            <div className="tag-img-view">
              <CrossfadeImage
                src={require(`../../assets/images/main-gallery-tag-${tagImg}.png`)}
              />
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
}
