export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  category: 'Web App' | 'Security & Server' | 'WordPress';
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "System File Access & Monitoring",
    description: "Collaborative file access & monitoring application to track documents, deadlines, progress, and compliance with internal company cooperation documents (PKS).",
    tech: ["CodeIgniter", "PHP", "MySQL", "Bootstrap", "JavaScript"],
    category: "Web App"
  },
  {
    title: "System Recovery & Server Hardening",
    id: 2,
    description: "Experiment and implementation of full-scale system recovery from malware attacks, WordPress & CI environment isolation, and VPS optimization via CyberPanel & Cloudflare.",
    tech: ["CyberPanel", "Cloudflare", "VPS Linux", "Security Redesign"],
    category: "Security & Server"
  },
  {
    id: 3,
    title: "System Booking Meeting Room",
    description: "Collaborative meeting room booking system built on a web platform, designed specifically for real-time scheduling and efficient reporting of meeting room usage.",
    tech: ["PHP", "Laravel", "MySQL", "Tailwind CSS"],
    category: "Web App"
  },
  {
    id: 4,
    title: "Custom Corporate WordPress Platform",
    description: "Collaborative meeting room booking system built on a web platform, designed specifically for real-time scheduling and efficient reporting of meeting room usage.",
    tech: ["WordPress", "PHP", "Elementor", "Speed Optimization"],
    category: "WordPress"
  }
];