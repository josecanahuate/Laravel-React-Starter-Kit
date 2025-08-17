import { ReactNode } from "react";

interface CardDashboardProps {
  className?: string;
  title: number;
  description: string;
  iconSvg?: ReactNode;
}

export function CardDashboard({
  className,
  title,
  description,
  iconSvg,
}: CardDashboardProps) {
  return (
    <div className={`p-4 md:w-1/4 sm:w-1/2 w-full ${className || ""}`}>
      <div className="shadow-lg px-4 py-6 rounded-lg">
        {iconSvg ? (
          <div className="w-12 h-12 mb-3 inline-block text-indigo-500">
            {iconSvg}
          </div>
        ) : (
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="text-indigo-500 w-12 h-12 mb-3 inline-block"
            viewBox="0 0 24 24"
          >
            <path d="M8 17l4 4 4-4m-4-5v9"></path>
            <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"></path>
          </svg>
        )}

        <h2 className="title-font font-medium text-3xl text-gray-900">
          {title}
        </h2>

        <p className="leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
