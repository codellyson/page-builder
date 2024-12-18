import * as React from 'react';
import { Box, Modal, ModalProps } from '@mantine/core';
import { Icon, IconX } from '@tabler/icons-react';
import { cx, MAIN_BG_COLOR, MAIN_TXT_COLOR } from '../../helper';




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    border: '2px solid #000',
    boxShadow: 24,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '90vh',
    p: 2,
};

interface CustomModalProps extends Omit<ModalProps, 'title' | 'onClose' | 'children'|'content'> {
    title: React.ReactNode;
    close: () => void;
    content: React.ReactNode;
}

export default function CustomModal({
    content,
    title,
    close,
    ...props
}: CustomModalProps) {
    return (
        <Modal onClose={close} {...props}>

            <Box
  className={cx(MAIN_BG_COLOR, MAIN_TXT_COLOR, 'rounded')}
            >
                <div className="flex pb-3">
                    <div className="flex-grow text-lg">{title}</div>
                    <div onClick={close} className="cursor-pointer">
                        <IconX />
                    </div>
                </div>
                <div className="flex-grow overflow-y-auto">{content}</div>
            </Box>

        </Modal>
    );
}
