import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ModelSelectorProps {
  selectedModel: 'openai' | 'anthropic';
  onModelChange: (value: 'openai' | 'anthropic') => void;
}

export const ModelSelector = ({ selectedModel, onModelChange }: ModelSelectorProps) => {
  return (
    <div className="mb-4">
      <Select
        value={selectedModel}
        onValueChange={onModelChange}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Выберите модель" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="openai">OpenAI GPT-4</SelectItem>
          <SelectItem value="anthropic">Anthropic Claude</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};