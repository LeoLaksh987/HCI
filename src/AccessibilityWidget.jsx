"use client"
import { useState } from "react";
import { useAccessibility } from "./AccessibilityContext";

const AccessibilityIcon = () => (
  <svg 
    className="w-6 h-6" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" strokeWidth="2"/>
    <path 
      strokeWidth="2"
      strokeLinecap="round"
      d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 3v7m-3-3h6"
    />
  </svg>
);

const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, toggleSetting } = useAccessibility();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-emerald-600 text-white p-3 rounded-full hover:bg-emerald-700 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="Toggle accessibility menu"
      >
        <AccessibilityIcon />
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 w-72 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Accessibility Options</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={settings.highContrast}
                  onChange={() => toggleSetting('highContrast')}
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">High Contrast</span>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={settings.dyslexicFont}
                  onChange={() => toggleSetting('dyslexicFont')}
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Dyslexic-friendly Font</span>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={settings.cursorHighlight}
                  onChange={() => toggleSetting('cursorHighlight')}
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Cursor Highlighting</span>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={settings.largeText}
                  onChange={() => toggleSetting('largeText')}
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Large Text</span>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={settings.hoverTextEnlarge}
                  onChange={() => toggleSetting('hoverTextEnlarge')}
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Text Enlarge on Hover</span>
              </label>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="mt-4 w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 focus:ring-2 focus:ring-gray-300 focus:outline-none"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default AccessibilityWidget;