// 投票をアクティベートするブロック // TODO: Replace

import { Vote } from "@/types/session/vote";
import { Card, CardBody } from "@nextui-org/react";
import { FC } from "react";

type PresenterBlockVoteControlProps = {
  votes: Vote[];
  onActivateVote: (voteId: string) => void;
  onDeactivateVote: (voteId: string) => void;
};

export const PresenterBlockVoteControl: FC<PresenterBlockVoteControlProps> = ({
  votes,
  onActivateVote,
  onDeactivateVote
}) => {
  return (
    <Card className="w-full">
      <CardBody>
        
      </CardBody>
    </Card>
  );
};
