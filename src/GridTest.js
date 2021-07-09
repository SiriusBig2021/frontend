import React from "react";
import "./GridTest.css";
//import TrainList from "./ScrollableListOfTrainds.js";
import MultiMenusList from "./constants.js";
import "./ArchiveTable.css";
import LogScreen from "./LogDisplay.js";

export default class GridTest extends React.Component {
    render() {
        return (
            <div className='GridContainer'>
                <div className='LiveWindow'>
                    LiveWindow
                    <div className='q1'>

                    </div>
                    <div className='q2'>
                        
                    </div>
                    <div className='q3'>
                        
                    </div>
                    <div className='q4'>
                        
                    </div>
                    <div className='q5'>
                        
                    </div>
                    <div className='q6'>
                        
                    </div>
                    <div className='q7'>
                        
                    </div>
                    <div className='q8'>
                        
                    </div>
                    <div className='q9'>
                        
                    </div>
                    <div className='q10'>
                        
                    </div>
                    <div className='q11'>
                        
                    </div>
                    <div className='q12'>
                        
                    </div>
                    <div className='q13'>
                        
                    </div>
                    <div className='q14'>
                        
                    </div>
                    <div className='q15'>
                        
                    </div>
                    <div className='q16'>
                        
                    </div>
                    <div className='q17'>
                        
                    </div>
                    <div className='q18'>
                        
                    </div>
                    <div className='q19'>
                        
                    </div>
                    <div className='q20'>
                        
                    </div>
                    <div className='q21'>
                        
                    </div>
                    <div className='q22'>
                        
                    </div>
                    <div className='q23'>
                        
                    </div>
                    <div className='q24'>
                        
                    </div>
                    <div className='q25'>
                        
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