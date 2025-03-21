
import React from 'react';
import { highlightSkills } from '@/utils/resumeAnalyzer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MatchResultsProps {
  resume: string;
  keySkills: string[];
  jobDescription: string;
}

const MatchResults: React.FC<MatchResultsProps> = ({ resume, keySkills, jobDescription }) => {
  if (!resume || !jobDescription) {
    return (
      <div className="glass-panel p-6 h-full flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Enter both resume and job description to see highlighted matches.
        </p>
      </div>
    );
  }

  const highlightedResume = highlightSkills(resume, keySkills);
  const highlightedJobDescription = highlightSkills(jobDescription, keySkills);

  return (
    <div className="glass-panel p-6 appear-animation">
      <h2 className="text-xl font-medium mb-4">Skill Matching Analysis</h2>
      
      <Tabs defaultValue="resume" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="resume">Resume Analysis</TabsTrigger>
          <TabsTrigger value="job">Job Description</TabsTrigger>
        </TabsList>
        
        <TabsContent value="resume" className="mt-0">
          <div className="max-h-[400px] overflow-y-auto p-4 rounded-md bg-background/50 border border-border/40 text-sm">
            {highlightedResume}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Skills highlighted in your resume that match the job requirements.
          </p>
        </TabsContent>
        
        <TabsContent value="job" className="mt-0">
          <div className="max-h-[400px] overflow-y-auto p-4 rounded-md bg-background/50 border border-border/40 text-sm">
            {highlightedJobDescription}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Required skills in the job description that match your resume.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MatchResults;
