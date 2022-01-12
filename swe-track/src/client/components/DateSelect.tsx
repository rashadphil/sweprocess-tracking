import { forwardRef, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { format } from 'date-fns'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { CalendarIcon } from '@heroicons/react/outline'

const CustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
  <div
    className="w-56 justify-between border bg-white rounded-lg shadow-sm text-gray-600 py-3 px-3 inline-flex hover:cursor-pointer focus:outline-none focus:shadow-outline"
    onClick={onClick}
    ref={ref}
  >
    <span>{value}</span>
    <CalendarIcon className="w-6 h-6 text-gray-300" aria-hidden="true" />
  </div>
))

const TodayButton = () => (
  <button className="text-gray-500 hover:text-gray-700 hover:border-gray-700 border-2 px-8 rounded-md my-1">
    Today
  </button>
)
type EntryProps = {
  companyData: any
  status: string
  date: Date | null
}

type DateSelectProps = {
  newEntry: EntryProps
  setNewEntry: (entry: EntryProps) => void
  closePopover: () => void
}

export default function DateSelect({
  newEntry,
  setNewEntry,
  closePopover
}: DateSelectProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  useEffect(() => {
    if (selectedDate) {
      setNewEntry({ ...newEntry, date: selectedDate })
      closePopover()
    }
  }, [selectedDate])
  return (
    <div className="relative w-full">
      <DatePicker
        selected={selectedDate}
        onChange={date => setSelectedDate(date || new Date())}
        dateFormat="dd MMM yyyy"
        startDate={selectedDate}
        fixedHeight
        inline={true}
        todayButton={<TodayButton />}
        popperClassName="react-datepicker-left"
        customInput={<CustomInput />}
        nextMonthButtonLabel=">"
        previousMonthButtonLabel="<"
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled
        }) => (
          <div className="flex items-center justify-between px-2 py-2">
            <div className="text-lg text-gray-700">
              <span className="text-black font-bold">
                {format(date, 'MMMM')}
              </span>
              {'  '}
              {format(date, 'yyyy')}
            </div>
            <div className="space-x-2">
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                type="button"
                className={`
                        ${
                          prevMonthButtonDisabled &&
                          'cursor-not-allowed opacity-50'
                        }
                        inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500`}
              >
                <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                type="button"
                className={`
                        ${
                          nextMonthButtonDisabled &&
                          'cursor-not-allowed opacity-50'
                        }
                        inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500`}
              >
                <ChevronRightIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        )}
      />
    </div>
  )
}
