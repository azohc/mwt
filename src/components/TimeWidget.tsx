import * as React from "react";
import { useState } from "react";
import Select from "./Select";
import "./TimeWidget.css";

const COUNTRY_SPAIN = "spain";
const COUNTRY_USA = "united states";

const LANG_SPANISH = "spanish";
const LANG_ENGLISH = "english";

const HOURS_12 = "12h";
const HOURS_24 = "24h";

const LANGUAGE_OPTIONS = [LANG_SPANISH, LANG_ENGLISH] as const;
const COUNTRY_OPTIONS = [COUNTRY_SPAIN, COUNTRY_USA] as const;
const HOUR_FORMAT_OPTIONS = [HOURS_12, HOURS_24] as const;

interface TimeWidgetConfig {
  country: (typeof COUNTRY_OPTIONS)[number];
  language: (typeof LANGUAGE_OPTIONS)[number];
  hourFormat: (typeof HOUR_FORMAT_OPTIONS)[number];
}

const initialOptions: TimeWidgetConfig = {
  country: COUNTRY_SPAIN,
  language: LANG_ENGLISH,
  hourFormat: HOURS_12,
};

const storeKey = "TIME_WIDGET_CONFIG";
const loadOptions = (): TimeWidgetConfig => {
  const ls = localStorage.getItem(storeKey);
  if (!ls) return initialOptions;

  try {
    return JSON.parse(ls);
  } catch (error) {
    return initialOptions;
  }
};

interface TimeWidgetProps {
  date: Date;
  editable: boolean;
}

const TimeWidget = ({ date, editable }: TimeWidgetProps) => {
  const [config, setConfig] = useState<TimeWidgetConfig>(loadOptions);

  const saveConfig = (options: TimeWidgetConfig) => {
    setConfig(options);
    localStorage.setItem(storeKey, JSON.stringify(options));
  };

  const displayTimeString = () => {
    let lang, country;

    switch (config["language"]) {
      case LANG_SPANISH:
        lang = "es";
        break;
      case LANG_ENGLISH:
        lang = "en";
        break;
      default:
        throw new Error("unrecognized language");
    }

    switch (config["country"]) {
      case COUNTRY_SPAIN:
        country = "ES";
        break;
      case COUNTRY_USA:
        country = "EN";
        break;
      default:
        throw new Error("unrecognized country");
    }

    return date.toLocaleTimeString(`${lang}-${country}`, {
      hour12: config["hourFormat"] === HOURS_12,
    });
  };

  if (!editable) {
    return <h1 className="time-display">{displayTimeString()}</h1>;
  }
  return (
    <div className="time-editable-container">
      <div className="time-header">
        <h1 className="time-widget-title">time format</h1>
        <></>
        {/* <button className="drag-handle">✋👊</button> */}
      </div>
      <div className="time-controls-preview">
        <div className="time-controls">
          <Select
            label="country"
            initialSelectedOption={config["country"]}
            options={COUNTRY_OPTIONS}
            onOptionChange={(newValue) =>
              saveConfig({
                ...config,
                country: newValue as TimeWidgetConfig["country"],
              })
            }
          />
          <Select
            label="language"
            initialSelectedOption={config["language"]}
            options={LANGUAGE_OPTIONS}
            onOptionChange={(newValue) =>
              saveConfig({
                ...config,
                language: newValue as TimeWidgetConfig["language"],
              })
            }
          />
          <Select
            label="hour format"
            initialSelectedOption={config["hourFormat"]}
            options={HOUR_FORMAT_OPTIONS}
            onOptionChange={(newValue) =>
              saveConfig({
                ...config,
                hourFormat:
                  newValue as TimeWidgetConfig["hourFormat"],
              })
            }
          />
        </div>
        <div className="time-preview">
          <div className="time-preview-label">preview</div>
          <h2 className="time-widget-preview">
            {displayTimeString()}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default TimeWidget;
