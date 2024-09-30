// "heading": array[0],
// "average_speed": array[1],
// "gust_speed": array[2],
// "time": datetime.strptime( array[3], "%H:%M:%S%z"),
// "battery_voltage":array[4],
// "battery_percent": array[5],
// "modem_signal_quality": array[6],
// "temp": array[7],
// "humidity": array[8],

export type DataMessage = {
    heading?: number,
    time: Date
    average_speed?: number
    gust_speed?: number
}