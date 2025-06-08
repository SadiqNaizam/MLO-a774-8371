import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button"; // Optional action button
import { cn } from '@/lib/utils';

interface SummaryItem {
  label: string;
  value: string | number;
  unit?: string;
}

interface DataSummaryCardProps {
  title: string;
  description?: string;
  items: SummaryItem[];
  actionText?: string;
  onActionClick?: () => void;
  className?: string;
  icon?: React.ElementType;
}

const DataSummaryCard: React.FC<DataSummaryCardProps> = ({
  title,
  description,
  items,
  actionText,
  onActionClick,
  className,
  icon: Icon,
}) => {
  console.log("Rendering DataSummaryCard:", title);

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle>{title}</CardTitle>
            {Icon && <Icon className="h-6 w-6 text-muted-foreground" />}
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-medium">
                {item.value}
                {item.unit && <span className="text-xs text-muted-foreground ml-1">{item.unit}</span>}
              </span>
            </div>
            {index < items.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </CardContent>
      {actionText && onActionClick && (
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={onActionClick}>
            {actionText}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default DataSummaryCard;