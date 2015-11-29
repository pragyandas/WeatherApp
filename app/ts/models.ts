export interface WeatherData {
    city: string,
    position: Position,
    weather: CurrentWeather
}

interface Position {
    lat: number,
    lon: number
}

interface CurrentWeather {
    temperature: number,
    icon: string,
    summary: string
}
