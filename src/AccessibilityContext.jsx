"use client"
import { createContext, useState, useContext, useEffect } from 'react';

// Create context
const AccessibilityContext = createContext();


const loadSavedSettings = () => {
  if (typeof window === 'undefined') return {
    highContrast: false,
    dyslexicFont: false,
    cursorHighlight: false,
    largeText: false,
    hoverTextEnlarge: false
  };
  
  try {
    const savedSettings = localStorage.getItem('accessibilitySettings');
    return savedSettings ? JSON.parse(savedSettings) : {
      highContrast: false,
      dyslexicFont: false,
      cursorHighlight: false,
      largeText: false,
      hoverTextEnlarge: false
    };
  } catch (error) {
    console.error('Error loading accessibility settings:', error);
    return {
      highContrast: false,
      dyslexicFont: false,
      cursorHighlight: false,
      largeText: false,
      hoverTextEnlarge: false
    };
  }
};

export function AccessibilityProvider({ children }) {
  const [settings, setSettings] = useState(loadSavedSettings);

  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;
    
    // Apply classes to document.body
    if (settings.highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }

    if (settings.dyslexicFont) {
      document.body.classList.add('dyslexic-font');
    } else {
      document.body.classList.remove('dyslexic-font');
    }

    if (settings.cursorHighlight) {
      document.body.classList.add('cursor-highlight');
    } else {
      document.body.classList.remove('cursor-highlight');
    }
    
    if (settings.largeText) {
      document.body.classList.add('text-2xl');
    } else {
      document.body.classList.remove('text-2xl');
    }
    
    if (settings.hoverTextEnlarge) {
      document.body.classList.add('hover-text-enlarge');
    } else {
      document.body.classList.remove('hover-text-enlarge');
    }

    // Save settings to localStorage
    localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
  }, [settings]);

  const toggleSetting = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <AccessibilityContext.Provider value={{ settings, toggleSetting }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  return useContext(AccessibilityContext);
}