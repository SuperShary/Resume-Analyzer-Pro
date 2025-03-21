
import React from 'react';

interface KeySkillsProps {
  skills: string[];
}

const KeySkills: React.FC<KeySkillsProps> = ({ skills }) => {
  if (skills.length === 0) {
    return (
      <div className="glass-panel p-6 h-full flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          No skills detected. Please provide your resume to analyze skills.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 appear-animation">
      <h2 className="text-xl font-medium mb-4">Your Key Skills</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {skills.map((skill, index) => (
          <div 
            key={index}
            className="flex items-center rounded-md border border-border/60 p-3 transition-all duration-300 hover:shadow-sm hover:border-secondary/40"
          >
            <div className="h-2 w-2 rounded-full bg-secondary/80 mr-3"></div>
            <span className="text-sm font-medium truncate">{skill}</span>
          </div>
        ))}
      </div>
      
      {skills.length > 0 && (
        <p className="text-xs text-muted-foreground mt-4">
          These skills were automatically detected from your resume. Consider highlighting these in your application.
        </p>
      )}
    </div>
  );
};

export default KeySkills;
