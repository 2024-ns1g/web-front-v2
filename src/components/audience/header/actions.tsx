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
    <div className="flex items-center gap-6">
      {/* Ws status */}
      {isWsConnected ? (
        <FaPlugCircleCheck onClick={wsClickedHandler} color="#333" size="1.5em" />
      ) : (
        <FaPlugCircleExclamation onClick={wsClickedHandler} color="#BB3333" size="1.5em" />
      )}
      {/* Vote count */}
      {/* {voteCount > 0 && ( */}
        <Badge color="primary" content={voteCount}>
          <FaSquarePollVertical onClick={voteClickedHandler} color="#333" size="1.5em" />
        </Badge>
      {/* )} */}
      {/* Vote button */}
    </div>
  );
};
