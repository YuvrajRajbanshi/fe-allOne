import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  features: { icon: React.ReactNode; text: string }[];
  footerText: string;
  onClick?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  features,
  footerText,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex-1 bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02]"
    >
      {/* Icon */}
      <div className="flex justify-center mb-6">{icon}</div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        {title}
      </h2>

      {/* Features List */}
      <ul className="space-y-4 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3 text-gray-600">
            <div className="w-5 h-5 flex-shrink-0 text-gray-400">
              {feature.icon}
            </div>
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>

      {/* Footer text */}
      <p className="text-sm text-gray-400 text-center">{footerText}</p>
    </div>
  );
};

export default FeatureCard;
