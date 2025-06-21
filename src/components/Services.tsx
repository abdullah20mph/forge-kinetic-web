import React, { useEffect, useRef } from 'react';
import { Zap, Video, Bot, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
		gradient: 'from-blue-500 to-cyan-500',
		shadow: 'shadow-blue-500/20',
	},
	{
		icon: Bot,
		title: 'Automation Suite',
		description: 'CRM bots, dashboards, lead gen',
		gradient: 'from-blue-500 to-cyan-500',
		shadow: 'shadow-blue-500/20',
	},
];

export const Services = () => {
	const navigate = useNavigate();
	const sectionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						const cards = entry.target.querySelectorAll('.service-card');
						cards.forEach((card, index) => {
							setTimeout(() => {
								card.classList.add('animate-slide-up');
								card.classList.remove('opacity-0', 'translate-y-8');
							}, index * 200);
						});
					}
				});
			},
			{
				threshold: 0.05, // even more sensitive for mobile
			}
		);
		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}
		return () => observer.disconnect();
	}, []);

	const handleServiceClick = (serviceTitle: string) => {
		navigate('/services', {
			state: { selectedService: serviceTitle },
		});
	};

	return (
		<section
			id="services"
			ref={sectionRef}
			className="py-16 sm:py-24 px-2 sm:px-6 bg-gradient-to-b from-black to-gray-900"
		>
			<div className="max-w-7xl mx-auto">
				{/* Heading */}
				<div className="text-center mb-10 sm:mb-16">
					<h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
						Our Services
					</h2>
					<p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
						Comprehensive AI solutions designed to accelerate your digital
						transformation
					</p>
				</div>

				{/* Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 max-w-6xl mx-auto">
					{services.map((service, index) => {
						const Icon = service.icon;
						return (
							<div
								key={index}
								onClick={() => handleServiceClick(service.title)}
								className={`service-card sm:opacity-0 sm:translate-y-8 group bg-gradient-to-b from-gray-900/50 to-black/50 p-5 sm:p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl cursor-pointer`}
								style={{ minHeight: 320, minWidth: 0 }}
							>
								{/* Glow on hover */}
								<div
									className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}
								/>

								{/* Background orb */}
								<div className="absolute -top-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

								<div className="relative z-10 flex flex-col items-center text-center">
									{/* Icon */}
									<div
										className={`w-14 h-14 sm:w-16 sm:h-16 ${service.gradient} rounded-2xl flex items-center justify-center mb-6 transform transition-all duration-500 shadow-lg group-hover:${service.shadow} group-hover:shadow-2xl group-hover:scale-110 group-hover:rotate-3`}
									>
										<Icon
											strokeWidth={2.5}
											className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-300"
										/>
									</div>

									{/* Title */}
									<h3 className="text-xl sm:text-2xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">
										{service.title}
									</h3>

									{/* Description */}
									<p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-4">
										{service.description}
									</p>

									{/* Price */}
									<p className="text-xs sm:text-sm text-gray-500 font-medium group-hover:text-gray-400 transition-colors duration-300">
										From $499
									</p>
								</div>

								{/* Hover shimmer */}
								<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500" />
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};
