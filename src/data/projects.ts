import type { ProjectItem } from '@/types/agency';

export type StudioProject = ProjectItem & {
  /** Public video URL, e.g. "/projects/project-1.mp4". Leave empty until a video is added. */
  videoUrl?: string;
};

/**
 * Keep placeholder portfolio entries neutral until real project details are available.
 * Add a video file under public/projects/ and set its URL on the matching entry.
 */
export const projectsData: StudioProject[] = [
  {
    id: 'project-1',
    slug: 'project-1',
    title: 'Project 1',
    category: 'Web Development',
    discipline: 'Web Development',
    artType: 'web',
    conceptType: 'Portfolio Project',
    videoUrl: '',
  },
  {
    id: 'project-2',
    slug: 'project-2',
    title: 'Project 2',
    category: 'Web/App Development',
    discipline: 'Web/App Development',
    artType: 'app',
    conceptType: 'Portfolio Project',
    videoUrl: '',
  },
  {
    id: 'project-3',
    slug: 'project-3',
    title: 'Project 3',
    category: 'Video Editing',
    discipline: 'Video Editing',
    artType: 'video',
    conceptType: 'Portfolio Project',
    videoUrl: '',
  },
  {
    id: 'project-4',
    slug: 'project-4',
    title: 'Project 4',
    category: 'Digital Analytics',
    discipline: 'Digital Analytics',
    artType: 'analytics',
    conceptType: 'Portfolio Project',
    videoUrl: '',
  },
];
