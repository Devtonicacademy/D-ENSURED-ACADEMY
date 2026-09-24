import React, { useState, useEffect } from 'react';
import { 
  MAJOR_FEDERAL_UNIVERSITIES, 
  MAJOR_STATE_UNIVERSITIES, 
  MAJOR_PRIVATE_UNIVERSITIES,
  ALL_MAJOR_UNIVERSITIES 
} from '../../data/universitiesData';

export default function UniversitySelect({
  value,
  onChange,
  className = "w-full px-3 py-2 bg-slate-900/80 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400",
  id,
  required = false
}) {
  const isKnown = ALL_MAJOR_UNIVERSITIES.includes(value);
  const [isCustomMode, setIsCustomMode] = useState(!isKnown && Boolean(value));
  const [customText, setCustomText] = useState(!isKnown ? value || '' : '');

  // Keep internal state aligned if value changes from outside
  useEffect(() => {
    if (value && !ALL_MAJOR_UNIVERSITIES.includes(value)) {
      setIsCustomMode(true);
      setCustomText(value);
    } else if (ALL_MAJOR_UNIVERSITIES.includes(value)) {
      setIsCustomMode(false);
    }
  }, [value]);

  const handleSelectChange = (e) => {
    const selected = e.target.value;
    if (selected === '__CUSTOM__') {
      setIsCustomMode(true);
      if (customText) onChange(customText);
    } else {
      setIsCustomMode(false);
      onChange(selected);
    }
  };

  const handleCustomTextChange = (e) => {
    const text = e.target.value;
    setCustomText(text);
    onChange(text);
  };

  return (
    <div className="space-y-1.5">
      <select
        id={id}
        required={required}
        value={isCustomMode ? '__CUSTOM__' : (value || MAJOR_FEDERAL_UNIVERSITIES[0])}
        onChange={handleSelectChange}
        className={className}
      >
        {/* If initial value is unlisted, display it safely */}
        {value && !isKnown && !isCustomMode && (
          <option value={value}>{value}</option>
        )}

        <optgroup label="Federal Universities">
          {MAJOR_FEDERAL_UNIVERSITIES.map((uni) => (
            <option key={uni} value={uni}>
              {uni}
            </option>
          ))}
        </optgroup>

        <optgroup label="State Universities">
          {MAJOR_STATE_UNIVERSITIES.map((uni) => (
            <option key={uni} value={uni}>
              {uni}
            </option>
          ))}
        </optgroup>

        <optgroup label="Private Universities">
          {MAJOR_PRIVATE_UNIVERSITIES.map((uni) => (
            <option key={uni} value={uni}>
              {uni}
            </option>
          ))}
        </optgroup>

        <option value="__CUSTOM__">Other / Unlisted Nigerian Institution...</option>
      </select>

      {isCustomMode && (
        <div className="animate-fadeIn">
          <input
            type="text"
            required={required}
            placeholder="Type your target institution name..."
            value={customText}
            onChange={handleCustomTextChange}
            className="w-full px-3 py-1.5 bg-slate-950 border border-amber-400/60 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      )}
    </div>
  );
}
