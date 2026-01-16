import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { CalendarBlank } from '@phosphor-icons/react'
import { format, differenceInDays } from 'date-fns'
import { fr } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import type { DateRange } from 'react-day-picker'

interface DateRangePickerProps {
  checkIn?: Date | null
  checkOut?: Date | null
  onCheckInChange: (date: Date) => void
  onCheckOutChange: (date: Date) => void
  language?: string
}

export function DateRangePicker({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
  language = 'fr',
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const numberOfNights =
    checkIn && checkOut
      ? differenceInDays(checkOut, checkIn)
      : 0

  const handleDateRangeSelect = (range: DateRange | undefined) => {
    if (range?.from) {
      onCheckInChange(range.from)
      if (range.to) {
        onCheckOutChange(range.to)
        setIsOpen(false)
      } else {
        const nextDay = new Date(range.from.getTime() + 24 * 60 * 60 * 1000)
        onCheckOutChange(nextDay)
      }
    }
  }

  const dateRange: DateRange | undefined = checkIn && checkOut
    ? { from: checkIn, to: checkOut }
    : checkIn
    ? { from: checkIn, to: undefined }
    : undefined

  const displayText = checkIn && checkOut
    ? `${format(checkIn, 'd MMM', { locale: fr })} - ${format(checkOut, 'd MMM yyyy', { locale: fr })}`
    : checkIn
    ? format(checkIn, 'd MMM yyyy', { locale: fr })
    : 'Choisir les dates'

  return (
    <div className="space-y-3">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal h-11',
              !checkIn && 'text-muted-foreground'
            )}
          >
            <CalendarBlank className="mr-2 h-4 w-4" />
            {displayText}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={handleDateRangeSelect}
            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            locale={fr}
            defaultMonth={checkIn || new Date()}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>

      {numberOfNights > 0 && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 text-center">
          <p className="text-sm font-semibold text-primary">
            {numberOfNights} {numberOfNights === 1 ? 'nuitée' : 'nuitées'}
          </p>
        </div>
      )}
    </div>
  )
}
