import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const ZoomImage =({ src, alt, width = "100%", height = 550 }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
            style={{
             width,
          height,
          objectFit: "contain",
          padding: "2.5rem",
          transition: "transform 0.3s ease",
      }}
        onClick={handleOpen}
      />

      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Body style={{ padding: 0 }}>
          <img
            src={src}
            alt={alt}
                   style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.3s ease",

        }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ZoomImage;