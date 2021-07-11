import logo from "./assets/images/logo.png";
import "./ArchiveTable.css";
import language from "./language.json";

export default function ToolBarScreen() {


    return (
        <div className='ToolBarHolder'>
            <img src={logo} className='LogoImage' height="80"/>
            <div className='ToolBarTimeStatus'>
                {language.ToolBar.TimeGone} 00:00:00
            </div>
            <div className='ToolBarWagonStatus'>
                {language.ToolBar.WagonsGone} 218
            </div>
        </div>
    )
}