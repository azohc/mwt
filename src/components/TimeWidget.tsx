import * as React from "react";
import { useState } from "react";
import "./TimeWidget.css";

const COUNTRY_SPAIN = "spain";
const COUNTRY_USA = "united states";

const LANG_SPANISH = "spanish";
const LANG_ENGLISH = "english";

const HOURS_12 = "12h";
const HOURS_24 = "24h";

const languages = [LANG_SPANISH, LANG_ENGLISH];
const countries = [COUNTRY_SPAIN, COUNTRY_USA];
const hourFormats = [HOURS_12, HOURS_24];

const initialOptions = {
  country: COUNTRY_SPAIN,
  language: LANG_ENGLISH,
  hourFormat: HOURS_12,
};

interface TimeWidgetProps {
  date: Date;
  editable: boolean;
}
const TimeWidget = ({ date, editable }: TimeWidgetProps) => {
  const [options, setOptions] = useState(initialOptions);
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

  return editable ? (
    <div className="time-editable-container">
      <div className="header">
        <h1 className="widget-title">time format</h1>
        <button className="drag-handle">✋👊</button>
      </div>
      <div className="controls-preview">
        <div className="controls">
          <div className="control">
            <label htmlFor="country">country</label>
            <select
              id="country"
              value={options["country"]}
              onChange={(e) =>
                setOptions({ ...options, country: e.target.value })
              }
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="control">
            <label htmlFor="language">language</label>
            <select
              id="language"
              value={options["language"]}
              onChange={(e) =>
                setOptions({ ...options, language: e.target.value })
              }
            >
              {languages.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
          {/* TODO make a two button combo situation instead of dropdown? */}
          <div className="control">
            <label htmlFor="hourFormat">hour format</label>
            <select
              id="hourFormat"
              value={options["hourFormat"]}
              onChange={(e) =>
                setOptions({ ...options, hourFormat: e.target.value })
              }
            >
              {hourFormats.map((hf) => (
                <option key={hf} value={hf}>
                  {hf}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="preview">
          <div className="preview-label">preview</div>
          <h2 className="widget-preview">{displayTimeString()}</h2>
        </div>
      </div>
    </div>
  ) : (
    <h1 className="time-display">{displayTimeString()}</h1>
  );
};

export default TimeWidget;
