import * as React from "react";
import { useState } from "react";
import "./DateWidget.css";

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

interface DateWidgetOptions {
  country: (typeof COUNTRY_OPTIONS)[number];
  language: (typeof LANGUAGE_OPTIONS)[number];
  day?: (typeof DAY_OPTIONS)[number];
  weekday?: (typeof WEEKDAY_OPTIONS)[number];
  month?: (typeof MONTH_OPTIONS)[number];
  year?: (typeof YEAR_OPTIONS)[number];
}

const initialOptions: DateWidgetOptions = {
  country: COUNTRY_SPAIN,
  language: LANG_ENGLISH,
  day: OPTION_NUMERIC,
  month: OPTION_NUMERIC,
  year: OPTION_NUMERIC,
};

const storeKey = "DATE_WIDGET_OPTIONS";
const loadOptions = (): DateWidgetOptions => {
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
  const [options, setOptions] =
    useState<DateWidgetOptions>(loadOptions);

  const saveOptions = (options: DateWidgetOptions) => {
    setOptions(options);
    localStorage.setItem(storeKey, JSON.stringify(options));
  };

  const displayDateString = () => {
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

    return date
      .toLocaleDateString(`${lang}-${country}`, {
        day:
          options["day"] === OPTION_NONE ? undefined : options["day"],
        weekday:
          options["weekday"] === OPTION_NONE
            ? undefined
            : options["weekday"],
        month:
          options["month"] === OPTION_NONE
            ? undefined
            : options["month"],
        year:
          options["year"] === OPTION_NONE
            ? undefined
            : options["year"],
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
          <div className="date-control">
            <label htmlFor="country">country</label>
            <select
              id="country"
              value={options["country"]}
              onChange={(e) =>
                saveOptions({
                  ...options,
                  country: e.target
                    .value as DateWidgetOptions["country"],
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
          <div className="date-control">
            <label htmlFor="language">language</label>
            <select
              id="language"
              value={options["language"]}
              onChange={(e) =>
                saveOptions({
                  ...options,
                  language: e.target
                    .value as DateWidgetOptions["language"],
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
        </div>
        <div className="date-controls">
          <div className="date-control">
            <label htmlFor="weekday">weekday</label>
            <select
              id="weekday"
              value={options["weekday"]}
              onChange={(e) =>
                saveOptions({
                  ...options,
                  weekday: e.target
                    .value as DateWidgetOptions["weekday"],
                })
              }
            >
              {WEEKDAY_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="date-control">
            <label htmlFor="day">day</label>
            <select
              id="day"
              value={options["day"]}
              onChange={(e) =>
                saveOptions({
                  ...options,
                  day: e.target.value as DateWidgetOptions["day"],
                })
              }
            >
              {DAY_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="date-control">
            <label htmlFor="month">month</label>
            <select
              id="month"
              value={options["month"]}
              onChange={(e) =>
                saveOptions({
                  ...options,
                  month: e.target.value as DateWidgetOptions["month"],
                })
              }
            >
              {MONTH_OPTIONS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
          <div className="date-control">
            <label htmlFor="year">year</label>
            <select
              id="year"
              value={options["year"]}
              onChange={(e) =>
                saveOptions({
                  ...options,
                  year: e.target.value as DateWidgetOptions["year"],
                })
              }
            >
              {YEAR_OPTIONS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
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
