import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import { addDays, format, startOfMonth, endOfMonth, subMonths, startOfWeek, endOfWeek, subDays } from 'date-fns';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

interface Preset {
  label: string;
  range: () => DateRange;
}

const today = new Date();

const presets: Preset[] = [
  { label: 'Today', range: () => ({ from: today, to: today }) },
  { label: 'Yesterday', range: () => ({ from: subDays(today, 1), to: subDays(today, 1) }) },
  { label: 'Last 7 Days', range: () => ({ from: subDays(today, 6), to: today }) },
  { label: 'Last 30 Days', range: () => ({ from: subDays(today, 29), to: today }) },
  { label: 'This Week', range: () => ({ from: startOfWeek(today), to: endOfWeek(today) }) },
  {
    label: 'Last Week',
    range: () => {
      const lastWeekStart = startOfWeek(subDays(today, 7));
      return { from: lastWeekStart, to: endOfWeek(lastWeekStart) };
    },
  },
  { label: 'This Month', range: () => ({ from: startOfMonth(today), to: endOfMonth(today) }) },
  {
    label: 'Last Month',
    range: () => {
      const lastMonth = subMonths(today, 1);
      return { from: startOfMonth(lastMonth), to: endOfMonth(lastMonth) };
    },
  },
];

interface AdvancedDateRangePickerProps {
  className?: string;
  initialDateRange?: DateRange;
  onDateChange: (dateRange: DateRange | undefined) => void;
  align?: "start" | "center" | "end";
  maxDays?: number;
}

const AdvancedDateRangePicker: React.FC<AdvancedDateRangePickerProps> = ({
  className,
  initialDateRange,
  onDateChange,
  align = "start",
  maxDays = 365, // Example: limit range to 1 year
}) => {
  const [date, setDate] = useState<DateRange | undefined>(initialDateRange);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log("AdvancedDateRangePicker: Initial date range set", initialDateRange);
    setDate(initialDateRange);
  }, [initialDateRange]);

  const handleDateSelect = (selectedRange: DateRange | undefined) => {
    console.log("AdvancedDateRangePicker: Date selected", selectedRange);
    setDate(selectedRange);
    onDateChange(selectedRange);
    // Optionally close popover on selection, or keep it open for multi-month navigation
    // setIsOpen(false); 
  };
  
  const handlePresetClick = (preset: Preset) => {
    const newRange = preset.range();
    console.log("AdvancedDateRangePicker: Preset selected", preset.label, newRange);
    setDate(newRange);
    onDateChange(newRange);
    setIsOpen(false); // Close popover after preset selection
  };

  const displayFormat = "LLL dd, y";
  let buttonText = "Pick a date range";
  if (date?.from) {
    if (date.to) {
      buttonText = `${format(date.from, displayFormat)} - ${format(date.to, displayFormat)}`;
    } else {
      buttonText = format(date.from, displayFormat);
    }
  }


  return (
    <div className={cn('grid gap-2', className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-full sm:w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>{buttonText}</span>
            <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 flex" align={align}>
          <div className="p-4 border-r border-border">
            <p className="text-sm font-medium mb-2 text-foreground">Presets</p>
            <div className="grid grid-cols-1 gap-1">
              {presets.map((preset) => (
                <Button
                  key={preset.label}
                  variant="ghost"
                  className="w-full justify-start text-sm h-8 px-2"
                  onClick={() => handlePresetClick(preset)}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="p-2">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleDateSelect}
              numberOfMonths={2}
              max={maxDays ? addDays(date?.from || new Date(), maxDays) : undefined} // Example for maxDays
              disabled={(d) => d > new Date() || d < new Date("1900-01-01")} // Example: disable future dates and very old dates
            />
            <Separator className="my-2" />
            <div className="flex justify-end p-2">
                <Button onClick={() => setIsOpen(false)} size="sm">Done</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AdvancedDateRangePicker;