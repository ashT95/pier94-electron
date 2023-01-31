import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import NodeTitle from "../../../assets/images/control-360-title.png";
import Play from "../../../assets/images/control-video-play-button.png";
import Pause from "../../../assets/images/control-video-pause-button.png";
import Reload from "../../../assets/images/control-video-replay-button.png";
import BGoffice from "../../../assets/images/control-360-bg-office-suite.png";
import BGhairMakeup from "../../../assets/images/control-360-bg-hair-make-room.png";
import BGstorage from "../../../assets/images/control-360-bg-hallway.png";
import BGentry from "../../../assets/images/control-360-bg-reception.png";
import BGstage6 from "../../../assets/images/control-360-bg-stage6.png";
import OfficeLabel from "../../../assets/images/control-attract-360-button-office-suite.png";
import HairMakeupLabel from "../../../assets/images/control-attract-360-button-hair-make-room.png";
import HallwayLabel from "../../../assets/images/control-attract-360-button-hallway.png";
import ReceptionLabel from "../../../assets/images/control-attract-360-button-reception.png";
import Stage6Label from "../../../assets/images/control-attract-360-button-stage6.png";

export default function Node(props) {
  const { show, onHide, videoRef, active } = props;
  const [progress, setProgress] = useState(0);
  const [videoTime, setVideoTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [end, setEnd] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [bg, setBg] = useState(null);
  const [width, setWidth] = useState(0);

  const videoHandler = (control) => {
    if (control === "play") {
      videoRef.current.play();
      setPlaying(true);
    } else if (control === "pause") {
      videoRef.current.pause();
      setPlaying(false);
    } else if (control === "end") {
      setEnd(false);
      var vid = document.getElementById("video1");
      vid.currentTime = 0;
      vid.progress = 0;
      videoHandler("play");
    }
  };

  useEffect(() => {
    let interval;

    interval = setInterval(() => {
      var vid = document.getElementById("video1");
      if (vid) {
        setVideoTime(vid.duration);
        setCurrentTime(videoRef.current.currentTime);
        setProgress((videoRef.current.currentTime / videoTime) * 1000);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    var vid = document.getElementById("video1");
    if (vid) {
      if (progress === 1000) {
        setEnd(true);
        videoHandler("pause");
      } else {
        setEnd(false);
      }
    }

    switch (active) {
      case "node1": {
        setBg(BGoffice);
        break;
      }
      case "node2": {
        setBg(BGstage6);
        break;
      }
      case "node3": {
        setBg(BGhairMakeup);
        break;
      }
      case "node4": {
        setBg(BGstorage);
        break;
      }
      case "node5": {
        setBg(BGentry);
        break;
      }
    }

    var elem = document.getElementById("progressBar");
    setWidth(progress);

    if (elem) {
      if (progress == 1000 || !progress) {
        setWidth(0);
      } else {
        elem.style.width = (progress / 10) * 6 + "px";
      }
    }

    return () => {
      if (!show) {
        setTimeout(() => {
          setEnd(false);
          setPlaying(true);
          setCurrentTime(0);
        }, 300);
      }
    };
  }, [progress, active]);

  const handleVideoProgress = (event) => {
    const manualChange = Number(event.target.value);
    videoRef.current.currentTime =
      (videoRef.current.duration / 1000) * manualChange;
    setProgress(manualChange);
  };

  return (
    <div>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        dialogClassName="modal-dd"
        backdropClassName="modal-back"
        centered
      >
        <Modal.Body className="body-pv">
          <img src={bg} alt="bg" className="pv-bg-img" />
          <img src={NodeTitle} alt="title" className="pv-title-img" />
          {playing ? (
            <img
              onClick={() => videoHandler("pause")}
              className="play-button"
              alt=""
              src={Pause}
            />
          ) : (
            <img
              onClick={
                end ? () => videoHandler("end") : () => videoHandler("play")
              }
              className="play-button"
              alt=""
              src={end ? Reload : Play}
            />
          )}
          <div className="progressSlider">
            <div id="progressBar"></div>
            <div className="slider">
              <input
                type="range"
                min="0"
                max="1000"
                class="progressKnob"
                id="progressRange"
                value={progress ? progress : 0}
                onChange={(e) => handleVideoProgress(e)}
              />
            </div>
          </div>
          <button className="close-button" onClick={onHide} />
        </Modal.Body>
      </Modal>
    </div>
  );
}
