
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface JobInputProps {
  onChange: (text: string) => void;
  isAnalyzing: boolean;
}

const JobInput: React.FC<JobInputProps> = ({ onChange, isAnalyzing }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  // Example job description
  const exampleJobDescription = `Senior Frontend Developer

About the Role:
We're looking for a talented Senior Frontend Developer to join our dynamic team. The ideal candidate will help us create exceptional user experiences and lead our frontend development efforts.

Responsibilities:
• Develop responsive, accessible, and high-performance web applications using React
• Write clean, maintainable, and well-documented code
• Collaborate with UX/UI designers to translate designs into functional interfaces
• Implement automated testing strategies to ensure code quality
• Mentor junior developers and provide technical leadership
• Participate in code reviews and architectural discussions
• Stay updated with the latest frontend technologies and best practices

Requirements:
• 5+ years of experience in frontend development
• Expert knowledge of React, TypeScript, and modern JavaScript
• Strong understanding of HTML, CSS, and responsive design principles
• Experience with state management solutions (Redux, Context API)
• Familiarity with RESTful APIs and GraphQL
• Knowledge of testing frameworks (Jest, React Testing Library)
• Understanding of CI/CD pipelines and version control (Git)
• Excellent problem-solving and communication skills
• Bachelor's degree in Computer Science or equivalent practical experience

Nice to Have:
• Experience with Next.js or similar frameworks
• Knowledge of Node.js and backend development
• Contributions to open-source projects
• Experience with Agile/Scrum development methodologies
• Understanding of UX/UI principles

Benefits:
• Competitive salary and benefits package
• Remote-friendly work environment
• Professional development opportunities
• Collaborative and inclusive team culture
• Modern tech stack and tools`;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setJobDescription(newValue);
    onChange(newValue);
  };

  const loadExample = () => {
    setJobDescription(exampleJobDescription);
    onChange(exampleJobDescription);
    setIsExpanded(true);
  };

  const clearText = () => {
    setJobDescription('');
    onChange('');
  };

  return (
    <div className={`glass-panel p-6 transition-all duration-300 ease-in-out ${isExpanded ? 'h-[600px]' : 'h-[300px]'}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-medium">Job Description</h2>
          <p className="text-sm text-muted-foreground mt-1">Paste the job description you want to apply for</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={loadExample}
            className="text-xs"
          >
            Load Example
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearText}
            className="text-xs"
          >
            Clear
          </Button>
        </div>
      </div>
      
      <div className="relative h-[calc(100%-4rem)]">
        <Textarea
          value={jobDescription}
          onChange={handleChange}
          placeholder="Paste the job description here..."
          className="h-full w-full resize-none glass-input font-mono text-sm p-4"
          disabled={isAnalyzing}
        />
        {isAnalyzing && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
            <div className="animate-pulse-slow text-sm font-medium">Analyzing job description...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobInput;
