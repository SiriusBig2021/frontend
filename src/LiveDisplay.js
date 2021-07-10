import "./ArchiveTable.css";
import React from 'react';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';

const currentWagonList = [
    {number: 13583243, state: 'full', time1: '00:00', time2: '00:00'},
    {number: 45234320, state: 'fail', time1: '00:00', time2: '00:00'},
    {number: 23235799, state: 'empty', time1: '00:00', time2: '00:00'},
    {number: 45215452, state: 'full', time1: '00:00', time2: '00:00'},
    {number: 18451543, state: 'empty', time1: '00:00', time2: '00:00'},
    {number: 17685410, state: 'full', time1: '00:00', time2: '00:00'},
    {number: 68713543, state: 'empty', time1: '00:00', time2: '00:00'}
]

export default function LiveScreen() {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAcceptClick = () => {
        setOpen(!open);
    };
    
    if(currentWagonList.length < arguments[0].segment) {
        return (
            <div className='LiveWagonEmptyWindow'>. . .</div>
        );
    } else {
        if(currentWagonList[arguments[0].segment-1].state === 'fail') {
            return (
                <div>
                    <Modal 
                        isOpen={open}
                        contentLabel="Fix a problem with a wagon"
                        className='Modal'
                        overlayClassName='ModalOverlay'
                        onRequestClose={handleClose}
                        shouldCloseOnOverlayClick={true}
                    >
                        <div className='ModalGridContainer'>
                            <div className='ModalImageSegment'>
                                SOME IMAGE
                            </div>
                            <div className='ModalContentSegment'>
                                HERE COULD BE YOUR AD
                            </div>
                            <div className='ModalButtonSegment'>
                                <button className='ModalCloseButton' onClick={handleClick}>Close</button>
                                <button className='ModalAcceptButton' onClick={handleClick}>Apply</button>
                            </div>
                        </div>
                    </Modal>
                    <div className='LiveWagonError'>
                        {currentWagonList[arguments[0].segment-1].number}
                    </div>
                    <div className='LiveWagonErrorState'>
                        <div onClick={handleClick}>FIX</div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className='LiveWagonNumber'>
                        {currentWagonList[arguments[0].segment-1].number}
                    </div>
                    <div className='LiveWagonState'>
                        {currentWagonList[arguments[0].segment-1].state}
                    </div>
                </div>
            );
        }
    }
}