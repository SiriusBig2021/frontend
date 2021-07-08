import React from "react";
import "./GridTest.css";
import NestedList from "./DropdownListTest.js";
import TrainList from "./ScrollableListOfTrainds.js"

export default class GridTest extends React.Component {
    render() {
        return (
            <div className='GridContainer'>
                <div className='LiveWindow'>LiveWindow</div>
                <div className='ArchiveWindow'>
                    <TrainList/>
                </div>
                <div className='LogWindow'>LogWindow</div>
            </div>
        )
    }
}