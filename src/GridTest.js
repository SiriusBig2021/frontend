import React from "react";
import "./GridTest.css";
//import TrainList from "./ScrollableListOfTrainds.js";
import MultiMenusList from "./constants.js";
import "./ArchiveTable.css";
import LogScreen from "./LogDisplay.js";
import LiveScreen from "./LiveDisplay.js";
import Modal from 'react-modal';

export default class GridTest extends React.Component {

    render() {
        return (
            <div className='GridContainer'>
                <div className='LiveWindow'>
                    <div className='q1'>
                        <LiveScreen segment={1}/>
                    </div>
                    <div className='q2'>
                        <LiveScreen segment={2}/>
                    </div>
                    <div className='q3'>
                        <LiveScreen segment={3}/>
                    </div>
                    <div className='q4'>
                        <LiveScreen segment={4}/>
                    </div>
                    <div className='q5'>
                        <LiveScreen segment={5}/>
                    </div>
                    <div className='q6'>
                        <LiveScreen segment={6}/>
                    </div>
                    <div className='q7'>
                        <LiveScreen segment={7}/>
                    </div>
                    <div className='q8'>
                        <LiveScreen segment={8}/>
                    </div>
                    <div className='q9'>
                        <LiveScreen segment={9}/>
                    </div>
                    <div className='q10'>
                        <LiveScreen segment={10}/>
                    </div>
                    <div className='q11'>
                        <LiveScreen segment={11}/>
                    </div>
                    <div className='q12'>
                        <LiveScreen segment={12}/>
                    </div>
                    <div className='q13'>
                        <LiveScreen segment={13}/>
                    </div>
                    <div className='q14'>
                        <LiveScreen segment={14}/>
                    </div>
                    <div className='q15'>
                        <LiveScreen segment={15}/>
                    </div>
                    <div className='q16'>
                        <LiveScreen segment={16}/>
                    </div>
                    <div className='q17'>
                        <LiveScreen segment={17}/>
                    </div>
                    <div className='q18'>
                        <LiveScreen segment={18}/>
                    </div>
                    <div className='q19'>
                        <LiveScreen segment={19}/>
                    </div>
                    <div className='q20'>
                        <LiveScreen segment={20}/>
                    </div>
                    <div className='q21'>
                        <LiveScreen segment={21}/>
                    </div>
                    <div className='q22'>
                        <LiveScreen segment={22}/>
                    </div>
                    <div className='q23'>
                        <LiveScreen segment={23}/>
                    </div>
                    <div className='q24'>
                        <LiveScreen segment={24}/>
                    </div>
                    <div className='q25'>
                        <LiveScreen segment={25}/>
                    </div>
                </div>
                <div className='ArchiveWindow'>
                    <div className='ContentHolder'>
                        <MultiMenusList/>
                    </div>
                </div>
                <div className='LogWindow'>
                    <div className='ContentHolder'>
                        <LogScreen/>
                    </div>
                </div>
            </div>
        )
    }
}   