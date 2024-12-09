import React, { useState } from "react";
import { useTheme } from '../provider/ThemeProvider';

const ToggleButton = ({ initialState = false, onToggle,labelOn, labelOff, colorOn = "bg-purple-500", colorOff = "bg-gray-300" }) => {
  const [isToggled, setIsToggled] = useState(initialState);
  const { theme, toggleTheme } = useTheme();

  const handleToggle = () => {
    const newState = !isToggled;
    setIsToggled(newState);
    toggleTheme()
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={handleToggle}
        className={`
          relative 
          w-10 
          h-6
          rounded-full 
          transition-colors 
          duration-300 
          ease-in-out 
          ${isToggled ? colorOn : colorOff}
        `}
      >
        <span
          className={`
            absolute 
            top-1 
            left-1 
            w-4
            h-4 
            bg-white 
            rounded-full 
            shadow-md 
            transform 
            transition-transform 
            duration-300 
            ease-in-out
            ${isToggled ? "translate-x-4" : "translate-x-0"}
          `}
        />
      </button>
      <span className="text-sm font-medium text-gray-800">{isToggled ? labelOn : labelOff}</span>
    </div>
  );
};

export default ToggleButton;
