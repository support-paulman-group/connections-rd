import type { ConnectionsWeatherBlock } from "@herramientas/content/types";
import type { WeatherConditionKey, WeatherUnit } from "@herramientas/weather/model";

type WeatherHeaderProps = {
  props: ConnectionsWeatherBlock["props"];
  conditionKey: WeatherConditionKey;
  loading: boolean;
  unit: WeatherUnit;
  onToggleUnit: () => void;
};

export function WeatherHeader({ props, conditionKey, loading, unit, onToggleUnit }: WeatherHeaderProps) {
  return (
    <div className="connections-weather__header">
      <div className="connections-weather__copy">
        <p>{props.sectionLabel}</p>
        <h2>{props.title}</h2>
        {props.narrative && <span>{props.narrative}</span>}
      </div>
      <div className="connections-weather__actions" aria-label="Weather controls">
        <span className="connections-weather__condition">{loading ? "..." : getConditionLabel(conditionKey, props)}</span>
        <button className="connections-weather__toggle" type="button" onClick={onToggleUnit}>
          {unit === "C" ? props.toggleLabelF : props.toggleLabelC}
        </button>
      </div>
    </div>
  );
}

function getConditionLabel(conditionKey: WeatherConditionKey, props: ConnectionsWeatherBlock["props"]) {
  if (conditionKey === "rainy") return props.conditionRainy;
  if (conditionKey === "windy") return props.conditionWindy;
  if (conditionKey === "humid") return props.conditionHumid;
  if (conditionKey === "mostly_sunny" || conditionKey === "clear") return props.conditionMostlySunny;
  if (conditionKey === "partly_cloudy") return props.conditionPartlyCloudy;
  return props.conditionUnknown;
}
