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