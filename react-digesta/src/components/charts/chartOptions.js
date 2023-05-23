export const options = {

    layout: {
        padding: 20
    },
    indexAxis: 'y',
    barThickness: 30,
    maintainAspectRatio: false,
    hoverBackgroundColor: "rgba(0,0,0,0.3)",
    plugins: {
        datalabels: {
            color: 'black',
            anchor: 'start',
            align: "end",
            font_weight: "bold",
            formatter: (value, context) => {
                return `${value} %`
            }

        },
        legend: {
            position: "top"
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
            ticks: {
                callback: (value, index, items) => {
                    return `${value} %`
                }
            }
        },
        y: {
            grid: {
                display: false
            }
        },
    },

};