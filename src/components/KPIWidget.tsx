import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react'; // Example trend icons

interface KPIWidgetProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ElementType;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string; // e.g., "+5.2%"
  className?: string;
}

const KPIWidget: React.FC<KPIWidgetProps> = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  className,
}) => {
  console.log("Rendering KPIWidget:", title);

  const TrendIcon = trend === 'up' ? ArrowUp : trend === 'down' ? ArrowDown : Minus;
  const trendColor = trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-muted-foreground';

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        {trend && trendValue && (
          <div className={cn("flex items-center text-xs mt-2", trendColor)}>
            <TrendIcon className="h-4 w-4 mr-1" />
            <span>{trendValue}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KPIWidget;