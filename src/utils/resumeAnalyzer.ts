
/**
 * Analyzes a resume against a job description to provide matching metrics
 */
export interface AnalysisResult {
  matchScore: number;
  keySkills: string[];
  suggestions: string[];
}

/**
 * Analyzes a resume against a job description
 */
export function analyzeResume(resume: string, jobDescription: string): AnalysisResult {
  if (!resume || !jobDescription) {
    return {
      matchScore: 0,
      keySkills: [],
      suggestions: ["Please provide both resume and job description"]
    };
  }
  
  // Extract skills from job description
  const jobSkills = extractSkills(jobDescription);
  
  // Extract skills from resume
  const resumeSkills = extractSkills(resume);
  
  // Find matching skills
  const matchingSkills = resumeSkills.filter(skill => 
    jobSkills.some(jobSkill => 
      jobSkill.toLowerCase().includes(skill.toLowerCase()) || 
      skill.toLowerCase().includes(jobSkill.toLowerCase())
    )
  );
  
  // Calculate match score (0-100)
  const matchScore = jobSkills.length > 0 
    ? Math.min(Math.round((matchingSkills.length / jobSkills.length) * 100), 100)
    : 0;
  
  // Generate suggestions
  const suggestions = generateSuggestions(resume, jobDescription, jobSkills, resumeSkills);
  
  return {
    matchScore,
    keySkills: resumeSkills,
    suggestions
  };
}

/**
 * Extract skills from text using common patterns and keywords
 */
function extractSkills(text: string): string[] {
  // Common technical skills (simplified for demo)
  const technicalSkills = [
    "JavaScript", "TypeScript", "Python", "Java", "C++", "React", "Angular", "Vue", 
    "Node.js", "Express", "Django", "Flask", "SQL", "MongoDB", "AWS", "Azure", 
    "Docker", "Kubernetes", "CI/CD", "Git", "GitHub", "REST API", "GraphQL",
    "HTML", "CSS", "Sass", "Tailwind", "Bootstrap", "Redux", "Next.js", "Gatsby",
    "Spring", "Hibernate", "TensorFlow", "PyTorch", "Data Science", "Machine Learning",
    "AI", "Artificial Intelligence", "Cloud Computing", "DevOps", "Agile", "Scrum"
  ];
  
  // Common soft skills
  const softSkills = [
    "Communication", "Teamwork", "Leadership", "Problem Solving", "Critical Thinking",
    "Time Management", "Adaptability", "Creativity", "Collaboration", "Presentation",
    "Analytical", "Organization", "Project Management", "Detail-oriented"
  ];
  
  // Business skills
  const businessSkills = [
    "Marketing", "Sales", "Finance", "Accounting", "HR", "Customer Service", 
    "Business Development", "Strategic Planning", "Operations", "Management"
  ];
  
  const allSkills = [...technicalSkills, ...softSkills, ...businessSkills];
  
  // Extract skills that appear in the text
  const foundSkills = allSkills.filter(skill => 
    new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(text)
  );
  
  // Add any skills mentioned with bullet points
  const bulletPointSkills = text
    .split(/[•·⁃-]\s+/)
    .slice(1) // Skip the first element which is text before the first bullet
    .map(item => item.trim())
    .filter(item => item.length > 0 && item.length < 50) // Likely skills are shorter phrases
    .slice(0, 15); // Limit to reasonable number
  
  // Combine and remove duplicates
  const combinedSkills = [...foundSkills, ...bulletPointSkills];
  return Array.from(new Set(combinedSkills)).slice(0, 20); // Limit to top 20 skills
}

/**
 * Generate improvement suggestions
 */
function generateSuggestions(
  resume: string, 
  jobDescription: string, 
  jobSkills: string[], 
  resumeSkills: string[]
): string[] {
  const suggestions: string[] = [];
  
  // Find missing important skills
  const missingSkills = jobSkills.filter(skill => 
    !resumeSkills.some(resumeSkill => 
      resumeSkill.toLowerCase().includes(skill.toLowerCase()) ||
      skill.toLowerCase().includes(resumeSkill.toLowerCase())
    )
  );
  
  if (missingSkills.length > 0) {
    suggestions.push(`Highlight these key skills: ${missingSkills.slice(0, 5).join(", ")}${missingSkills.length > 5 ? ", and others" : ""}`);
  }
  
  // Check resume length
  const wordCount = resume.split(/\s+/).length;
  if (wordCount < 300) {
    suggestions.push("Your resume seems brief. Consider adding more details about your experience.");
  } else if (wordCount > 700) {
    suggestions.push("Your resume is quite long. Consider making it more concise for better readability.");
  }
  
  // Check for action verbs at the beginning of bullets
  const actionVerbs = ["Led", "Managed", "Created", "Developed", "Implemented", "Achieved", "Improved"];
  const hasActionVerbs = actionVerbs.some(verb => resume.includes(verb));
  if (!hasActionVerbs) {
    suggestions.push("Use strong action verbs at the beginning of your achievement statements.");
  }
  
  // Check for numbers and metrics
  const hasMetrics = /\d+%|\$\d+|\d+ (people|users|customers|clients)/.test(resume);
  if (!hasMetrics) {
    suggestions.push("Add specific numbers and metrics to quantify your achievements.");
  }
  
  // Check for ATS-friendly format
  if (!/education|experience|skills|projects/i.test(resume)) {
    suggestions.push("Ensure your resume includes standard sections (Education, Experience, Skills) for ATS compatibility.");
  }
  
  // If no significant issues found
  if (suggestions.length === 0) {
    suggestions.push("Your resume is well-aligned with the job description.");
    
    // Add bonus tip
    const bonusTips = [
      "Consider customizing your summary to specifically address the job requirements.",
      "Tailor your cover letter to complement your resume and address specific job requirements.",
      "Research the company culture to further refine your application materials."
    ];
    
    suggestions.push(bonusTips[Math.floor(Math.random() * bonusTips.length)]);
  }
  
  return suggestions;
}

/**
 * Highlights detected skills in the resume text
 */
export function highlightSkills(text: string, skills: string[]): JSX.Element[] {
  if (!text || skills.length === 0) return [<span key="0">{text}</span>];
  
  // Sort skills by length in descending order to match longer skills first
  const sortedSkills = [...skills].sort((a, b) => b.length - a.length);
  
  // Create a regex pattern for all skills
  const skillPattern = new RegExp(
    `\\b(${sortedSkills.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 
    'gi'
  );
  
  // Split the text by matches
  const parts = text.split(skillPattern);
  const matches = text.match(skillPattern) || [];
  
  // Combine parts and matches
  const result: JSX.Element[] = [];
  let matchIndex = 0;
  
  parts.forEach((part, index) => {
    if (part) {
      result.push(<span key={`p${index}`}>{part}</span>);
    }
    
    if (matchIndex < matches.length) {
      const match = matches[matchIndex++];
      result.push(
        <span key={`m${index}`} className="highlight-skill">
          {match}
        </span>
      );
    }
  });
  
  return result;
}
