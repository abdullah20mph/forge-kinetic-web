
import React, { useEffect, useRef, useState } from 'react';
import { Zap, Video, Bot, Mail } from 'lucide-react';

const services = [
	{
		icon: Mail,
		title: 'MVP Launchpad',
		description: 'Build AI apps, sites, dashboards in 2 weeks',
		gradient: 'from-blue-500 to-cyan-500',
		shadow: 'shadow-blue-500/20',
	},
	{
		icon: Video,
		title: 'AI Content Studio',
		description: 'Reels, memes, newsletters using AI',
		gradient: 'from-purple-500 to-pink-500',
		shadow: 'shadow-purple-500/20',
	},
	{
		icon: Bot,
		title: 'Automation Suite',
		description: 'CRM bots, dashboards, lead gen',
		gradient: 'from-green-500 to-emerald-500',
		shadow: 'shadow-green-500/20',
	},
];

export const Services = () => {
	const sectionRef = useRef<HTMLDivElement>(null);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [hoveredCard, setHoveredCard] = useState<number | null>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						const cards = entry.target.querySelectorAll('.service-card');
						cards.forEach((card, index) => {
							setTimeout(() => {
								card.classList.add('animate-scan-reveal');
								card.classList.remove('opacity-0');
							}, index * 200);
						});
					}
				});
			},
			{
				threshold: 0.05,
			}
		);
		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}
		return () => observer.disconnect();
	}, []);

	const handleMouseMove = (e: React.MouseEvent, cardIndex: number) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left - rect.width / 2;
		const y = e.clientY - rect.top - rect.height / 2;
		
		setMousePosition({ x: x * 0.1, y: y * 0.1 });
		setHoveredCard(cardIndex);
	};

	const handleMouseLeave = () => {
		setMousePosition({ x: 0, y: 0 });
		setHoveredCard(null);
	};

	return (
		<section
			id="services"
			ref={sectionRef}
			className="py-16 sm:py-24 px-2 sm:px-6 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
		>
			{/* Animated connecting lines */}
			<svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
				<defs>
					<linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
						<stop offset="50%" stopColor="rgba(59, 130, 246, 0.3)" />
						<stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
					</linearGradient>
				</defs>
				{/* Connection lines between cards */}
				<path
					d="M 200 400 Q 400 200 600 400 Q 800 200 1000 400"
					stroke="url(#line-gradient)"
					strokeWidth="2"
					fill="none"
					strokeDasharray="10,5"
					className="animate-data-flow"
				/>
			</svg>

			<div className="max-w-7xl mx-auto relative z-10">
				{/* Enhanced Heading */}
				<div className="text-center mb-10 sm:mb-16">
					<h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent relative">
						<span className="relative">
							Our Services
							<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-spotlight" />
						</span>
					</h2>
					<p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto animate-fade-up">
						Comprehensive AI solutions designed to accelerate your digital
						transformation
					</p>
				</div>

				{/* Enhanced Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 max-w-6xl mx-auto">
					{services.map((service, index) => {
						const Icon = service.icon;
						const isHovered = hoveredCard === index;
						
						return (
							<div
								key={index}
								className={`service-card opacity-0 group bg-gradient-to-b from-gray-900/50 to-black/50 p-5 sm:p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-500 shadow-lg hover:shadow-2xl hover:${service.shadow} relative overflow-hidden cursor-pointer perspective-1000`}
								style={{ 
									minHeight: 320, 
									minWidth: 0,
									transform: isHovered 
										? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg) scale(1.02)`
										: 'translate3d(0, 0, 0) rotateX(0) rotateY(0) scale(1)'
								}}
								onMouseMove={(e) => handleMouseMove(e, index)}
								onMouseLeave={handleMouseLeave}
							>
								{/* Enhanced Glow on hover */}
								<div
									className={`absolute inset-0 bg-gradient-to-r ${service.gradient} blur-xl rounded-2xl opacity-0 group-hover:opacity-20 transition-all duration-500 animate-pulse-glow`}
								/>

								{/* Animated background orb */}
								<div className="absolute -top-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-float" />

								{/* Scan line effect */}
								<div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

								<div className="relative z-10 flex flex-col items-center text-center">
									{/* Enhanced Icon */}
									<div
										className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 shadow-lg group-hover:${service.shadow} group-hover:shadow-2xl relative overflow-hidden`}
									>
										<Icon
											strokeWidth={2.5}
											className="w-6 h-6 sm:w-8 sm:h-8 text-white transition-all duration-300 group-hover:animate-icon-spin relative z-10"
										/>
										{/* Icon glow effect */}
										<div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
									</div>

									{/* Enhanced Title */}
									<h3 className="text-xl sm:text-2xl font-bold mb-3 text-white group-hover:text-blue-400 transition-all duration-300 relative">
										<span className="relative">
											{service.title}
											<div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 animate-spotlight" />
										</span>
									</h3>

									{/* Enhanced Description */}
									<p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-4 relative">
										{service.description}
									</p>

									{/* Enhanced Price with animation */}
									<p className="text-xs sm:text-sm text-gray-500 font-medium group-hover:text-gray-400 transition-colors duration-300 relative">
										<span className="relative">
											From $499
											<div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-500" />
										</span>
									</p>
								</div>

								{/* Floating particles */}
								{isHovered && (
									<div className="absolute inset-0 pointer-events-none">
										{[...Array(6)].map((_, i) => (
											<div
												key={i}
												className="absolute w-1 h-1 bg-blue-400 rounded-full animate-particle-float"
												style={{
													left: `${Math.random() * 100}%`,
													top: `${Math.random() * 100}%`,
													animationDelay: `${Math.random() * 2}s`
												}}
											/>
										))}
									</div>
								)}

								{/* Ripple effect on hover */}
								<div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
									<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 animate-pulse" />
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};
