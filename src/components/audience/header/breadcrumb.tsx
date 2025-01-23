import { FC } from "react";

interface HeaderBreadcrumbProps {
  sessionName: string;
  currentSlideName: string;
};

export const HeaderBreadcrumb: FC<HeaderBreadcrumbProps> = ({
  sessionName,
  currentSlideName,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="text-sm text-gray-400">{sessionName}</div>
      <div className="text-sm text-gray-400">/</div>
      <div className="text-sm text-gray-800">{currentSlideName}</div>
    </div>
  );
};
