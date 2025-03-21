
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import ResumeInput from '@/components/ResumeInput';
import JobInput from '@/components/JobInput';
import MatchScore from '@/components/MatchScore';
import KeySkills from '@/components/KeySkills';
import Suggestions from '@/components/Suggestions';
import MatchResults from '@/components/MatchResults';
import { analyzeResume, type AnalysisResult } from '@/utils/resumeAnalyzer';

const Index = () => {
  const { toast } = useToast();
  const [resume, setResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const handleAnalyze = () => {
    if (!resume.trim()) {
      toast({
        title: "Resume required",
        description: "Please enter your resume text before analyzing.",
        variant: "destructive"
      });
      return;
    }

    if (!jobDescription.trim()) {
      toast({
        title: "Job description required",
        description: "Please enter a job description before analyzing.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate processing time for better UX
    setTimeout(() => {
      try {
        const analysisResult = analyzeResume(resume, jobDescription);
        setResult(analysisResult);
        setHasAnalyzed(true);
        
        toast({
          title: "Analysis complete",
          description: `Match score: ${analysisResult.matchScore}%. ${
            analysisResult.matchScore >= 70 
              ? "Great job! Your resume matches well." 
              : "We've identified some improvements."
          }`,
        });
      } catch (error) {
        console.error("Analysis error:", error);
        toast({
          title: "Analysis failed",
          description: "There was an error analyzing your resume. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsAnalyzing(false);
      }
    }, 1500);
  };

  const clearAll = () => {
    setResume('');
    setJobDescription('');
    setResult(null);
    setHasAnalyzed(false);
    
    toast({
      title: "Reset complete",
      description: "All data has been cleared."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 appear-animation">
          <div className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-xs font-medium text-secondary-foreground mb-3">
            Resume Analyzer
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            Match Your Resume to Job Descriptions
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Optimize your resume for each job application by analyzing how well your skills and experience match the requirements.
          </p>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ResumeInput onChange={setResume} isAnalyzing={isAnalyzing} />
          <JobInput onChange={setJobDescription} isAnalyzing={isAnalyzing} />
        </div>

        {/* Analysis actions */}
        <div className="flex justify-center gap-4 mb-12">
          <Button 
            onClick={handleAnalyze} 
            disabled={isAnalyzing || !resume.trim() || !jobDescription.trim()}
            className="px-8 py-2 h-12 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all shadow-md hover:shadow-lg"
          >
            {isAnalyzing ? "Analyzing..." : hasAnalyzed ? "Analyze Again" : "Analyze Resume"}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={clearAll}
            className="px-8 py-2 h-12 rounded-md border-border/60 hover:bg-background/80 transition-all"
          >
            Clear All
          </Button>
        </div>

        {/* Results section */}
        {result && (
          <div className="appear-animation">
            <Separator className="mb-12 opacity-30" />
            
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold tracking-tight">Analysis Results</h2>
              <p className="text-muted-foreground">
                Here's how your resume compares to the job description
              </p>
            </div>
            
            <div className="flex flex-col items-center mb-12">
              <MatchScore score={result.matchScore} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <KeySkills skills={result.keySkills} />
              <Suggestions suggestions={result.suggestions} />
            </div>
            
            <div className="mb-12">
              <MatchResults 
                resume={resume} 
                keySkills={result.keySkills} 
                jobDescription={jobDescription} 
              />
            </div>
          </div>
        )}
        
        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground mt-24 pb-6 opacity-80">
          <p>Resume Analyzer - Tailored recommendations to optimize your job applications</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
