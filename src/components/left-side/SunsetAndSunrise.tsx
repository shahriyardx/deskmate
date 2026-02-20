import { useGeolocation } from "@/hooks/use-geolocaction"
import { Sunrise, Sunset } from "lucide-react"
import moment from "moment"
import suncalc from "suncalc"


const SunsetAndSunrise = () => {
  const location = useGeolocation()
  if (location.error) return

  const times = suncalc.getTimes(
    new Date(),
    location.latitude as number,
    location.longitude as number,
  )

  return (
    <div className="flex items-center gap-3">
      <p className="flex items-center gap-2">
        <Sunrise size={16} />{" "}
        <span>{moment(times.sunrise).format("hh:mm A")}</span>
      </p>

      <p className="flex items-center gap-2">
        <Sunset size={16} />{" "}
        <span>{moment(times.sunset).format("hh:mm A")}</span>
      </p>
    </div>
  )
}

export default SunsetAndSunrise
