export type Category = 'All' | 'Front-End' | 'Back-End' | 'Database' | 'Tools';

export interface TechStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface Technology {
  id: string;
  name: string;
  category: 'Front-End' | 'Back-End' | 'Database' | 'Tools';
  phaseId: number;
  stageNumber: string;
  tagline: string;
  whatItIsUsedFor: string;
  estimatedHours: number;
  tutorialUrl: string;
  instructor: string;
  videoDurationText: string;
  learningSequence: TechStep[];
  keyConcepts: string[];
  whatYouWillBuild: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  aliases?: string[];
}

export interface RoadmapPhase {
  id: number;
  numberString: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: Technology[];
  suggestedMilestone: string;
}

export interface MilestoneProject {
  id: string;
  title: string;
  difficulty: 'Starter' | 'Core' | 'Full-Stack';
  estimatedHours: number;
  tagline: string;
  phaseRelation: string;
  description: string;
  technologies: string[];
  keyFeatures: string[];
  acceptanceCriteria: string[];
}
