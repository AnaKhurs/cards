import s from './Modal.module.scss';

type ModalPropsType = {
    active: boolean,
    setActive: (active: boolean) => void,
    children: any,
}

export const Modal = ({active,setActive, children}: ModalPropsType) => {

    const offModal = () => setActive(false)
    const modalClassName = `${s.modal} ${active ? s.modalActive : ''}`
    const contentClassName = `${s.content} ${active ? s.contentActive : ''}`

    return (
        <div className={modalClassName} onClick={offModal}>
            <div className={contentClassName} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}