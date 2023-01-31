import React, { useState, useRef } from "react";
import "./controller.css";
import Node from "./Nodes/node";
import OfficeLabel from "../../assets/images/control-attract-360-button-office-suite.png";
import HairMakeupLabel from "../../assets/images/control-attract-360-button-hair-make-room.png";
import HallwayLabel from "../../assets/images/control-attract-360-button-hallway.png";
import ReceptionLabel from "../../assets/images/control-attract-360-button-reception.png";
import Stage6Label from "../../assets/images/control-attract-360-button-stage6.png";
import Attract from "../AttractScreen/attract";
import PvModal from "./PvModal/pvModal";
import GalleryModal from "./GalleryModal/galleryModal";

export default function Controller() {
  const [active, setActive] = useState(null);
  const [openPv, setOpenPv] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [openNode, setOpenNode] = useState(false);
  const videoRef = useRef(null);

  const handlePv = () => {
    setOpenPv(true);
    setActive("pv");
  };

  const handleGallery = () => {
    setGalleryOpen(true);
    setActive("gallery");
  };

  const handleNode = (i) => {
    setOpenNode(true);
    setActive(`node${i}`);
  };

  const closeClick = () => {
    setOpenPv(false);
    setGalleryOpen(false);
    setOpenNode(false);
    setActive(null);
  };

  const getId = (val) => {
    setActive(val);
  };

  const nodes = [];
  for (let i = 1; i < 6; i++) {
    nodes.push(<button className={`node${i}`} onClick={() => handleNode(i)} />);
  }

  return (
    <div>
      <div>
        <Attract active={active} videoRef={videoRef} />
      </div>
      <div className="main-wrapper">
        <div className="content-wrapper">
          {nodes}
          <Node
            show={openNode}
            onHide={closeClick}
            videoRef={videoRef}
            active={active}
          />
        </div>
        <div className="labels">
          <img
            src={OfficeLabel}
            alt="office suite"
            id="office-label"
            onClick={() => handleNode(1)}
          />
          <img
            src={Stage6Label}
            alt="stage6"
            id="stage6-label"
            onClick={() => handleNode(2)}
          />
          <img
            src={HairMakeupLabel}
            alt="hair&makeup room"
            id="hairmakeup-label"
            onClick={() => handleNode(3)}
          />
          <img
            src={HallwayLabel}
            alt="hallway"
            id="hallway-label"
            onClick={() => handleNode(4)}
          />
          <img
            src={ReceptionLabel}
            alt="reception"
            id="reception-label"
            onClick={() => handleNode(5)}
          />
        </div>
        <div className="pv-and-gallery">
          <button className="pv-button" onClick={handlePv} />
          <PvModal show={openPv} onHide={closeClick} videoRef={videoRef} />
          <button className="gallery-button" onClick={handleGallery} />
          <GalleryModal
            show={galleryOpen}
            onHide={closeClick}
            sendId={getId}
            active={active}
          />
        </div>
      </div>
    </div>
  );
}
