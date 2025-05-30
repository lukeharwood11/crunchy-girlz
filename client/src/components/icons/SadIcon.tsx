import React from 'react';

interface SadIconProps {
    size?: number;
    className?: string;
}

const SadIcon: React.FC<SadIconProps> = ({ size = 24, className }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 200 200" 
            width={size} 
            height={size}
            className={className}
        >
            <defs>
                <style>
                    {`
                        .letter {
                            font-family: 'Arial', sans-serif;
                            font-weight: bold;
                            font-size: 80px;
                            text-anchor: middle;
                            dominant-baseline: central;
                        }
                        .c-letter {
                            fill: white;
                        }
                        .g-letter {
                            fill: white;
                        }
                        .frown {
                            fill: none;
                            stroke: white;
                            stroke-width: 8;
                            stroke-linecap: round;
                            animation: frownAnimation 8s ease-in-out infinite;
                        }
                        @keyframes frownAnimation {
                            0% { d: path('M 70 140 Q 100 140 130 140'); }
                            10% { d: path('M 70 140 Q 100 120 130 140'); }
                            85% { d: path('M 70 140 Q 100 120 130 140'); }
                            100% { d: path('M 70 140 Q 100 140 130 140'); }
                        }
                    `}
                </style>
            </defs>
            {/* Background shape */}
            <rect x="20" y="20" width="160" height="160" rx="30" fill="#FF6B6B"/>
            
            {/* Letters */}
            <text x="70" y="100" className="letter c-letter">C</text>
            <text x="130" y="100" className="letter g-letter">G</text>
            
            {/* Animated Frown */}
            <path className="frown" d="M 70 140 Q 100 140 130 140"/>
            
            {/* Decorative elements */}
            {/* Bow design */}
            {/* Left loop */}
            <path d="M 30 35
                     C 20 35, 15 45, 20 55
                     C 25 65, 35 65, 40 55
                     C 45 45, 40 35, 30 35" 
                  fill="white"/>
            
            {/* Right loop */}
            <path d="M 60 35
                     C 70 35, 75 45, 70 55
                     C 65 65, 55 65, 50 55
                     C 45 45, 50 35, 60 35" 
                  fill="white"/>
            
            {/* Center knot */}
            <circle cx="45" cy="45" r="8" fill="white"/>
        </svg>
    );
};

export default SadIcon; 