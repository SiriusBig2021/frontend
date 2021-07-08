import React from "react";
import "./GridTest.css";
import NestedList from "./DropdownListTest.js";
import FixedSizeListTest from "./FixedSizeListTest.js";
import VirtualizedList from "./ExampleFixedList.js"

export default class GridTest extends React.Component {
    render() {
        return (
            <div className='GridContainer'>
                <div className='LiveWindow'>LiveWindow</div>
                <div className='ArchiveWindow'>
                    <VirtualizedList/>
                </div>
                <div className='LogWindow'>LogWindow</div>
            </div>
        )
    }
}