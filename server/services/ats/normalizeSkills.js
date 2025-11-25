
import Fuse from 'fuse.js';

/**
 * Standardized list of technical skills for normalization
 */
const CANONICAL_SKILLS = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Go', 'Rust', 'Swift', 'Kotlin',
    'React', 'React.js', 'Vue.js', 'Angular', 'Svelte', 'Next.js', 'Nuxt.js', 'Express.js', 'NestJS',
    'Node.js', 'Django', 'Flask', 'Spring Boot', 'ASP.NET', 'Laravel', 'Ruby on Rails',
    'HTML', 'HTML5', 'CSS', 'CSS3', 'Sass', 'Less', 'Tailwind CSS', 'Bootstrap', 'Material UI',
    'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'GraphQL', 'Firebase', 'Supabase',
    'AWS', 'Azure', 'Google Cloud Platform', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'GitHub Actions',
    'Git', 'Linux', 'Bash', 'Shell Scripting',
    'Machine Learning', 'Deep Learning', 'Data Science', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy',
    'Agile', 'Scrum', 'Kanban', 'Jira', 'Confluence',
    'REST API', 'Microservices', 'Serverless', 'CI/CD', 'TDD', 'BDD'
];

/**
 * Normalize skills using fuzzy matching
 * @param {string[]} skills - List of raw skills extracted from resume
 * @returns {string[]} - List of normalized canonical skills
 */
export function normalizeSkills(skills) {
    if (!skills || !Array.isArray(skills)) return [];

    const fuse = new Fuse(CANONICAL_SKILLS, {
        includeScore: true,
        threshold: 0.3, // Lower threshold means stricter matching
    });

    const normalized = new Set();

    skills.forEach(skill => {
        if (!skill || typeof skill !== 'string') return;

        const trimmedSkill = skill.trim();
        if (trimmedSkill.length < 2) return;

        // Direct match check (case-insensitive)
        const directMatch = CANONICAL_SKILLS.find(s => s.toLowerCase() === trimmedSkill.toLowerCase());
        if (directMatch) {
            normalized.add(directMatch);
            return;
        }

        // Fuzzy match
        const result = fuse.search(trimmedSkill);
        if (result.length > 0) {
            normalized.add(result[0].item);
        } else {
            // Keep original if no match found, but capitalized nicely
            normalized.add(trimmedSkill.charAt(0).toUpperCase() + trimmedSkill.slice(1));
        }
    });

    return Array.from(normalized);
}
