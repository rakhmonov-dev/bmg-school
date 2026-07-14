import { Compass, Layers, Target, BookOpen } from 'lucide-react';

export const courseIconMap = {
  compass: Compass,
  layers: Layers,
  target: Target,
  book: BookOpen,
};

export function getCourseIcon(key) {
  return courseIconMap[key] || BookOpen;
}
