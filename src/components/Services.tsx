import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { services } from '../data/services';

export const Services = () => {
	const navigate = useNavigate();
	const sectionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						entry.target.classList.add('animate-fade-up');

						if (entry.target === sectionRef.current) {
							const serviceCards = entry.target.querySelectorAll('.service-block');
							serviceCards.forEach((card, index) => {
								setTimeout(() => {
									card.classList.add('animate-fade-up');
								}, index * 200);
							});
						}
					}
				});
			},
			{
				threshold: 0.1
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
					Meet Your AI Team					</h2>
					<p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
						Comprehensive AI solutions designed to accelerate your digital
						transformation
					</p>
				</div>

				{/* Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
					{services.slice(0, 3).map((service, index) => {
						const Icon = service.icon;
						return (
							<div
								key={index}
								onClick={() => handleServiceClick(service.title)}
								className="service-block relative group opacity-0 translate-y-8 transition-all duration-500 transform hover:scale-[1.03] cursor-pointer"
							>
								{/* Glow background */}
								<div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} blur-2xl rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-0`} />

								{/* Card content */}
								<div className="relative z-10 bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl p-6 sm:p-8 h-full transition-all duration-500 shadow-lg group-hover:shadow-2xl group-hover:shadow-blue-500/10">
									{/* Icon */}
									<div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 transform transition-transform duration-300 group-hover:scale-110 border border-white/10 bg-white/5 backdrop-blur-lg">
										<Icon className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
									</div>

									{/* Title */}
									<h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white group-hover:text-blue-400 transition-colors duration-300">
										{service.title}
									</h3>

									{/* Description */}
									<p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 leading-relaxed">
										{service.shortDescription}
									</p>

									{/* Tools */}
									<div className="border-t border-white/10 pt-3 sm:pt-4">
										<p className="text-xs sm:text-sm text-gray-400 font-medium">{service.tools}</p>
									</div>

									{/* Use Cases */}
									<div className="border-t border-white/10 pt-3 sm:pt-4 mt-3">
										<p className="text-xs sm:text-sm text-gray-500 font-medium">Use Cases:</p>
										<p className="text-xs sm:text-sm text-gray-400 mt-1">{service.useCases}</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};
