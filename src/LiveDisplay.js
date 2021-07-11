import language from "./language.json";

import "./ArchiveTable.css";
import React from 'react';
import Modal from 'react-modal';
import number_photo_example from './assets/images/number_photo_example.jpg';

const currentWagonList = [
    {number: 13583243, state: 'full', time1: '00:00', time2: '00:00'},
    {number: 'повреждён', state: 'fail', time1: '00:00', time2: '00:00'},
    {number: 23235799, state: 'empty', time1: '00:00', time2: '00:00'},
    {number: 45215452, state: 'full', time1: '00:00', time2: '00:00'},
    {number: 18451543, state: 'empty', time1: '00:00', time2: '00:00'},
    {number: 17685410, state: 'full', time1: '00:00', time2: '00:00'},
    {number: 68713543, state: 'empty', time1: '00:00', time2: '00:00'}
]

export default function LiveScreen() {
    const [open, setOpen] = React.useState(false);
    const [inputNumber, setInputNumber] = React.useState("");
    const [inputState, setInputState] = React.useState("");

    const handleClick = () => {
        setOpen(!open);
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleApplyClick = () => {
        console.log("EDIT: Number is "+inputNumber + ", state is "+inputState);
        setOpen(!open);
    };

    const updateInputNumber = event => {
        setInputNumber(event.target.value);
    }

    const updateInputState = event => {
        setInputState(event.target.value);
    }
    
    if(currentWagonList.length < arguments[0].segment) {
        return (
            <div className='LiveWagonEmptyWindow'></div>
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
                                <img src={number_photo_example} className='ModalImage'/>
                            </div>
                            <div className='ModalContentSegment'>
                                {language.LiveScreen.WagonsNumber}
                                <input type="text" className='ModalInputField' onChange={updateInputNumber}/>
                                {language.LiveScreen.WagonsState}
                                <input type="text" className='ModalInputField' onChange={updateInputState}/>
                            </div>
                            <div className='ModalButtonSegment'>
                                <button className='ModalCloseButton' onClick={handleClick}>{language.LiveScreen.CloseButton}</button>
                                <button className='ModalAcceptButton' onClick={handleApplyClick}>{language.LiveScreen.ApplyButton}</button>
                            </div>
                        </div>
                    </Modal>
                    <div className='LiveWagonError'>
                        {currentWagonList[arguments[0].segment-1].number}
                    </div>
                    <div className='LiveWagonErrorState'>
                        <div onClick={handleClick}>{language.LiveScreen.Fix}</div>
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
                        {currentWagonList[arguments[0].segment-1].state == "full" ? language.LiveScreen.FullState : (currentWagonList[arguments[0].segment-1].state == "empty" ? language.LiveScreen.EmptyState : language.LiveScreen.ErrorState)}
                    </div>
                </div>
            );
        }
    }
}