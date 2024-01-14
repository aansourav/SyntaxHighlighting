import React, { useRef, useState } from "react";

export default function App() {
  const suggestions = ["tomato", "tom cruise", "tetul", "technology"];
  const [isFocus, setIsFocus] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef();
  const [inputValue, setInputValue] = useState("");

const getHighlightedText = (text, highlight) => {
  let index = 0;

  return (
    <span>
      {text.split("").map((char, i) => {
        const isMatch = char.toLowerCase() === (highlight[index] || "").toLowerCase();

        if (isMatch) {
          index++;
        } else {
          index = 0; // Reset index if the characters do not match
        }

        return (
          <span key={i} style={{ color: isMatch ? "blue" : "inherit" }}>
            {char}
          </span>
        );
      })}
    </span>
  );
};


  const filterSuggestions = () => {
    return suggestions.filter(
      (suggestion) => suggestion.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <h1 className="text-4xl font-bold">Type Here for Getting Suggestion</h1>
        <div className="mt-10 relative">
          <input
            className="w-full focus:outline-none border-2 p-5"
            placeholder="focus to get suggestion"
            onFocus={() => setIsFocus(true)}
            onBlur={() => {
              if (!isHovered) {
                setIsFocus(false);
              }
            }}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            ref={inputRef}
          />
          {isFocus && inputValue && (
            <div
              className="shadow-lg absolute w-full"
              onMouseEnter={() => {
                setIsHovered(true);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
              }}
            >
              {filterSuggestions().map((suggestion, index) => (
                <div
                  key={index}
                  className="p-5 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setInputValue(suggestion);
                    inputRef.current.focus();
                  }}
                >
                  {getHighlightedText(suggestion, inputValue)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
