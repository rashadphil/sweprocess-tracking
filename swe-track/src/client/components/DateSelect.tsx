import { forwardRef, useState } from 'react'
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

export default function DateSelect() {
  const [startDate, setStartDate] = useState<Date>(new Date())
  return (
        <div className="flex items-center justify-center max-w-2xl py-20 mx-auto space-x-4">
          <div className="relative w-full">
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date || new Date())}
              dateFormat="dd MMM yyyy"
              startDate={startDate}
              fixedHeight
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
        </div>
  )
}
