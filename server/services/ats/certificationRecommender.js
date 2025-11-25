/**
 * Certification Recommender
 * Suggests certifications based on detected skills and missing JD skills.
 */

const CERT_MAP = {
    'cloud': ['AWS Certified Cloud Practitioner', 'Microsoft Azure Fundamentals (AZ-900)', 'Google Cloud Digital Leader'],
    'aws': ['AWS Certified Solutions Architect - Associate', 'AWS Certified Developer - Associate'],
    'azure': ['Microsoft Certified: Azure Administrator Associate', 'Microsoft Certified: Azure Developer Associate'],
    'frontend': ['Meta Front-End Developer Professional Certificate', 'Legacy Front End Development (FreeCodeCamp)'],
    'react': ['Meta Front-End Developer Professional Certificate'],
    'backend': ['OpenJS Node.js Services Developer (JSNSD)', 'Meta Back-End Developer Professional Certificate'],
    'node': ['OpenJS Node.js Application Developer (JSNAD)'],
    'devops': ['Docker Certified Associate', 'Certified Kubernetes Administrator (CKA)'],
    'data': ['Google Data Analytics Professional Certificate', 'IBM Data Science Professional Certificate'],
    'security': ['CompTIA Security+', 'Certified Ethical Hacker (CEH)'],
    'python': ['PCEP – Certified Entry-Level Python Programmer'],
    'java': ['Oracle Certified Professional: Java SE Programmer']
};

export function recommendCertifications(normalizedSkills, jobDescription) {
    const recommendations = new Set();
    const jdText = jobDescription.toLowerCase();

    // Helper to check if cert is already in resume (simple check)
    // In a real app, we'd parse the 'Certifications' section specifically
    // For now, we assume if it's not in the skills list or JD, we recommend it based on domain.

    // 1. Recommend based on detected skills
    normalizedSkills.forEach(skill => {
        const key = skill.toLowerCase();
        // Check exact match in map
        if (CERT_MAP[key]) {
            CERT_MAP[key].forEach(cert => recommendations.add(cert));
        }
        // Check partial match (e.g., 'reactjs' -> 'react')
        Object.keys(CERT_MAP).forEach(mapKey => {
            if (key.includes(mapKey)) {
                CERT_MAP[mapKey].forEach(cert => recommendations.add(cert));
            }
        });
    });

    // 2. Recommend based on JD keywords (if missing in resume)
    Object.keys(CERT_MAP).forEach(key => {
        if (jdText.includes(key)) {
            CERT_MAP[key].forEach(cert => recommendations.add(cert));
        }
    });

    return Array.from(recommendations).slice(0, 5); // Return top 5
}
