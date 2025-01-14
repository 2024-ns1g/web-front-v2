import { useLogger } from "@/hooks/use-logger";
import { Button } from "@nextui-org/button";
import { Switch } from "@nextui-org/switch";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";

export default function ScriptEditor() {
  const log = useLogger("ScriptEditor");

  const [value, setValue] = useState("");
  const [autoSave, setAutoSave] = useState(false);

  const handleChange = (value?: string) => {
    log.debug("handleChange", value);
  };

  const handleSave = () => {
    log.debug("handleSave");
  };

  return (
    <div className="h-full flex flex-col">
      <MDEditor
        className="flex-grow"
        height="100%"
        value={value}
        onChange={handleChange}
      />
      <div className="flex justify-between p-2 x-2">
        <div>
          <Switch isSelected={autoSave} onValueChange={setAutoSave}>
            自動保存
          </Switch>
        </div>
        <div className="space-x-2">
          <Button color="default" variant="bordered" size="sm">キャンセル</Button>
          <Button color="primary" size="sm" onPress={() => handleSave()}>保存</Button>
        </div>
      </div>
    </div>
  );
}
