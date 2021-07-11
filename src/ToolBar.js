import logo from "./assets/images/logo.png";
import "./ArchiveTable.css";

export default function ToolBarScreen() {


    return (
        <div className='ToolBarHolder'>
            <img src={logo} className='LogoImage' height="80"/>
            <div className='ToolBarTimeStatus'>
                Время смены: 00:00:00
            </div>
            <div className='ToolBarWagonStatus'>
                Вагонов загружено: 218
            </div>
        </div>
    )
}