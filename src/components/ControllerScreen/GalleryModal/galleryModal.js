import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import GalleryTitle from "../../../assets/images/control-gallery-title.png";
import SelectedImg from "../../../assets/images/control-gallery-thumb-selected.png";

export default function GalleryModal(props) {
  const { show, onHide, sendId, active } = props;
  const [border, setBorder] = useState("border1");

  const imgs = [];

  const handleClick = (i) => {
    setBorder(`border${i}`);
    sendId(`galleryImg${i}`);
  };

  for (let i = 1; i < 12; i++) {
    if (i < 10) {
      imgs.push(
        <button className="galImg" onClick={() => handleClick(i)}>
          <img
            src={require(`../../../assets/images/control-gallery-thumb-0${i}.png`)}
            key={`img${i}`}
          />
        </button>
      );
    } else {
      imgs.push(
        <button className="galImg" onClick={() => handleClick(i)}>
          <img
            src={require(`../../../assets/images/control-gallery-thumb-${i}.png`)}
            key={`img${i}`}
          />
        </button>
      );
    }
  }

  useEffect(() => {
    if (!show) {
      setBorder("border1");
    }
  }, [show]);

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName="modal-dd"
      backdropClassName="modal-back"
      centered
    >
      <Modal.Body className="body-gallery">
        <img src={GalleryTitle} alt="title" className="gallery-title-img" />
        <button className="close-button-2" onClick={onHide} />
        <div className="img-wrapper">{imgs}</div>
        <img
          src={String(active).includes("gallery") ? SelectedImg : null}
          className={border}
          key={border}
        />
      </Modal.Body>
    </Modal>
  );
}
