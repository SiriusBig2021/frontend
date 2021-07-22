import language from "./language.json";

import React, { useState } from "react";
import styled, { css } from "styled-components";
import "./ArchiveTable.css";

const complexMixin = css`
  color: ${props => (props.whiteColor ? 'white' : 'black')};
`;

const fontsize = {
  H3FONTSIZE: '23px', //Размер шрифта списка
}

const fontsize2 = {
  H3FONTSIZE: '17px', //Размер шрифта описания вагонов в списке
}

const UL = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;
const LI = styled.li``;
const Item = styled.div`
  display: flex;
  padding: ${props => (props.dept-1 ? (props.dept-2 ? '1px' : '5px') : '5px')} 18px;
  border: ${props => (props.dept-1 ? '1px' : '2px')} solid ${props => (props.dept-1 ? (props.dept-2 ? '#f0f0f0' : '#d3d3d3') : 'black')};
  border-radius: 5px;
  align-items: center;
  font-size: ${props => (props.dept-1 ? (props.dept-2 ? fontsize2.H3FONTSIZE : fontsize.H3FONTSIZE) : fontsize.H3FONTSIZE)};
  background-color: ${props => (props.dept-1 ? (props.dept-2 ? '#f0f0f0' : '#eaeaea') : '#d3d3d3')};
  color: ${props => (props.dept-2 ? (props.dept-1 ? '#787878' : '#000') : '#545454')};
  `;
const Label = styled.span`
  width: 100%;
  display: block;
`;
const Arrow = styled.span`
  display: flex;
  height: 25px;
  width: 35px;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &::after {
    content: "";
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;

    border-top: 4px solid #000;

    transform: ${props => (props.toggle ? "rotate(180deg)" : "rotate(0deg)")};
  }
`;

const MultiMenus = ({ menus }) => {
  const [activeMenus, setActiveMenus] = useState([]);

  const handleMenuClick = data => {
    //console.log(data);
  };

  const handleArrowClick = menuName => {
    let newActiveMenus = [...activeMenus];

    if (newActiveMenus.includes(menuName)) {
      var index = newActiveMenus.indexOf(menuName);
      if (index > -1) {
        newActiveMenus.splice(index, 1);
      }
    } else {
      newActiveMenus.push(menuName);
    }

    setActiveMenus(newActiveMenus);
  };

  const ListMenu = ({ dept, data, hasSubMenu, menuName, menuIndex }) => (
    <LI>
      <Item dept={dept}>
        <Label onClick={() => handleMenuClick(data)} className={(data.label == language.ArchiveScreen.Full ? 'FullItem' : (data.label == language.ArchiveScreen.Empty ? 'EmptyItem' : (data.label.split(" ")[0] == language.ArchiveScreen.TrainArrivedAt.split(" ")[0] || data.label.split(" ")[0] == language.ArchiveScreen.TrainDeparturedAt.split(" ")[0] ? 'TimeItem' : (data.label.split(" ")[0] == language.ArchiveScreen.CurrentlyUnderLoading.split(" ")[0] ? 'CurrentlyOnStationItem' : 'ContentItem'))))} >{data.label} </Label>
        {hasSubMenu && (
          <Arrow
            onClick={() => handleArrowClick(menuName)}
            toggle={activeMenus.includes(menuName)}
          />
        )}
      </Item>
      {hasSubMenu && (
        <SubMenu
          dept={dept}
          data={data.submenu}
          toggle={activeMenus.includes(menuName)}
          menuIndex={menuIndex}
        />
      )}
    </LI>
  );

  const SubMenu = ({ dept, data, toggle, menuIndex }) => {
    if (!toggle) {
      return null;
    }

    dept = dept + 1;

    return (
      <UL>
        {data.map((menu, index) => {
          const menuName = `sidebar-submenu-${dept}-${menuIndex}-${index}`;

          return (
            <ListMenu
              dept={dept}
              data={menu}
              hasSubMenu={menu.submenu}
              menuName={menuName}
              key={menuName}
              menuIndex={index}
            />
          );
        })}
      </UL>
    );
  };

  return (
    <UL>
      {menus.map((menu, index) => {
        const dept = 1;
        const menuName = `sidebar-menu-${dept}-${index}`;

        return (
          <ListMenu
            dept={dept}
            data={menu}
            hasSubMenu={menu.submenu}
            menuName={menuName}
            key={menuName}
            menuIndex={index}
          />
        );
      })}
    </UL>
  );
};

export default MultiMenus;
