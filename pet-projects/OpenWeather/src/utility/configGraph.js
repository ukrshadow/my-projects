export const CONFIG = {
    xField: 'date',
    yField: 'temperature',
    xAxis: {
        range: [0, 1],
        line: null,
        label: {
            style: {
                fill: '#C5C5C5',
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
}