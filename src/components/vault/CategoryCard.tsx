import React from "react";

interface CategoryCardProps {
  _id: string;
  name: string;
  thumbnail: string;
  itemCount: number;
  type?: string;
  color?: string;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  thumbnail,
  itemCount,
  type,
  color,
  onClick,
}) => {
  const getTypeIcon = (type?: string) => {
    switch (type) {
      case "birthday":
        return "🎂";
      case "anniversary":
        return "💍";
      case "event":
        return "📅";
      default:
        return "📁";
    }
  };

  const getColorClass = (color?: string) => {
    const colors: Record<string, string> = {
      red: "from-red-400 to-red-600",
      orange: "from-orange-400 to-orange-600",
      yellow: "from-yellow-400 to-yellow-600",
      green: "from-green-400 to-green-600",
      blue: "from-blue-400 to-blue-600",
      indigo: "from-indigo-400 to-indigo-600",
      purple: "from-purple-400 to-purple-600",
      pink: "from-pink-400 to-pink-600",
    };
    return colors[color || "indigo"] || colors.indigo;
  };

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* Thumbnail */}
      <div className="aspect-[4/3] relative">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${getColorClass(
              color
            )} flex items-center justify-center`}
          >
            <span className="text-5xl opacity-80">{getTypeIcon(type)}</span>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold text-lg truncate">{name}</h3>
          <p className="text-white/80 text-sm">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
