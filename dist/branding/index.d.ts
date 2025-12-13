/**
 * Primary Colors (Green - Brand Accent)
 */
export declare const brandColors: {
    readonly green: {
        readonly 400: "#4ade80";
        readonly 500: "#22c55e";
        readonly 900: "rgba(20,83,45,0.3)";
    };
};
/**
 * Surface Colors (Improved Contrast Dark Theme)
 * Larger jumps between layers for better visual hierarchy
 */
export declare const surfaceColors: {
    readonly base: "#0f0f10";
    readonly DEFAULT: "#18181b";
    readonly elevated: "#1f1f23";
    readonly card: "#27272a";
    readonly input: "#303033";
    readonly hover: "#3a3a3d";
    readonly active: "#454548";
};
/**
 * Gray Scale
 */
export declare const grayColors: {
    readonly 50: "#fafafa";
    readonly 100: "#f4f4f5";
    readonly 200: "#e4e4e7";
    readonly 300: "#d4d4d8";
    readonly 400: "#a1a1aa";
    readonly 500: "#71717a";
    readonly 600: "#52525b";
    readonly 700: "#3f3f46";
    readonly 800: "#27272a";
    readonly 900: "#18181b";
};
/**
 * Text Colors (Dark Theme)
 */
export declare const textColors: {
    readonly primary: "#ffffff";
    readonly secondary: "#e4e4e7";
    readonly tertiary: "#d4d4d8";
    readonly muted: "#a1a1aa";
    readonly disabled: "#71717a";
    readonly subtle: "#52525b";
};
/**
 * Border Colors
 */
export declare const borderColors: {
    readonly DEFAULT: "rgba(39,39,42,0.6)";
    readonly subtle: "rgba(63,63,70,0.5)";
    readonly line: "#3f3f46";
    readonly unfilled: "#52525b";
    readonly alt: "#71717a";
    readonly active: "#22c55e";
    readonly badge: "rgba(34,197,94,0.25)";
    readonly glow: "rgba(34,197,94,0.3)";
};
/**
 * Accent/Brand Colors
 */
export declare const accentColors: {
    readonly webflow: {
        readonly blue: "#4353FF";
        readonly blueHover: "#5465FF";
    };
    readonly github: {
        readonly bg: "#ffffff";
    };
};
/**
 * Code Syntax Highlighting Colors
 */
export declare const syntaxColors: {
    readonly selector: "#c084fc";
    readonly property: "#60a5fa";
    readonly value: "#facc15";
    readonly special: "#f472b6";
    readonly comment: "#71717a";
};
/**
 * macOS Traffic Lights
 */
export declare const trafficLights: {
    readonly red: "#ff5f57";
    readonly yellow: "#febc2e";
    readonly green: "#28c840";
};
/**
 * Semantic Colors
 */
export declare const semanticColors: {
    readonly success: "#22c55e";
    readonly warning: "#f59e0b";
    readonly error: "#ef4444";
    readonly info: "#3b82f6";
};
/**
 * Complete color palette for Tailwind
 */
export declare const colors: {
    readonly gray: {
        readonly 50: "#fafafa";
        readonly 100: "#f4f4f5";
        readonly 200: "#e4e4e7";
        readonly 300: "#d4d4d8";
        readonly 400: "#a1a1aa";
        readonly 500: "#71717a";
        readonly 600: "#52525b";
        readonly 700: "#3f3f46";
        readonly 800: "#27272a";
        readonly 900: "#18181b";
    };
    readonly green: {
        readonly 400: "#4ade80";
        readonly 500: "#22c55e";
        readonly 900: "#14532d";
    };
    readonly webflow: {
        readonly blue: "#4353FF";
        readonly 'blue-hover': "#5465FF";
    };
    readonly success: "#22c55e";
    readonly warning: "#f59e0b";
    readonly error: "#ef4444";
    readonly info: "#3b82f6";
    readonly brand: {
        readonly green: {
            readonly 400: "#4ade80";
            readonly 500: "#22c55e";
            readonly 900: "rgba(20,83,45,0.3)";
        };
    };
    readonly surface: {
        readonly base: "#0f0f10";
        readonly DEFAULT: "#18181b";
        readonly elevated: "#1f1f23";
        readonly card: "#27272a";
        readonly input: "#303033";
        readonly hover: "#3a3a3d";
        readonly active: "#454548";
    };
    readonly text: {
        readonly primary: "#ffffff";
        readonly secondary: "#e4e4e7";
        readonly tertiary: "#d4d4d8";
        readonly muted: "#a1a1aa";
        readonly disabled: "#71717a";
        readonly subtle: "#52525b";
    };
    readonly border: {
        readonly DEFAULT: "rgba(39,39,42,0.6)";
        readonly subtle: "rgba(63,63,70,0.5)";
        readonly line: "#3f3f46";
        readonly unfilled: "#52525b";
        readonly alt: "#71717a";
        readonly active: "#22c55e";
        readonly badge: "rgba(34,197,94,0.25)";
        readonly glow: "rgba(34,197,94,0.3)";
    };
    readonly accent: {
        readonly webflow: {
            readonly blue: "#4353FF";
            readonly blueHover: "#5465FF";
        };
        readonly github: {
            readonly bg: "#ffffff";
        };
    };
    readonly syntax: {
        readonly selector: "#c084fc";
        readonly property: "#60a5fa";
        readonly value: "#facc15";
        readonly special: "#f472b6";
        readonly comment: "#71717a";
    };
    readonly traffic: {
        readonly red: "#ff5f57";
        readonly yellow: "#febc2e";
        readonly green: "#28c840";
    };
};
/**
 * Font Families
 */
export declare const fontFamily: {
    mono: string[];
    sans: string[];
};
/**
 * Font Sizes
 */
export declare const fontSize: {
    '2xs': [string, {
        lineHeight: string;
    }];
    xs: [string, {
        lineHeight: string;
    }];
    sm: [string, {
        lineHeight: string;
    }];
    base: [string, {
        lineHeight: string;
    }];
    lg: [string, {
        lineHeight: string;
    }];
    xl: [string, {
        lineHeight: string;
    }];
    '2xl': [string, {
        lineHeight: string;
    }];
    '3xl': [string, {
        lineHeight: string;
    }];
    '4xl': [string, {
        lineHeight: string;
    }];
    '5xl': [string, {
        lineHeight: string;
    }];
    '6xl': [string, {
        lineHeight: string;
    }];
};
/**
 * Spacing Scale
 */
export declare const spacing: {
    readonly '0.5': "0.125rem";
    readonly '1': "0.25rem";
    readonly '1.5': "0.375rem";
    readonly '2': "0.5rem";
    readonly '2.5': "0.625rem";
    readonly '3': "0.75rem";
    readonly '3.5': "0.875rem";
    readonly '4': "1rem";
    readonly '5': "1.25rem";
    readonly '6': "1.5rem";
    readonly '7': "1.75rem";
    readonly '8': "2rem";
    readonly '10': "2.5rem";
    readonly '12': "3rem";
    readonly '16': "4rem";
    readonly '20': "5rem";
    readonly '24': "6rem";
};
/**
 * Border Radius
 */
export declare const borderRadius: {
    readonly none: "0";
    readonly sm: "0.125rem";
    readonly DEFAULT: "0.25rem";
    readonly md: "0.375rem";
    readonly lg: "0.5rem";
    readonly xl: "0.75rem";
    readonly '2xl': "1rem";
    readonly full: "9999px";
};
/**
 * Box Shadows (Green Glow Theme)
 */
export declare const boxShadow: {
    readonly 'glow-sm': "0 0 8px rgba(34,197,94,0.8)";
    readonly glow: "0 0 10px rgba(34,197,94,0.15)";
    readonly 'glow-md': "0 0 15px rgba(34,197,94,0.6)";
    readonly 'glow-lg': "0 0 20px rgba(34,197,94,0.3)";
    readonly sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
    readonly DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1)";
    readonly md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
    readonly lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
    readonly xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)";
    readonly none: "none";
};
/**
 * Animations
 */
export declare const animation: {
    readonly 'fade-in': "fadeIn 0.15s ease-in";
    readonly 'fade-out': "fadeOut 0.15s ease-out";
    readonly 'slide-up': "slideUp 0.2s ease-out";
    readonly 'slide-down': "slideDown 0.2s ease-out";
    readonly 'scale-in': "scaleIn 0.15s ease-out";
    readonly pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite";
    readonly spin: "spin 1s linear infinite";
};
/**
 * Animation Keyframes
 */
export declare const keyframes: {
    readonly fadeIn: {
        readonly '0%': {
            readonly opacity: "0";
        };
        readonly '100%': {
            readonly opacity: "1";
        };
    };
    readonly fadeOut: {
        readonly '0%': {
            readonly opacity: "1";
        };
        readonly '100%': {
            readonly opacity: "0";
        };
    };
    readonly slideUp: {
        readonly '0%': {
            readonly transform: "translateY(8px)";
            readonly opacity: "0";
        };
        readonly '100%': {
            readonly transform: "translateY(0)";
            readonly opacity: "1";
        };
    };
    readonly slideDown: {
        readonly '0%': {
            readonly transform: "translateY(-8px)";
            readonly opacity: "0";
        };
        readonly '100%': {
            readonly transform: "translateY(0)";
            readonly opacity: "1";
        };
    };
    readonly scaleIn: {
        readonly '0%': {
            readonly transform: "scale(0.97)";
            readonly opacity: "0";
        };
        readonly '100%': {
            readonly transform: "scale(1)";
            readonly opacity: "1";
        };
    };
    readonly pulse: {
        readonly '0%, 100%': {
            readonly opacity: "1";
        };
        readonly '50%': {
            readonly opacity: "0.5";
        };
    };
    readonly spin: {
        readonly '0%': {
            readonly transform: "rotate(0deg)";
        };
        readonly '100%': {
            readonly transform: "rotate(360deg)";
        };
    };
};
/**
 * Transition Durations
 */
export declare const transitionDuration: {
    readonly '150': "150ms";
    readonly '200': "200ms";
    readonly '300': "300ms";
    readonly fast: "150ms";
    readonly DEFAULT: "200ms";
    readonly slow: "300ms";
};
/**
 * Backdrop Blur
 */
export declare const backdropBlur: {
    readonly xs: "2px";
    readonly sm: "4px";
    readonly DEFAULT: "8px";
    readonly md: "12px";
    readonly lg: "16px";
};
/**
 * Complete Tailwind Theme Extension
 * Use this to extend your Tailwind config
 */
export declare const tailwindThemeExtension: {
    colors: {
        readonly gray: {
            readonly 50: "#fafafa";
            readonly 100: "#f4f4f5";
            readonly 200: "#e4e4e7";
            readonly 300: "#d4d4d8";
            readonly 400: "#a1a1aa";
            readonly 500: "#71717a";
            readonly 600: "#52525b";
            readonly 700: "#3f3f46";
            readonly 800: "#27272a";
            readonly 900: "#18181b";
        };
        readonly green: {
            readonly 400: "#4ade80";
            readonly 500: "#22c55e";
            readonly 900: "#14532d";
        };
        readonly webflow: {
            readonly blue: "#4353FF";
            readonly 'blue-hover': "#5465FF";
        };
        readonly success: "#22c55e";
        readonly warning: "#f59e0b";
        readonly error: "#ef4444";
        readonly info: "#3b82f6";
        readonly brand: {
            readonly green: {
                readonly 400: "#4ade80";
                readonly 500: "#22c55e";
                readonly 900: "rgba(20,83,45,0.3)";
            };
        };
        readonly surface: {
            readonly base: "#0f0f10";
            readonly DEFAULT: "#18181b";
            readonly elevated: "#1f1f23";
            readonly card: "#27272a";
            readonly input: "#303033";
            readonly hover: "#3a3a3d";
            readonly active: "#454548";
        };
        readonly text: {
            readonly primary: "#ffffff";
            readonly secondary: "#e4e4e7";
            readonly tertiary: "#d4d4d8";
            readonly muted: "#a1a1aa";
            readonly disabled: "#71717a";
            readonly subtle: "#52525b";
        };
        readonly border: {
            readonly DEFAULT: "rgba(39,39,42,0.6)";
            readonly subtle: "rgba(63,63,70,0.5)";
            readonly line: "#3f3f46";
            readonly unfilled: "#52525b";
            readonly alt: "#71717a";
            readonly active: "#22c55e";
            readonly badge: "rgba(34,197,94,0.25)";
            readonly glow: "rgba(34,197,94,0.3)";
        };
        readonly accent: {
            readonly webflow: {
                readonly blue: "#4353FF";
                readonly blueHover: "#5465FF";
            };
            readonly github: {
                readonly bg: "#ffffff";
            };
        };
        readonly syntax: {
            readonly selector: "#c084fc";
            readonly property: "#60a5fa";
            readonly value: "#facc15";
            readonly special: "#f472b6";
            readonly comment: "#71717a";
        };
        readonly traffic: {
            readonly red: "#ff5f57";
            readonly yellow: "#febc2e";
            readonly green: "#28c840";
        };
    };
    fontFamily: {
        mono: string[];
        sans: string[];
    };
    fontSize: {
        '2xs': [string, {
            lineHeight: string;
        }];
        xs: [string, {
            lineHeight: string;
        }];
        sm: [string, {
            lineHeight: string;
        }];
        base: [string, {
            lineHeight: string;
        }];
        lg: [string, {
            lineHeight: string;
        }];
        xl: [string, {
            lineHeight: string;
        }];
        '2xl': [string, {
            lineHeight: string;
        }];
        '3xl': [string, {
            lineHeight: string;
        }];
        '4xl': [string, {
            lineHeight: string;
        }];
        '5xl': [string, {
            lineHeight: string;
        }];
        '6xl': [string, {
            lineHeight: string;
        }];
    };
    spacing: {
        readonly '0.5': "0.125rem";
        readonly '1': "0.25rem";
        readonly '1.5': "0.375rem";
        readonly '2': "0.5rem";
        readonly '2.5': "0.625rem";
        readonly '3': "0.75rem";
        readonly '3.5': "0.875rem";
        readonly '4': "1rem";
        readonly '5': "1.25rem";
        readonly '6': "1.5rem";
        readonly '7': "1.75rem";
        readonly '8': "2rem";
        readonly '10': "2.5rem";
        readonly '12': "3rem";
        readonly '16': "4rem";
        readonly '20': "5rem";
        readonly '24': "6rem";
    };
    borderRadius: {
        readonly none: "0";
        readonly sm: "0.125rem";
        readonly DEFAULT: "0.25rem";
        readonly md: "0.375rem";
        readonly lg: "0.5rem";
        readonly xl: "0.75rem";
        readonly '2xl': "1rem";
        readonly full: "9999px";
    };
    boxShadow: {
        readonly 'glow-sm': "0 0 8px rgba(34,197,94,0.8)";
        readonly glow: "0 0 10px rgba(34,197,94,0.15)";
        readonly 'glow-md': "0 0 15px rgba(34,197,94,0.6)";
        readonly 'glow-lg': "0 0 20px rgba(34,197,94,0.3)";
        readonly sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
        readonly DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1)";
        readonly md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
        readonly lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
        readonly xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)";
        readonly none: "none";
    };
    animation: {
        readonly 'fade-in': "fadeIn 0.15s ease-in";
        readonly 'fade-out': "fadeOut 0.15s ease-out";
        readonly 'slide-up': "slideUp 0.2s ease-out";
        readonly 'slide-down': "slideDown 0.2s ease-out";
        readonly 'scale-in': "scaleIn 0.15s ease-out";
        readonly pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite";
        readonly spin: "spin 1s linear infinite";
    };
    keyframes: {
        readonly fadeIn: {
            readonly '0%': {
                readonly opacity: "0";
            };
            readonly '100%': {
                readonly opacity: "1";
            };
        };
        readonly fadeOut: {
            readonly '0%': {
                readonly opacity: "1";
            };
            readonly '100%': {
                readonly opacity: "0";
            };
        };
        readonly slideUp: {
            readonly '0%': {
                readonly transform: "translateY(8px)";
                readonly opacity: "0";
            };
            readonly '100%': {
                readonly transform: "translateY(0)";
                readonly opacity: "1";
            };
        };
        readonly slideDown: {
            readonly '0%': {
                readonly transform: "translateY(-8px)";
                readonly opacity: "0";
            };
            readonly '100%': {
                readonly transform: "translateY(0)";
                readonly opacity: "1";
            };
        };
        readonly scaleIn: {
            readonly '0%': {
                readonly transform: "scale(0.97)";
                readonly opacity: "0";
            };
            readonly '100%': {
                readonly transform: "scale(1)";
                readonly opacity: "1";
            };
        };
        readonly pulse: {
            readonly '0%, 100%': {
                readonly opacity: "1";
            };
            readonly '50%': {
                readonly opacity: "0.5";
            };
        };
        readonly spin: {
            readonly '0%': {
                readonly transform: "rotate(0deg)";
            };
            readonly '100%': {
                readonly transform: "rotate(360deg)";
            };
        };
    };
    transitionDuration: {
        readonly '150': "150ms";
        readonly '200': "200ms";
        readonly '300': "300ms";
        readonly fast: "150ms";
        readonly DEFAULT: "200ms";
        readonly slow: "300ms";
    };
    backdropBlur: {
        readonly xs: "2px";
        readonly sm: "4px";
        readonly DEFAULT: "8px";
        readonly md: "12px";
        readonly lg: "16px";
    };
};
/**
 * Default export for convenience
 */
export default tailwindThemeExtension;
//# sourceMappingURL=index.d.ts.map