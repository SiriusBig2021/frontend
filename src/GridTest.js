import React from "react";
import "./GridTest.css";
import MultiMenusList from "./constants.js";
import "./ArchiveTable.css";
import LogScreen from "./LogDisplay.js";
import ToolBarScreen from "./ToolBar.js";
import LiveDisplayContainer from "./LiveDisplayContainer";

import language from "./language.json";

export default function GridTest() {
    const [logsOpen, setLogsState] = React.useState(false);

    const handleClick = () => {
        setLogsState(!logsOpen);
    }

    return (
        <div className={logsOpen ? 'GridContainer' : 'GridContainerWithHiddenLogs'}>
            <div className='ToolBar'>
                <div className='ContentHolder'>
                    <ToolBarScreen/>
                </div>
            </div>
            <div className='LiveWindow'>
                <button className={logsOpen ? 'HideLogsButton' : 'ShowLogsButton'} onClick={handleClick}>{logsOpen ? '▾ '+language.LogScreen.HideLogs : '▴ '+language.LogScreen.ShowLogs}</button>
                <LiveDisplayContainer logsOpen={logsOpen}/>
            </div>
            <div className='ArchiveWindow'>
                <div className='ContentHolder'>
                    <MultiMenusList/>
                </div>
            </div>
            <div className={logsOpen ? 'LogWindow' : 'HiddenLogWindow'}>
                <div className='ContentHolder'>
                    <LogScreen/>
                </div>
            </div>
        </div>
    )
}   