import { Area } from '@ant-design/plots';
import dayjs from "dayjs";

const Graph = (props) => {
    const convertedTemp = props.currentTemp;
    const uniqDate = props.tempAndDate;
    const uniqDateNewArr = []
    const result = []
    let data = []

//create uniq date with avarege temp from that date
    uniqDate?.filter(el => uniqDateNewArr.push(dayjs(el.date).format("DD.MM")))
    for (const currentDate of uniqDateNewArr) {
        const allTemperatures = uniqDate?.filter(item => dayjs(item.date).format("DD.MM") === currentDate).map(item => item.temperature)
        const averageTemp = allTemperatures.reduce((prev, curr) => prev + curr, 0) / allTemperatures.length
        result.push({ date: currentDate, temperature: Math.round(averageTemp) })
    }
    for (let i = 0; i < result.length; i++) {
        if (uniqDateNewArr[i] !== uniqDateNewArr[i - 1]) {
            data.push(result[i])
        }
    }
    
//reverse array whet current language is HE
    if (document.documentElement.dir === 'rtl') {
        data = [...data].reverse()
    }

    const config = {
        data,
        xField: "date",
        yField: 'temperature',
        xAxis: {
            range: [0, 1],
            line: null,
            label: {
                style: {
                    fill: "#C5C5C5",
                    fontSize: 8,
                    lineHeight: 12,
                },
            },
        },
        line: {
            style: {
                lineWidth: 0,
                opacity: 0.7,
            },
        },
        yAxis: {
            tickCount: false,
        },
        label: {
            type: '',
            offsetY: -12,
            style: {
                textAlign: 'center',
                fontSize: 9,
                fill: '#C5C5C5',
            },
        },
        padding: [12, 20, 20, 20],
        tooltip: false,
        smooth: true,
        areaStyle: () => {
            if (convertedTemp > 0) {
                return {
                    fill: 'l(270) 1:#FFA25B   0:#FFF4F4',
                };
            } else {
                return {
                    fill: 'l(270) 1:#5B8CFF   0:#FFF4F4',
                };
            }
        },
    };

    return (
        <div style={{ width: '320px', height: "80px" }}>
            <Area {...config} />
        </div>
    )
};

export default Graph