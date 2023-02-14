import * as React from "react";
import { useState } from "react";
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

interface TimeWidgetOptions {
  country: (typeof COUNTRY_OPTIONS)[number];
  language: (typeof LANGUAGE_OPTIONS)[number];
  hourFormat: (typeof HOUR_FORMAT_OPTIONS)[number];
}

const initialOptions: TimeWidgetOptions = {
  country: COUNTRY_SPAIN,
  language: LANG_ENGLISH,
  hourFormat: HOURS_12,
};

const storeKey = "TIME_WIDGET_OPTIONS";
const loadOptions = (): TimeWidgetOptions => {
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
  const [options, setOptions] =
    useState<TimeWidgetOptions>(loadOptions);

  const saveOptions = (options: TimeWidgetOptions) => {
    setOptions(options);
    localStorage.setItem(storeKey, JSON.stringify(options));
  };

  const displayTimeString = () => {
    let lang, country;

    switch (options["language"]) {
      case LANG_SPANISH:
        lang = "es";
        break;
      case LANG_ENGLISH:
        lang = "en";
        break;
      default:
        throw new Error("unrecognized language");
    }

    switch (options["country"]) {
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
      hour12: options["hourFormat"] === HOURS_12,
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
          <div className="time-control">
            <label htmlFor="country">country</label>
            <select
              id="country"
              value={options["country"]}
              onChange={(e) =>
                saveOptions({
                  ...options,
                  country: e.target
                    .value as TimeWidgetOptions["country"],
                })
              }
            >
              {COUNTRY_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="time-control">
            <label htmlFor="language">language</label>
            <select
              id="language"
              value={options["language"]}
              onChange={(e) =>
                saveOptions({
                  ...options,
                  language: e.target
                    .value as TimeWidgetOptions["language"],
                })
              }
            >
              {LANGUAGE_OPTIONS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
          {/* TODO make a two button combo situation instead of dropdown? */}
          <div className="time-control">
            <label htmlFor="hourFormat">hour format</label>
            <select
              id="hourFormat"
              value={options["hourFormat"]}
              onChange={(e) =>
                saveOptions({
                  ...options,
                  hourFormat: e.target
                    .value as TimeWidgetOptions["hourFormat"],
                })
              }
            >
              {HOUR_FORMAT_OPTIONS.map((hf) => (
                <option key={hf} value={hf}>
                  {hf}
                </option>
              ))}
            </select>
          </div>
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
