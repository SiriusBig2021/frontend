import styled from "styled-components";
import MultiMenus from "./MultiMenus";
import "./ArchiveTable.css";

const fontsize = {
    H3FONTSIZE: '20px',
  }

const Wrapper = styled.aside`
  background: #f0f0f0;
  width: 100%;
  text-align: left;
  font-size: ${fontsize.H3FONTSIZE}
`;

const menus = [
    {
        label:"Train1",
        submenu: [
            {
                label:"Wagon1",
                submenu: [
                    {
                        label:"EMPTY"
                    }
                ]
            }, 
            {
                label:"Wagon2",
                submenu: [
                    {
                        label:"FULL"
                    }
                ]
            },
            {
                label:"Wagon3",
                submenu: [
                    {
                        label:"FULL"
                    }
                ]
            }
        ]
    },
    {
        label:"Train2",
        submenu: [
            {label:"Wagon1"}, {label:"Wagon2"}, {label:"Wagon3"}, {label:"Wagon4"}
        ]
    }
];

export default function MultiMenusList() {
    return (
        <Wrapper className='WrapperClass'>
            <MultiMenus menus={menus}/>
        </Wrapper>
    )
}