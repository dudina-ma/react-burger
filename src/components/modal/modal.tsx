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
  const paddingClass = title ? 'pt-10 pl-10 pr-10 pb-15' : 'pt-15 pl-10 pr-10 pb-30';
  const contentClass = title ? '' : 'pt-15';

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
      <div className={`${styles.modal} ${paddingClass}`}>
        <header className={`${styles.header} ${!title ? styles.header_no_title : ''}`}>
          {title && <h3 className="text text_type_main-large m-0">{title}</h3>}
          <CloseIcon type="primary" onClick={onClose} />
        </header>
        <div className={contentClass}>{children}</div>
      </div>
    </>,
    modalRoot
  );
};
