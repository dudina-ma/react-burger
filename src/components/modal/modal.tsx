import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { ModalOverlay } from '@components/modal-overlay/modal-overlay';

import styles from './modal.module.css';

const modalRoot = document.getElementById('modals-root')!;

type TModalProps = {
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal = ({ title, onClose, children }: TModalProps): React.JSX.Element => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);

    return (): void => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return createPortal(
    <>
      <ModalOverlay onClick={onClose} />
      <div className={styles.modal}>
        <header className={`${styles.header} pt-10 pl-10 pr-10`}>
          <h3 className="text text_type_main-large">{title}</h3>
          <CloseIcon type="primary" onClick={onClose} />
        </header>
        <div className={styles.content}>{children}</div>
      </div>
    </>,
    modalRoot
  );
};
