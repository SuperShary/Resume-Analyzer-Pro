
import React from 'react';

interface SuggestionsProps {
  suggestions: string[];
}

const Suggestions: React.FC<SuggestionsProps> = ({ suggestions }) => {
  if (suggestions.length === 0) {
    return (
      <div className="glass-panel p-6 h-full flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Analyze your resume to get personalized suggestions.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 appear-animation">
      <h2 className="text-xl font-medium mb-4">Improvement Suggestions</h2>
      
      <ul className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <li 
            key={index} 
            className="flex items-start p-3 rounded-md border border-border/60 transition-all duration-300 hover:shadow-sm hover:border-secondary/40"
          >
            <span className="flex-shrink-0 h-6 w-6 rounded-full bg-secondary/10 flex items-center justify-center mr-3 text-xs font-medium">
              {index + 1}
            </span>
            <span className="text-sm">{suggestion}</span>
          </li>
        ))}
      </ul>
      
      <p className="text-xs text-muted-foreground mt-4">
        Implementing these suggestions may improve your resume's match score for this specific job.
      </p>
    </div>
  );
};

export default Suggestions;
