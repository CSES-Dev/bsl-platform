'use client';

import React from 'react';

interface Tab {
  label: string;
  value: string;
}

interface TabHeroProps {
  heading: string;
  tabs: Tab[];
  activeTab: string;
  onTabChange: (value: string) => void;
}

export default function TabHero({ heading, tabs, activeTab, onTabChange }: TabHeroProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      {/* Heading */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-black leading-tight max-w-3xl mb-12">
        {heading}
      </h1>

      {/* Tab Buttons */}
      <div className="flex items-stretch">
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.value;
          const isFirst = index === 0;
          const isLast = index === tabs.length - 1;

          return (
            <button
              key={tab.value}
              onClick={() => onTabChange(tab.value)}
              className={`
                px-10 py-3 text-sm font-semibold tracking-widest uppercase
                border-2 border-sky-400 transition-colors duration-200
                ${isFirst ? 'rounded-l-full' : ''}
                ${isLast ? 'rounded-r-full' : ''}
                ${!isFirst ? '-ml-px' : ''}
                ${isActive ? 'bg-sky-200 text-black' : 'bg-white text-black hover:bg-sky-50'}
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}