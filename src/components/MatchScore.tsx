
import React, { useEffect, useState } from 'react';

interface MatchScoreProps {
  score: number;
  className?: string;
}

const MatchScore: React.FC<MatchScoreProps> = ({ score, className = '' }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    // Animate the score from 0 to final value
    const duration = 1500; // ms
    const steps = 60;
    const interval = duration / steps;
    
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep += 1;
      const progress = Math.min(currentStep / steps, 1);
      // Easing function for smoother animation
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(score * easedProgress));
      
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, [score]);
  
  // Calculate color based on score
  const getScoreColor = () => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-blue-500';
    if (score >= 40) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  // SVG circular progress parameters
  const size = 160;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (animatedScore / 100) * circumference;
  
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-muted/20"
          />
          
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={`transition-all duration-300 ${getScoreColor()}`}
            style={{ 
              '--progress-value': offset.toString(),
              animation: 'progress 1.5s ease-out forwards',
              opacity: score > 0 ? 1 : 0
            } as React.CSSProperties}
          />
        </svg>
        
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold ${getScoreColor()}`}>
            {animatedScore}%
          </span>
          <span className="text-xs font-medium text-muted-foreground mt-1">
            Match Score
          </span>
        </div>
      </div>
      
      {/* Match level text */}
      <div className="mt-4 text-center">
        <div className={`text-sm font-medium ${getScoreColor()}`}>
          {score >= 90 ? 'Excellent Match' :
           score >= 75 ? 'Strong Match' :
           score >= 60 ? 'Good Match' :
           score >= 40 ? 'Fair Match' :
           score > 0 ? 'Poor Match' : 'No Match'}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {score >= 75 ? 'Your resume is well-aligned with this job.' :
           score >= 50 ? 'Your resume needs some adjustments.' :
           score > 0 ? 'Significant improvements needed.' : 
           'Analyze your resume to see the match score.'}
        </p>
      </div>
    </div>
  );
};

export default MatchScore;
