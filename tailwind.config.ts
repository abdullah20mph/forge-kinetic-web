
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.95)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'zoom-fade-in': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.8)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'text-morph': {
					'0%': { transform: 'scale(1)', filter: 'blur(0px)' },
					'20%': { transform: 'scale(1.1)', filter: 'blur(2px)' },
					'50%': { transform: 'scale(0.8)', filter: 'blur(4px)', opacity: '0.3' },
					'80%': { transform: 'scale(1.1)', filter: 'blur(2px)' },
					'100%': { transform: 'scale(1)', filter: 'blur(0px)' }
				},
				'magnetic-hover': {
					'0%': { transform: 'translateX(0) translateY(0) rotateY(0deg)' },
					'100%': { transform: 'translateX(var(--mouse-x)) translateY(var(--mouse-y)) rotateY(var(--rotate-y))' }
				},
				'scan-reveal': {
					'0%': { 
						clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
						opacity: '0'
					},
					'50%': {
						clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
						opacity: '0.5'
					},
					'100%': { 
						clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
						opacity: '1'
					}
				},
				'data-flow': {
					'0%': { 
						strokeDashoffset: '100%',
						opacity: '0'
					},
					'50%': {
						opacity: '1'
					},
					'100%': { 
						strokeDashoffset: '0%',
						opacity: '0'
					}
				},
				'spotlight': {
					'0%': { 
						background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
						transform: 'translateX(-100%)'
					},
					'50%': {
						background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
					},
					'100%': { 
						background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
						transform: 'translateX(100%)'
					}
				},
				'gradient-wave': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'icon-spin': {
					'0%': { transform: 'rotate(0deg) scale(1)' },
					'50%': { transform: 'rotate(180deg) scale(1.1)' },
					'100%': { transform: 'rotate(360deg) scale(1)' }
				},
				'card-tilt': {
					'0%': { transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' },
					'100%': { transform: 'perspective(1000px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y))' }
				},
				'pulse-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
						transform: 'scale(1)'
					},
					'50%': { 
						boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)',
						transform: 'scale(1.02)'
					}
				},
				'typewriter': {
					'0%': { width: '0ch' },
					'100%': { width: '100%' }
				},
				'blink': {
					'0%, 50%': { borderColor: 'transparent' },
					'51%, 100%': { borderColor: 'white' }
				},
				'particle-float': {
					'0%': { 
						transform: 'translateY(0px) translateX(0px) scale(0)',
						opacity: '0'
					},
					'10%': {
						transform: 'translateY(-10px) translateX(5px) scale(1)',
						opacity: '1'
					},
					'90%': {
						transform: 'translateY(-100px) translateX(-20px) scale(1)',
						opacity: '1'
					},
					'100%': { 
						transform: 'translateY(-120px) translateX(-30px) scale(0)',
						opacity: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.8s ease-out forwards',
				'fade-up': 'fade-up 0.8s ease-out forwards',
				'slide-up': 'slide-up 0.6s ease-out forwards',
				'scale-in': 'scale-in 0.4s ease-out forwards',
				'zoom-fade-in': 'zoom-fade-in 1s ease-out forwards',
				'text-morph': 'text-morph 0.8s ease-in-out',
				'magnetic-hover': 'magnetic-hover 0.3s ease-out',
				'scan-reveal': 'scan-reveal 1.2s ease-out forwards',
				'data-flow': 'data-flow 3s ease-in-out infinite',
				'spotlight': 'spotlight 2s ease-in-out infinite',
				'gradient-wave': 'gradient-wave 3s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'icon-spin': 'icon-spin 4s ease-in-out infinite',
				'card-tilt': 'card-tilt 0.3s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'typewriter': 'typewriter 2s steps(40) forwards',
				'blink': 'blink 1s infinite',
				'particle-float': 'particle-float 4s ease-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
