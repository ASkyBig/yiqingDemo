import React, {useEffect, useState} from "react";
import styled from "styled-components";
import axios from "axios";

const TotalWrap = styled.div`
    height: 400px;
    box-shadow: 0 0.08rem 0.266667rem 0 rgba(194, 200, 219, .3);
    border-radius: 10px;
    padding: 20px;
   
`
const TitleWrap = styled.div`
    font-size: 32px;
    font-weight: 600;
    color: #222222;
    padding: 0;
    margin-bottom: 50px;
`
const DetailWrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
`
const ItemWrap = styled.div`
    text-align: center;
    width: 140px;
    height: 100px;
    margin-bottom: 80px;

`
const TextOne = styled.div`
    color: ${props => props.color};
    font-size: 12px;
`
const TextTwo = styled.div`
    font-size: 40px;
    color: ${props => props.color};
`
const TextThree = styled.div`
    font-size: 24px;
`
function ItemInfo(props) {
    const { count = 0, compareNum, desc, color} = props.info
    return (
        <ItemWrap>
            <TextOne color={color}><span style={{ color: 'black'}}>昨日</span> {compareNum > 0 ? `+${compareNum}` : compareNum}</TextOne>
            <TextTwo color={color}>{count}</TextTwo>
            <TextThree>{desc}</TextThree>
        </ItemWrap>
    )
}
// const dataList = [
//     {count: 11, compareNum: -1, desc: '现存确诊', color: '#f74c30'},
//     {count: 2, compareNum: -20, desc: '现存重症', color: '#b5212b;'},
//     {count: 3, compareNum: 100, desc: '境外输入', color: '#fe9317;'},
//     {count: 4, compareNum: 666, desc: '累计确诊', color: '#e10000;;'},
//     {count: 5, compareNum: 666, desc: '累计治愈', color: '#15a582;'},
//     {count: 6, compareNum: 0, desc: '累计死亡', color: '#00193c;'}
// ]
export default function TotalCondition() {
    const [dataList, setDataList] = useState([])
    useEffect(() => {
        axios.get('https://lab.isaaclin.cn/nCoV/api/overall')
            .then(res => {
                if (res.data.success) {
                    const data = res.data.results[0]
                    const newData = []
                    newData.push({count: data.currentConfirmedCount, compareNum: data.currentConfirmedIncr, desc: '现存确诊', color: '#f74c30'})
                    newData.push({count: data.seriousCount, compareNum: data.seriousIncr, desc: '现存重症', color: '#b5212b'})
                    newData.push({count: data.suspectedCount, compareNum: data.suspectedIncr, desc: '疑似感染', color: '#fe9317'})
                    newData.push({count: data.confirmedCount, compareNum: data.confirmedIncr, desc: '累计确诊', color: '#e10000'})
                    newData.push({count: data.curedCount, compareNum: data.curedIncr, desc: '累计治愈', color: '#15a582'})
                    newData.push({count: data.deadCount, compareNum: data.deadIncr, desc: '累计死亡', color: '#00193c'})
                    setDataList(newData)
                }
            })
    }, [])

    return (
        <TotalWrap>
            <TitleWrap>全国疫情</TitleWrap>
            <div style={{color: 'lightgray', fontSize: '12px', marginTop: '-50px', marginBottom: '20px'}}>数据来源：丁香园</div>
            <DetailWrap>
                {
                    dataList.map(item => <ItemInfo key={item.desc} info={item}/>)
                }
            </DetailWrap>
        </TotalWrap>
    )
}
