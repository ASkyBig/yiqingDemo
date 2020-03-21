import React, {useEffect, useState, useRef, forwardRef, createContext, useContext} from 'react';
import axios from 'axios'
import TotalCondition from "./Components/TotalCondition";
import Nav from './Components/Nav'
import styled, { keyframes } from "styled-components"
import HeaderImg from "./Assets/header.jpg"
import Tab1 from './Assets/tab1.jpeg'
import Tab2 from './Assets/tab2.jpeg'
import Tab3 from './Assets/tab3.jpeg'
import LoadingSvg from './Assets/loading.svg'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const ImgRotate = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`
const LoadingBox = styled.div`
  width: 500px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const LoadingSvgBox = styled.img`
  width: 100px;
  height: 100px;
  animation: 2s ${ImgRotate} infinite linear;
`
const Nav1 = forwardRef(Nav)
export const NumContext = createContext(0);
const ImgWrap = styled.img`
    width: 500px;
    height: 200px;
`
const styles = {
    slide: {
        // padding: 15,
        // height: 400,
        minHeight: 100,
        color: '#fff',
    },
    slide1: {
        height: 200,
        background: '#FEA900',
    },
    slide2: {
        height: 200,
        background: '#B3DC4A',
    },
    slide3: {
        height: 200,
        background: '#6AC0FF',
    },
};


let myChart
const dataList=[
    {name:"南海诸岛",confirmedCount:0, newAddNum: 0, cureNum: 0, deadNum: 0},
    {name: '北京', confirmedCount:0, newAddNum: 0, cureNum: 0, deadNum: 0},
    {name: '天津', confirmedCount:0, newAddNum: 0, cureNum: 0, deadNum: 0},
    {name: '上海',confirmedCount:0, newAddNum: 0, cureNum: 0, deadNum: 0},
    {name: '重庆',confirmedCount:0, newAddNum: 0, cureNum: 0, deadNum: 0},
    {name: '河北',confirmedCount:0, newAddNum: 0, cureNum: 0, deadNum: 0},
    {name: '河南',confirmedCount:0, newAddNum: 0, cureNum: 0, deadNum: 0},
    {name: '云南',confirmedCount:0, newAddNum: 0, cureNum: 0, deadNum: 0},
    {name: '辽宁',confirmedCount:0, newAddNum: 0, cureNum: 0, deadNum: 0},
    {name: '黑龙江',confirmedCount:0, newAddNum: 0, cureNum: 0, deadNum: 0},
    {name: '湖南', confirmedCount:0, newAddNum: 0, cureNum: 0, deadNum: 0},
    {name: '安徽',confirmedCount:0, newAddNum: 0, cureNum: 0, deadNum: 0},
    {name: '山东',confirmedCount:0, newAddNum: 0, cureNum: 0, deadNum: 0},
    {name: '新疆',confirmedCount:0, newAddNum: 0, cureNum: 0, deadNum: 0},
    {name: '江苏',confirmedCount:0, newAddNum: 0, cureNum: 0, deadNum: 0},
    {name: '浙江',confirmedCount:0, newAddNum: 0, cureNum: 0, deadNum: 0},
    {name: '江西',confirmedCount:0, newAddNum: 0, cureNum: 0, deadNum: 0},
    {name: '湖北',confirmedCount:0, newAddNum: 0, cureNum: 0, deadNum: 0},
    {name: '广西',confirmedCount:0, newAddNum: 0, cureNum: 0, deadNum: 0},
    {name: '甘肃',confirmedCount:0, newAddNum: 0, cureNum: 0, deadNum: 0},
    {name: '山西',confirmedCount:0, newAddNum: 0, cureNum: 0, deadNum: 0},
    {name: '内蒙古',confirmedCount:0, newAddNum: 0, cureNum: 0, deadNum: 0},
    {name: '陕西', confirmedCount:0, newAddNum: 0, cureNum: 0, deadNum: 0},
    {name: '吉林', confirmedCount:0, newAddNum: 0, cureNum: 0, deadNum: 0},
    {name: '福建', confirmedCount:0, newAddNum: 0, cureNum: 0, deadNum: 0},
    {name: '贵州', confirmedCount:0, newAddNum: 0, cureNum: 0, deadNum: 0},
    {name: '广东',confirmedCount:0, newAddNum: 0, cureNum: 0, deadNum: 0},
    {name: '青海', confirmedCount:0, newAddNum: 0, cureNum: 0, deadNum: 0},
    {name: '西藏', confirmedCount:0, newAddNum: 0, cureNum: 0, deadNum: 0},
    {name: '四川', confirmedCount:0, newAddNum: 0, cureNum: 0, deadNum: 0},
    {name: '宁夏', confirmedCount:0, newAddNum: 0, cureNum: 0, deadNum: 0},
    {name: '海南', confirmedCount:0, newAddNum: 0, cureNum: 0, deadNum: 0},
    {name: '台湾', confirmedCount:0, newAddNum: 0, cureNum: 0, deadNum: 0},
    {name: '香港', confirmedCount:0, newAddNum: 0, cureNum: 0, deadNum: 0},
    {name: '澳门', confirmedCount:0, newAddNum: 0, cureNum: 0, deadNum: 0},
]

function Header() {
    return (
        <ImgWrap src={HeaderImg} />
    )
}

function Nav2Com() {
    return (
        <div>nav2 content</div>
    )
}

function Nav3Com() {
    return (
        <div>nav3 content</div>
    )
}

function Nav4Com() {
    return (
        <div>nav4 content</div>
    )
}
function Nav5Com() {
    return (
        <div>nav5 content</div>
    )
}


function Loading() {
    return (
        <LoadingBox>
            <div>Loading...</div>
            < LoadingSvgBox src={LoadingSvg} />
        </LoadingBox>
    )
}

function DetailCom() {
    const [ overallArr, setOverallArr ] = useState([])
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        axios.get('https://lab.isaaclin.cn/nCoV/api/area')
            .then(res => {
                console.log('res', res.data.results)
                const { results } = res.data
                dataList.forEach(item => {
                    const itemMatch = results.find(it => it.provinceShortName === item.name)
                    if (itemMatch) {
                        item.value = itemMatch.confirmedCount
                        item.confirmedCount = itemMatch.confirmedCount
                        item.newAddNum = itemMatch.suspectedCount
                        item.cureNum = itemMatch.curedCount
                        item.deadNum = itemMatch.deadCount
                    }
                })
                console.log('dataList', dataList)
                myChart.setOption({
                    series : [
                        {
                            name: '确诊人数',
                            type: 'map',
                            geoIndex: 0,
                            data: dataList
                        }
                    ]
                })
                setLoading(false)
                setOverallArr(res.data.results)
            })
    }, [])
    return (
      <div style={{ width: '500px'}} >
          {
              loading ? <Loading />
                : <div>
                    <h1>中国病例</h1>
                    <ul>
                        <li>
                            <span>地区</span>
                            <span>确诊</span>
                            <span>治愈</span>
                            <span>死亡</span>
                        </li>
                    </ul>
                    <div style={{ height: '400px', overflow: 'scroll'}}>
                        {
                            overallArr.map(item => {
                                return (
                                    item.countryName ==='中国'
                                        ? <li key={item.provinceName}>
                                            <span>{item.provinceName}</span>
                                            <span>{item.confirmedCount}</span>
                                            <span>{item.curedCount}</span>
                                            <span>{item.deadCount}</span>
                                        </li>
                                        : null
                                )
                            })
                        }
                    </div>

                  </div>
          }
      </div>
    )
}

const  option = {
    tooltip: {
        formatter:function(params,ticket, callback){
            return params.seriesName + '<br />' + params.name + '：' + params.data.confirmedCount
        }//数据格式化
    },
    visualMap: {
        min: 0,
        max: 1500,
        left: 'left',
        top: 'bottom',
        text: ['高','低'],//取值范围的文字
        inRange: {
            color: ['#F5DEB3', '#800000']//取值范围的颜色
        },
        show:true//图注
    },
    geo: {
        map: 'china',
        roam: false,//不开启缩放和平移
        zoom:1.23,//视角缩放比例
        label: {
            normal: {
                show: true,
                fontSize:'10',
                color: 'rgba(0,0,0,0.7)'
            }
        },
        itemStyle: {
            normal:{
                borderColor: 'rgba(0, 0, 0, 0.2)'
            },
            emphasis:{
                areaColor: '#F3B329',//鼠标选择区域颜色
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    },
    series : [
        {
            name: '确诊人数',
            type: 'map',
            geoIndex: 0,
            data: dataList
        }
    ]
};

function App() {
    console.log('render APP')
    const ref = useRef({})
    const [searchVal, setSearchVal] = useState('')
    const [confirmNum, setConfirmNum] = useState('')
    const [newAddNum, setNewAddNum] = useState('')
    const [cureNum, setCureNum] = useState('')
    const [deadNum, setDeadNum] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [hasFound, setHasFound] = useState(false)
    const [curTabIndex, setCurTabIndex] = useState(0)
    const [contentStyleObj, setContentStyleObj] = useState({})

    useEffect(() => {
       myChart = window.echarts.init(document.getElementById('map'))
       myChart.setOption(option)
    }, [])
    useEffect(() => {
        console.log('ref.current.getTabIndex() ===>', ref.current.getTabIndex())
        setCurTabIndex(ref.current.getTabIndex())
        setContentStyleObj({display: 'flex', background: 'gray', transform: `translate(-${curTabIndex * 500}px, 0)`})
    }, [curTabIndex])
    function reset() {
        setConfirmNum('')
        setNewAddNum('')
        setCureNum('')
        setDeadNum('')
    }
    function handleChange(e) {
        console.log('ref', ref.current.getTabIndex())
        setShowSearch(false)
        reset()
        setSearchVal(e.target.value)
    }
    function handleKeyDown(e) {
        if (e.keyCode === 13) {
            setShowSearch(true)
            for (let i = 0; i < dataList.length; i++) {
                if (dataList[i].name == e.target.value) {
                    setHasFound(true)
                    setConfirmNum(dataList[i].confirmedCount)
                    setNewAddNum(dataList[i].newAddNum)
                    setCureNum(dataList[i].cureNum)
                    setDeadNum(dataList[i].deadNum)
                    return
                }
            }
            setHasFound(false)
        }
    }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Header />
        <AutoPlaySwipeableViews style={{width:'500px', height:'200px', overflow: 'hidden'}} autoplay={true} interval={2000}>
            <div style={Object.assign({}, styles.slide, styles.slide1)}>
                <img src={Tab1} style={{ objectFit: 'fill', width: '500px', height: '200px'}}/>
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide2)}>
                <img src={Tab2} style={{ objectFit: 'fill', width: '500px', height: '200px'}}/>
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide3)}>
                <img src={Tab3} style={{ objectFit: 'fill', width: '500px', height: '200px'}}/>
            </div>
        </AutoPlaySwipeableViews>
        <NumContext.Provider value = {{ curTabIndex, setCurTabIndex}}>
            <Nav1 ref={ref}/>
        </NumContext.Provider>
        <div className="contentWrap">
            <div className="content" style={contentStyleObj}>
                <div className="contentItem">
                    <TotalCondition />
                    <div className="map">
                        <h1>地区分布图</h1>
                        <div id="map" style={{ width: '500px', height: '400px'}}></div>
                    </div>
                    <div>
                        <div style={{ width: '500px'}}>
                            <span>省份搜索：</span>
                            <input placeholder="enter键搜索" value={searchVal} onKeyDown={handleKeyDown} onChange={e => handleChange(e)} />
                        </div>

                        {
                            showSearch && <div>
                                <h2>查询结果</h2>
                                {
                                    hasFound
                                        ?  <div>
                                            <div>确诊人数：{confirmNum}</div>
                                            <div>疑似人数：{newAddNum}</div>
                                            <div>治愈人数：{cureNum}</div>
                                            <div>死亡人数：{deadNum}</div>
                                        </div>
                                        : <div>省份数据错误</div>
                                }
                            </div>
                        }
                    </div>
                    <DetailCom />
                </div>
                <div className="contentItem">
                    <Nav2Com></Nav2Com>
                </div>
                <div className="contentItem">
                    <Nav3Com></Nav3Com>
                </div>
                <div className="contentItem">
                    <Nav4Com></Nav4Com>
                </div>
                <div className="contentItem">
                    <Nav5Com></Nav5Com>
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;

