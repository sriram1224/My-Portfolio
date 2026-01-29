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
    { name: 'Java', icon: 'devicon-java-plain colored', color: '#007396' },
    { name: 'Spring Boot', icon: 'devicon-spring-plain colored', color: '#6DB33F' },
    { name: 'JavaScript', icon: 'devicon-javascript-plain colored', color: '#F7DF1E' },
    { name: 'React.js', icon: 'devicon-react-original colored', color: '#61DAFB' },
    { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored', color: '#4169E1' },
    { name: 'MySQL', icon: 'devicon-mysql-plain colored', color: '#4479A1' },
    { name: 'MongoDB', icon: 'devicon-mongodb-plain colored', color: '#47A248' },
    { name: 'Docker', icon: 'devicon-docker-plain colored', color: '#2496ED' },
    { name: 'Git', icon: 'devicon-git-plain colored', color: '#F05032' },
    { name: 'HTML5', icon: 'devicon-html5-plain colored', color: '#E34F26' },
    { name: 'CSS3', icon: 'devicon-css3-plain colored', color: '#1572B6' },
    { name: 'Linux', icon: 'devicon-linux-plain colored', color: '#FCC624' }
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