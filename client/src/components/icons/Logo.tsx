import React from 'react';

interface LogoProps {
    size?: number;
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 24, className }) => {
    const aspectRatio = 50 / 200; // height / width
    const width = size;
    const height = size * aspectRatio;

    return (
        <svg 
            width={width} 
            height={height} 
            viewBox="0 0 200 50" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                <style>
                    {`
                        .text {
                            font-family: 'Arial', sans-serif;
                            font-weight: bold;
                            font-size: 20px;
                            fill: white;
                        }
                    `}
                </style>
            </defs>
            {/* Background shape */}
            <rect x="10" y="10" width="180" height="30" rx="15" fill="#FF6B6B"/>
            
            {/* Text */}
            <text x="30" y="32" className="text">Crunchy</text>
            <text x="120" y="32" className="text">Girlz</text>
            
            {/* Underline for Girlz */}
            <line x1="120" y1="35" x2="165" y2="35" stroke="white" strokeWidth="2"/>
            
            {/* Decorative elements */}
            <circle cx="20" cy="18" r="4" fill="white" opacity="0.8"/>
            <circle cx="25" cy="18" r="3" fill="white" opacity="0.6"/>
        </svg>
    );
};

export default Logo; 