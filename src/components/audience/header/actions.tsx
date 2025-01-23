import { Badge } from "@nextui-org/react";
import { FC } from "react";
import { FaPlugCircleCheck, FaPlugCircleExclamation, FaSquarePollVertical } from "react-icons/fa6";

interface HeaderActionsProps {
  isWsConnected: boolean;
  voteCount: number;
  wsClickedHandler: () => void;
  voteClickedHandler: () => void;
};

export const HeaderActions: FC<HeaderActionsProps> = ({
  isWsConnected,
  voteCount,
  wsClickedHandler,
  voteClickedHandler,
}) => {
  return (
    <div className="flex items-center space-x-2">
      {/* Ws status */}
      {isWsConnected ? (
        <FaPlugCircleCheck onClick={wsClickedHandler} />
      ) : (
        <FaPlugCircleExclamation onClick={wsClickedHandler} color="#BB3333" />
      )}
      {/* Vote count */}
      {/* {voteCount > 0 && ( */}
        <Badge color="primary" onClick={voteClickedHandler} content={voteCount}>
          <FaSquarePollVertical />
        </Badge>
      {/* )} */}
      {/* Vote button */}
    </div>
  );
};
