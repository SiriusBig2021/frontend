import React from "react";
import "./GridTest.css";
import MultiMenusList from "./constants.js";
import "./ArchiveTable.css";
import LogScreen from "./LogDisplay.js";
import LiveScreen from "./LiveDisplay.js";
import ToolBarScreen from "./ToolBar.js";

export default class GridTest extends React.Component {

    render() {
        let trainAmount = 7;

        return (
            <div className='GridContainer'>
                <div className='ToolBar'>
                    <div className='ContentHolder'>
                        <ToolBarScreen/>
                    </div>
                </div>
                <div className='LiveWindow'>
                    <div className={trainAmount < 1 ? 'q1-hidden' : 'q1'}>
                        <LiveScreen segment={1}/>
                    </div>
                    <div className={trainAmount < 2 ? 'q2-hidden' : 'q2'}>
                        <LiveScreen segment={2}/>
                    </div>
                    <div className={trainAmount < 3 ? 'q3-hidden' : 'q3'}>
                        <LiveScreen segment={3}/>
                    </div>
                    <div className={trainAmount < 4 ? 'q4-hidden' : 'q4'}>
                        <LiveScreen segment={4}/>
                    </div>
                    <div className={trainAmount < 5 ? 'q5-hidden' : 'q5'}>
                        <LiveScreen segment={5}/>
                    </div>
                    <div className={trainAmount < 6 ? 'q6-hidden' : 'q6'}>
                        <LiveScreen segment={6}/>
                    </div>
                    <div className={trainAmount < 7 ? 'q7-hidden' : 'q7'}>
                        <LiveScreen segment={7}/>
                    </div>
                    <div className={trainAmount < 8 ? 'q8-hidden' : 'q8'}>
                        <LiveScreen segment={8}/>
                    </div>
                    <div className={trainAmount < 9 ? 'q9-hidden' : 'q9'}>
                        <LiveScreen segment={9}/>
                    </div>
                    <div className={trainAmount < 10 ? 'q10-hidden' : 'q10'}>
                        <LiveScreen segment={10}/>
                    </div>
                    <div className={trainAmount < 11 ? 'q11-hidden' : 'q11'}>
                        <LiveScreen segment={11}/>
                    </div>
                    <div className={trainAmount < 12 ? 'q12-hidden' : 'q12'}>
                        <LiveScreen segment={12}/>
                    </div>
                    <div className={trainAmount < 13 ? 'q13-hidden' : 'q13'}>
                        <LiveScreen segment={13}/>
                    </div>
                    <div className={trainAmount < 14 ? 'q14-hidden' : 'q14'}>
                        <LiveScreen segment={14}/>
                    </div>
                    <div className={trainAmount < 15 ? 'q15-hidden' : 'q15'}>
                        <LiveScreen segment={15}/>
                    </div>
                    <div className={trainAmount < 16 ? 'q16-hidden' : 'q16'}>
                        <LiveScreen segment={16}/>
                    </div>
                    <div className={trainAmount < 17 ? 'q17-hidden' : 'q17'}>
                        <LiveScreen segment={17}/>
                    </div>
                    <div className={trainAmount < 18 ? 'q18-hidden' : 'q18'}>
                        <LiveScreen segment={18}/>
                    </div>
                    <div className={trainAmount < 19 ? 'q19-hidden' : 'q19'}>
                        <LiveScreen segment={19}/>
                    </div>
                    <div className={trainAmount < 20 ? 'q20-hidden' : 'q20'}>
                        <LiveScreen segment={20}/>
                    </div>
                    <div className={trainAmount < 21 ? 'q21-hidden' : 'q21'}>
                        <LiveScreen segment={21}/>
                    </div>
                    <div className={trainAmount < 22 ? 'q22-hidden' : 'q22'}>
                        <LiveScreen segment={22}/>
                    </div>
                    <div className={trainAmount < 23 ? 'q23-hidden' : 'q23'}>
                        <LiveScreen segment={23}/>
                    </div>
                    <div className={trainAmount < 24 ? 'q24-hidden' : 'q24'}>
                        <LiveScreen segment={24}/>
                    </div>
                    <div className={trainAmount < 25 ? 'q25-hidden' : 'q25'}>
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