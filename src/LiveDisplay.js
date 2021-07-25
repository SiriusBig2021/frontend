import language from "./language.json";

import "./ArchiveTable.css";
import React from 'react';
import Modal from 'react-modal';
import { db, auth } from "./firebase";

/*const currentWagonList = [
    {number: 13583243, state: 'full', time1: '00:00', time2: '00:00'},
    {number: 'повреждён', state: 'fail', time1: '00:00', time2: '00:00'},
    {number: 23235799, state: 'empty', time1: '00:00', time2: '00:00'},
    {number: 45215452, state: 'full', time1: '00:00', time2: '00:00'},
    {number: 18451543, state: 'empty', time1: '00:00', time2: '00:00'},
    {number: 17685410, state: 'full', time1: '00:00', time2: '00:00'},
    {number: 68713543, state: 'empty', time1: '00:00', time2: '00:00'}
]*/

export default function LiveScreen() {
    const [open, setOpen] = React.useState(false);
    const [_open, _setOpen] = React.useState(false);
    const [inputNumber, setInputNumber] = React.useState("");
    const [inputState, setInputState] = React.useState("");

    const handleClick = () => {
        setOpen(!open);
    };

    const _handleClick = () => {
        _setOpen(!_open);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const _handleClose = () => {
        _setOpen(false);
    }

    const handleApplyClick = () => {
        let _time = new Date();
        let iso_date = (_time.toISOString()).split('T');
        let shift_id = "";
        let shift0_time = new Date(_time - new Date(Date.UTC(2021, 7, 11, 7, 30, 0)));
        if(shift0_time.getHours() < 12) {
            shift_id = iso_date[0] + 'T07:30:00';
        } else {
            shift_id = iso_date[0] + 'T19:30:00';
        }

        console.log("current shift is " + shift_id);
        console.log("current doc id is " + (arguments[0].wagons)[arguments[0].segment-1].event_id);

        db.collection('shift/' + shift_id + '/events').doc((arguments[0].wagons)[arguments[0].segment-1].event_id).update({wagon: inputNumber, state: inputState, changed_by: "Giovanni"});

        console.log("EDIT: Number is " + inputNumber + ", state is " + inputState);
        setOpen(!open);
    };

    const updateInputNumber = event => {
        setInputNumber(event.target.value);
    }

    const updateInputState = event => {
        setInputState(event.target.value);
    }

    if(arguments[0].wagons && (arguments[0].logsOpen != undefined)) {
    if(arguments[0].wagons.length < arguments[0].segment) {
        return (<div className='LiveWagonEmptyWindow'></div>);
    } else {
        if((arguments[0].wagons)[arguments[0].segment-1].state == 'fail') {
            return (
                <div className="WagonErrorLiveComponent">
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
                            <img src={(arguments[0].wagons)[arguments[0].segment-1].frames[1]} className='ModalImage'/>
                            <img src={(arguments[0].wagons)[arguments[0].segment-1].frames[0]} className='ModalImage2'/>
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
                        {(arguments[0].wagons)[arguments[0].segment-1].number}
                    </div>
                    <div className='LiveWagonErrorState'>
                        <div onClick={handleClick}>{language.LiveScreen.Fix}</div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={(arguments[0].wagons)[arguments[0].segment-1].state == 'full' ? "FullWagonLiveComponent" : ((arguments[0].wagons)[arguments[0].segment-1].state == 'empty' ? 'EmptyWagonLiveComponent' : 'WagonLiveComponent')}>
                    <Modal
                        isOpen={_open}
                        contentLabel="Wagon info"
                        className="InfoModal"
                        overlayClassName={(arguments[0].logsOpen ? "InfoModalOverlay" : "InfoModalBigOverlay")}
                        onRequestClose={_handleClose}
                        shouldCloseOnOverlayClick={true}
                    >
                        <div className="ModalWagonInfoGridContainer">
                            <div className="ModalWagonInfoImage1">
                                <img className="WagonInfoImageComponent" src={(arguments[0].wagons)[arguments[0].segment-1].frames[0]} height="150px"/>
                            </div>
                            <div className="ModalWagonInfoImage2">
                                <img className="WagonInfoImageComponent" src={(arguments[0].wagons)[arguments[0].segment-1].frames[1]} height="150px"/>
                            </div>
                            <div className="ModalWagonInfoTools">
                                {language.LiveScreen.Wagon} {(arguments[0].wagons)[arguments[0].segment-1].number}: {language.LiveScreen.ArrivedAt} {(arguments[0].wagons)[arguments[0].segment-1].time1}, {language.LiveScreen.State}: {(arguments[0].wagons)[arguments[0].segment-1].state == 'full' ? language.LiveScreen.FullState : language.LiveScreen.EmptyState}
                            </div>
                        </div>
                    </Modal>
                    <div className='LiveWagonNumber'>
                        {(arguments[0].wagons)[arguments[0].segment-1].number}   
                    </div>
                    <div className='LiveWagonState' onClick={_handleClick}>
                        {(arguments[0].wagons)[arguments[0].segment-1].state == "full" ? language.LiveScreen.FullState : ((arguments[0].wagons)[arguments[0].segment-1].state == "empty" ? language.LiveScreen.EmptyState : language.LiveScreen.ErrorState)}
                    </div>
                </div>
            );
        }
    }
    } else {
        return (<div></div>);
    }
}