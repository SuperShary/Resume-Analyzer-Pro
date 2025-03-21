
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ResumeInputProps {
  onChange: (text: string) => void;
  isAnalyzing: boolean;
}

const ResumeInput: React.FC<ResumeInputProps> = ({ onChange, isAnalyzing }) => {
  const [resume, setResume] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  // Example resume template
  const exampleResume = `JANE DOE
jane.doe@email.com | (123) 456-7890 | linkedin.com/in/janedoe

SUMMARY
Innovative software engineer with 5+ years of experience in web development, specializing in React and Node.js. Passionate about creating efficient, user-friendly applications that solve real-world problems.

SKILLS
• Frontend: React, TypeScript, JavaScript, HTML, CSS, Tailwind CSS
• Backend: Node.js, Express, RESTful APIs, GraphQL
• Database: PostgreSQL, MongoDB, Redis
• DevOps: AWS, Docker, CI/CD, Git
• Methodologies: Agile, Scrum, Test-Driven Development

EXPERIENCE
Senior Software Engineer | TechCorp Inc. | Jan 2020 - Present
• Led development of company's flagship SaaS platform, resulting in 40% increase in user engagement
• Implemented robust CI/CD pipeline, reducing deployment time by 70%
• Mentored junior developers, improving team productivity by 25%
• Optimized database queries, decreasing page load time by 60%

Software Engineer | WebSolutions LLC | Mar 2018 - Dec 2019
• Developed responsive web applications for 15+ enterprise clients
• Created reusable component library, accelerating development by 35%
• Collaborated with UX/UI team to improve accessibility across all projects

EDUCATION
Bachelor of Science in Computer Science
University of Technology | 2014 - 2018
• GPA: 3.8/4.0
• Relevant coursework: Data Structures, Algorithms, Software Engineering

PROJECTS
E-commerce Platform (React, Node.js, MongoDB)
• Built full-stack application with secure payment processing
• Implemented real-time inventory management system

Personal Website (React, Next.js, Tailwind CSS)
• Designed and developed responsive portfolio website
• Optimized for performance with 98% Lighthouse score`;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setResume(newValue);
    onChange(newValue);
  };

  const loadExample = () => {
    setResume(exampleResume);
    onChange(exampleResume);
    setIsExpanded(true);
  };

  const clearText = () => {
    setResume('');
    onChange('');
  };

  return (
    <div className={`glass-panel p-6 transition-all duration-300 ease-in-out ${isExpanded ? 'h-[600px]' : 'h-[300px]'}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-medium">Your Resume</h2>
          <p className="text-sm text-muted-foreground mt-1">Paste your resume text or upload a file</p>
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
          value={resume}
          onChange={handleChange}
          placeholder="Paste your resume text here..."
          className="h-full w-full resize-none glass-input font-mono text-sm p-4"
          disabled={isAnalyzing}
        />
        {isAnalyzing && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
            <div className="animate-pulse-slow text-sm font-medium">Analyzing resume...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeInput;
