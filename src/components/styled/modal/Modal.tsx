import React, { useContext, useState, useEffect } from 'react';
import './modal.css';
import { Button } from '../button/Button';
import AppContext from '../../../context/AppContext';

interface DialogProps {
  content?: JSX.Element;
  footerDisplayLabel?: string;
}

const Dialog: React.FC<DialogProps> = ({ content, footerDisplayLabel }) => {
  const { setModalOpen, modalOpen } = useContext(AppContext);

  useEffect(() => {
    console.log('need to reset modal');
  }, [modalOpen]);
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setModalOpen(false);
            }}
          >
            X
          </button>
        </div>
        <div className="body">{content}</div>
        <div className="footer"></div>
      </div>
    </div>
  );
};

interface ModalProps {
  modalLabel?: string;
  content: JSX.Element;
  icon?: JSX.Element;
  type?: 'button' | 'icon';
  footerDisplayLabel?: string;
  style?: React.CSSProperties;
}

const Modal: React.FC<ModalProps> = ({
  content,
  icon,
  type = 'button',
  footerDisplayLabel
}) => {
  const { setModalOpen, modalOpen } = useContext(AppContext);

  return (
    <div>
      {type === 'button' && (
        <Button
          icon={icon}
          color="#1a2332"
          onClick={() => {
            setModalOpen(true);
          }}
        ></Button>
      )}
      {type === 'icon' && (
        <span onClick={() => setModalOpen(true)}>{icon}</span>
      )}
      {modalOpen && (
        <Dialog
          content={content}
          footerDisplayLabel={footerDisplayLabel ?? ''}
        />
      )}
    </div>
  );
};

export default Modal;
