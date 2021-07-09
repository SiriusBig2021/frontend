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
                label: "Total time: 00:00"
            },
            {
                label:"Wagon1",
                submenu: [
                    {
                        label:"EMPTY"
                    },
                    {
                        label:"Arrived at 00:00"
                    },
                    {
                        label:"Departured at 00:00"
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





function generateMenus() {
    const trainList = [
        {time1: '00:00', time2: '00:00', time: '00:00', wagons: [
            {number: 12222221, state: 'empty', time1: '00:00', time2: '00:00'},
            {number: 22222222, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 33333333, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 44444444, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 55555555, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 66666666, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 77777777, state: 'empty', time1: '00:00', time2: '00:00'},
            {number: 88888888, state: 'empty', time1: '00:00', time2: '00:00'},
            {number: 99999999, state: 'empty', time1: '00:00', time2: '00:00'},
            {number: 10000001, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 12222221, state: 'empty', time1: '00:00', time2: '00:00'},
            {number: 22222222, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 33333333, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 44444444, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 55555555, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 66666666, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 77777777, state: 'empty', time1: '00:00', time2: '00:00'},
            {number: 88888888, state: 'empty', time1: '00:00', time2: '00:00'},
            {number: 99999999, state: 'empty', time1: '00:00', time2: '00:00'},
            {number: 10000001, state: 'full', time1: '00:00', time2: '00:00'}
            ]
        },
        {time1: '00:00', time2: '00:00', time: '00:00', wagons: [
            {number: 12222221, state: 'empty', time1: '00:00', time2: '00:00'},
            {number: 22222222, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 33333333, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 44444444, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 55555555, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 66666666, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 77777777, state: 'empty', time1: '00:00', time2: '00:00'},
            {number: 88888888, state: 'empty', time1: '00:00', time2: '00:00'},
            {number: 99999999, state: 'empty', time1: '00:00', time2: '00:00'},
            {number: 10000001, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 12222221, state: 'empty', time1: '00:00', time2: '00:00'},
            {number: 22222222, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 33333333, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 44444444, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 55555555, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 66666666, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 77777777, state: 'empty', time1: '00:00', time2: '00:00'},
            {number: 88888888, state: 'empty', time1: '00:00', time2: '00:00'},
            {number: 99999999, state: 'empty', time1: '00:00', time2: '00:00'},
            {number: 10000001, state: 'full', time1: '00:00', time2: '00:00'}
            ]
        }
    ]

    const GeneratedMenus = [];

    for(let i = 0; i < trainList.length; i++) {
        let TrainObject = {
            label: "default-sub",
            submenu: []
        }

        TrainObject.label = "Train "+(i+1);
        TrainObject.submenu[0] = {label: "Total time: "+trainList[i].time};

        for(let j = 0; j < (trainList[i].wagons).length; j++) {
            let WagonObject = {
                label: "default-wag",
                submenu: []
            }

            WagonObject.label = (trainList[i].wagons[j]).number;
            WagonObject.submenu[0] = {label: (trainList[i].wagons[j]).state};
            WagonObject.submenu[1] = {label: "Arrived at " + (trainList[i].wagons[j]).time1};
            WagonObject.submenu[2] = {label: "Departured at " + (trainList[i].wagons[j]).time2};

            (TrainObject.submenu).push(WagonObject);
        }

        GeneratedMenus.push(TrainObject);
    }

    console.log(GeneratedMenus);
    return GeneratedMenus;
}

export default function MultiMenusList() {

    return (
        <Wrapper className='WrapperClass'>
            <MultiMenus menus={generateMenus()}/>
        </Wrapper>
    )
}