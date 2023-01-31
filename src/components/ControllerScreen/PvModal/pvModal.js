import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import PvBG from "../../../assets/images/control-pv-bg.png";
import PvTitle from "../../../assets/images/control-pv-title.png";
import Play from "../../../assets/images/control-video-play-button.png";
import Pause from "../../../assets/images/control-video-pause-button.png";
import Reload from "../../../assets/images/control-video-replay-button.png";

export default function PvModal(props) {
  const { show, onHide, videoRef } = props;
  const [progress, setProgress] = useState(0);
  const [videoTime, setVideoTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [end, setEnd] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [width, setWidth] = useState(0)

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
      videoRef.current.play();
      setPlaying(true);
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
      if (!show) {
        setTimeout(() => {
          setEnd(false);
          setPlaying(true);
          setCurrentTime(0)
        }, 300);
      }
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

    var elem = document.getElementById("progressBar");
    setWidth(progress)

    if (elem) {
      if (progress == 1000) {
        setWidth(0);
      } else {
        elem.style.width = (progress / 10) * 6 + "px";
      }
    }
  }, [progress]);

  const handleVideoProgress = (event) => {
    const manualChange = Number(event.target.value);
    videoRef.current.currentTime =
      (videoRef.current.duration / 1000) * manualChange;
    setProgress(manualChange);
  };

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName="modal-dd"
      backdropClassName="modal-back"
      centered
    >
      <Modal.Body className="body-pv">
        <img src={PvBG} alt="background-img" className="pv-bg-img" />
        <img src={PvTitle} alt="title" className="pv-title-img" />

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
  );
}
