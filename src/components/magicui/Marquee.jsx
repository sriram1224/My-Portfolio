import React from 'react';
import { cn } from '../../lib/utils';

const Marquee = ({
    items,
    direction = 'left',
    pauseOnHover = true,
    className,
}) => {
    return (
        <div className={cn('relative flex w-full overflow-hidden', className)}>
            <div
                className={cn(
                    'animate-marquee flex min-w-full shrink-0 items-center justify-around gap-4',
                    direction === 'right' && 'animate-marquee-reverse',
                    pauseOnHover && 'hover:[animation-play-state:paused]'
                )}
            >
                {[...items, ...items].map((item, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-2 bg-[#0A1917] p-4 rounded-md transition-all duration-300 hover:scale-110 hover:bg-[#0C1E1B] group"
                    >
                        <div className="flex items-center justify-center w-12 h-12 bg-[#0C1E1B] rounded-full group-hover:bg-[#0A1917]">
                            <i className={item.icon} style={{ color: item.color }}></i>
                        </div>
                        <span className="text-sm font-medium text-gray-300 group-hover:text-white">
                            {item.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Marquee;