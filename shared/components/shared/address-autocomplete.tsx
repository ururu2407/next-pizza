'use client';

import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Input } from '../ui';

interface Feature {
  properties: {
    place_id: string;
    formatted: string;
  };
}

interface GeoapifyResponse {
  features: Feature[];
}

interface Props {
  className?: string;
  onChange?: (formattedAddress: string) => void;
}

export const AddressAutocomplete: React.FC<Props> = ({ className, onChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<Feature[]>([]);

  const fetchSuggestions = async (query: string) => {
    const apiKey = '9cee414d0a284e17bd53f58fc1bfc72b';
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${apiKey}`;
    try {
      const response = await axios.get<GeoapifyResponse>(url);
      setSuggestions(response.data.features);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
    setInputValue(e.target.value);
    fetchSuggestions(e.target.value);
  };

  const handleSuggestionClick = (formattedAddress: string) => {
    setInputValue(formattedAddress);
    onChange?.(formattedAddress);
    setSuggestions([]);
  };

  return (
    <div className={className}>
      <Input
        className="h-12 text-md"
        value={inputValue}
        onChange={handleChange}
        placeholder="Address"
      />
      {suggestions.length > 0 && (
        <ul className="w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all">
          {suggestions.map((suggestion) => (
            <li
              className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10 opacity-80 cursor-pointer"
              key={suggestion.properties.place_id}
              onClick={() => handleSuggestionClick(suggestion.properties.formatted)}
            >
              {suggestion.properties.formatted}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
