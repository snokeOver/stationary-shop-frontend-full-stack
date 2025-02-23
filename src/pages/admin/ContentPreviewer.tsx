import React from "react";
import { X } from "lucide-react";

interface IContentPreviewerProps {
  source: string;
  type: string;
  onClick: () => void;
}

const ContentPreviewer: React.FC<IContentPreviewerProps> = ({
  source,
  type,
  onClick,
}) => {
  return (
    <div className="relative">
      {type.includes("image") && (
        <img
          src={source}
          alt={source}
          width={500}
          height={500}
          className="h-36 w-40 rounded object-cover"
        />
      )}

      <div
        className="absolute left-2 top-2 rounded-full bg-gray-300 p-0 text-red-700 hover:cursor-pointer"
        onClick={onClick}
      >
        <X />
      </div>
    </div>
  );
};

export default ContentPreviewer;
