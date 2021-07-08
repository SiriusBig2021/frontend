import React from "react";
import "./GridTest.css";
import NestedList from "./DropdownListTest.js";
import TrainList from "./ScrollableListOfTrainds.js";
import MultiMenusList from "./constants.js";
import { MultilevelMenu } from "react-multilevel-menu";

export default class GridTest extends React.Component {
    render() {
        return (
            <div className='GridContainer'>
                <div className='LiveWindow'>
                    LiveWindow
                </div>
                <div className='ArchiveWindow'>
                    <MultiMenusList/>
                </div>
                <div className='LogWindow'>LogWindow</div>
            </div>
        )
    }
}   