import React from "react";
import "./GridTest.css";
import MultiMenusList from "./constants.js";
import "./ArchiveTable.css";
import LogScreen from "./LogDisplay.js";
import ToolBarScreen from "./ToolBar.js";
import LiveDisplayContainer from "./LiveDisplayContainer";

export default class GridTest extends React.Component {

    render() {
        return (
            <div className='GridContainer'>
                <div className='ToolBar'>
                    <div className='ContentHolder'>
                        <ToolBarScreen/>
                    </div>
                </div>
                <div className='LiveWindow'>
                    <LiveDisplayContainer/>
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