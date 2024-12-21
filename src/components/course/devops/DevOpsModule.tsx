import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DevOpsModuleTopics } from "./DevOpsModuleTopics";
import { LucideIcon } from "lucide-react";

interface DevOpsModuleProps {
  title: string;
  topics: string[];
  icon: LucideIcon;
  moduleIndex: number;
  completedLessons: string[];
}

export const DevOpsModule = ({ 
  title, 
  topics, 
  icon: ModuleIcon,
  moduleIndex,
  completedLessons 
}: DevOpsModuleProps) => {
  return (
    <AccordionItem value={`module-${moduleIndex}`}>
      <AccordionTrigger className="text-lg font-semibold">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <ModuleIcon className="h-5 w-5 text-primary" />
          </div>
          {title}
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4 pl-4">
          <div className="border-l-2 border-gray-200 pl-4">
            <DevOpsModuleTopics
              topics={topics}
              moduleIndex={moduleIndex}
              completedLessons={completedLessons}
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};