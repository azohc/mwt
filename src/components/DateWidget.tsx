import * as React from "react";
import { useState } from "react";
import "./DateWidget.css";
import Select from "./Select";

const COUNTRY_SPAIN = "spain";
const COUNTRY_USA = "united states";

const LANG_SPANISH = "spanish";
const LANG_ENGLISH = "english";

const LANGUAGE_OPTIONS = [LANG_SPANISH, LANG_ENGLISH] as const;
const COUNTRY_OPTIONS = [COUNTRY_SPAIN, COUNTRY_USA] as const;
const OPTION_NONE = "none";
const OPTION_NUMERIC = "numeric";
const OPTION_2DIGIT = "2-digit";
const OPTION_NARROW = "narrow";
const OPTION_SHORT = "short";
const OPTION_LONG = "long";

const DAY_OPTIONS = [
  OPTION_NONE,
  OPTION_NUMERIC,
  OPTION_2DIGIT,
] as const;

const WEEKDAY_OPTIONS = [
  OPTION_NONE,
  OPTION_NARROW,
  OPTION_SHORT,
  OPTION_LONG,
] as const;

const YEAR_OPTIONS = [
  OPTION_NONE,
  OPTION_NUMERIC,
  OPTION_2DIGIT,
] as const;

const MONTH_OPTIONS = [
  OPTION_NONE,
  OPTION_NUMERIC,
  OPTION_2DIGIT,
  OPTION_NARROW,
  OPTION_SHORT,
  OPTION_LONG,
] as const;

interface DateWidgetConfig {
  country: (typeof COUNTRY_OPTIONS)[number];
  language: (typeof LANGUAGE_OPTIONS)[number];
  day?: (typeof DAY_OPTIONS)[number];
  weekday?: (typeof WEEKDAY_OPTIONS)[number];
  month?: (typeof MONTH_OPTIONS)[number];
  year?: (typeof YEAR_OPTIONS)[number];
}

const initialOptions: DateWidgetConfig = {
  country: COUNTRY_SPAIN,
  language: LANG_ENGLISH,
  day: OPTION_NUMERIC,
  month: OPTION_NUMERIC,
  year: OPTION_NUMERIC,
};

const storeKey = "DATE_WIDGET_CONFIG";
const loadConfig = (): DateWidgetConfig => {
  const ls = localStorage.getItem(storeKey);
  if (!ls) return initialOptions;

  try {
    return JSON.parse(ls);
  } catch (error) {
    return initialOptions;
  }
};

interface DateWidgetProps {
  date: Date;
  editable: boolean;
}

const DateWidget = ({ date, editable }: DateWidgetProps) => {
  const [config, setConfig] = useState<DateWidgetConfig>(loadConfig);

  const saveConfig = (options: DateWidgetConfig) => {
    setConfig(options);
    localStorage.setItem(storeKey, JSON.stringify(options));
  };

  const displayDateString = () => {
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

    return date
      .toLocaleDateString(`${lang}-${country}`, {
        day:
          config["day"] === OPTION_NONE ? undefined : config["day"],
        weekday:
          config["weekday"] === OPTION_NONE
            ? undefined
            : config["weekday"],
        month:
          config["month"] === OPTION_NONE
            ? undefined
            : config["month"],
        year:
          config["year"] === OPTION_NONE ? undefined : config["year"],
      })
      .toLowerCase();
  };

  if (!editable) {
    return <h1 className="date-display">{displayDateString()}</h1>;
  }
  return (
    <div className="date-editable-container">
      <div className="date-header">
        <h1 className="date-widget-title">date format</h1>
        <></>
      </div>
      <div className="date-controls-preview">
        <div className="date-controls">
          <Select
            label="country"
            initialSelectedOption={config["country"]}
            options={COUNTRY_OPTIONS}
            onOptionChange={(newValue) =>
              saveConfig({
                ...config,
                country: newValue as DateWidgetConfig["country"],
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
                language: newValue as DateWidgetConfig["language"],
              })
            }
          />
        </div>
        <div className="date-controls">
          <Select
            label="weekday"
            initialSelectedOption={config["weekday"] || OPTION_NONE}
            options={WEEKDAY_OPTIONS}
            onOptionChange={(newValue) =>
              saveConfig({
                ...config,
                weekday: newValue as DateWidgetConfig["weekday"],
              })
            }
          />
          <Select
            label="day"
            initialSelectedOption={config["day"] || OPTION_NONE}
            options={DAY_OPTIONS}
            onOptionChange={(newValue) =>
              saveConfig({
                ...config,
                day: newValue as DateWidgetConfig["day"],
              })
            }
          />
          <Select
            label="month"
            initialSelectedOption={config["month"] || OPTION_NONE}
            options={MONTH_OPTIONS}
            onOptionChange={(newValue) =>
              saveConfig({
                ...config,
                month: newValue as DateWidgetConfig["month"],
              })
            }
          />
          <Select
            label="year"
            initialSelectedOption={config["year"] || OPTION_NONE}
            options={YEAR_OPTIONS}
            onOptionChange={(newValue) =>
              saveConfig({
                ...config,
                year: newValue as DateWidgetConfig["year"],
              })
            }
          />
        </div>
        <div className="date-preview">
          <div className="date-preview-label">preview</div>
          <h2 className="date-widget-preview">
            {displayDateString()}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default DateWidget;
