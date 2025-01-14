import { Button } from "@nextui-org/button";
import { Switch } from "@nextui-org/switch";
import MDEditor from "@uiw/react-md-editor";

export default function EditScript() {
  return (
    <div className="h-full flex flex-col">
      <MDEditor
        className="flex-grow"
        height="auto"
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
