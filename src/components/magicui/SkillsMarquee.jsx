import React from 'react';
import { cn } from '../../lib/utils';

const Marquee = ({
    children,
    direction = 'left',
    speed = 'medium',
    pauseOnHover = true,
    className,
}) => {
    const speedClasses = {
        slow: 'animate-marquee-slow',
        medium: 'animate-marquee',
        fast: 'animate-marquee-fast'
    };

    const directionClass = direction === 'right' ? 'animate-marquee-reverse' : speedClasses[speed];

    return (
        <div className={cn('relative flex w-full overflow-hidden', className)}>
            <div
                className={cn(
                    'flex min-w-full shrink-0 items-center justify-around gap-4',
                    directionClass,
                    pauseOnHover && 'hover:[animation-play-state:paused]'
                )}
            >
                {children}
                {children}
            </div>
        </div>
    );
};

const skills = [
    { name: 'JavaScript', icon: 'devicon-javascript-plain colored', color: '#F7DF1E' },
    { name: 'TypeScript', icon: 'devicon-typescript-plain colored', color: '#3178C6' },
    { name: 'React.js', icon: 'devicon-react-original colored', color: '#61DAFB' },
    { name: 'Node.js', icon: 'devicon-nodejs-plain colored', color: '#339933' },
    { name: 'Python', icon: 'devicon-python-plain colored', color: '#3776AB' },
    { name: 'MongoDB', icon: 'devicon-mongodb-plain colored', color: '#47A248' },
    { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored', color: '#4169E1' },
    { name: 'AWS Cloud', icon: 'devicon-amazonwebservices-plain colored', color: '#FF9900' },
    { name: 'Docker', icon: 'devicon-docker-plain colored', color: '#2496ED' },
    { name: 'CI/CD', icon: 'devicon-github-original colored', color: '#2088FF' },
    { name: 'GraphQL', icon: 'devicon-graphql-plain colored', color: '#E10098' },
    { name: 'DevOps', icon: 'devicon-jira-plain colored', color: '#0052CC' }
];

const SkillCard = ({ name, icon, color }) => (
    <div className="group flex flex-col items-center gap-3 px-6">
        <div className="relative bg-[#0C1E1B] flex h-24 w-24 items-center justify-center rounded-2xl  p-4 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-xl hover:bg-card">
            <i className={`${icon} text-4xl`} style={{ color }}></i>
        </div>
        <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            {name}
        </span>
    </div>
);

export function SkillsMarquee() {
    return (
        <div className="relative w-full overflow-hidden bg-gradient-to-r from-background/50 via-muted/50 to-background/50">
            {/* Gradient Overlays */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 w-24 h-full bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 w-24 h-full bg-gradient-to-l from-background to-transparent" />

            {/* First Marquee - Left to Right */}
            <Marquee className="py-8" speed="slow" direction="left">
                {skills.slice(0, 6).map((skill) => (
                    <SkillCard key={skill.name} {...skill} />
                ))}
            </Marquee>

            {/* Second Marquee - Right to Left */}
            <Marquee className="py-8" speed="slow" direction="right">
                {skills.slice(6).map((skill) => (
                    <SkillCard key={skill.name} {...skill} />
                ))}
            </Marquee>
        </div>
    );
}

export default SkillsMarquee;