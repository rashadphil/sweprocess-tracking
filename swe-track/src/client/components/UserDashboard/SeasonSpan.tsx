function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
const seasons = [
  {
    name: '2022 Summer',
    active: false
  },
  {
    name: '2022 Winter',
    active: false
  },
  {
    name: '2022 New Grad',
    active: true
  }
]
export default function SeasonSpan() {
  return (
    <div className="font-[Oceanwide] border inline-flex rounded-lg bg-gray-200 text-sm">
      {seasons.map(season => {
        const { name, active } = season
        return (
          <div
            className={classNames(
              'py-2 px-2 rounded-lg',
              active ? 'bg-white text-gray-900' : 'text-gray-500'
            )}
          >
            {name}
          </div>
        )
      })}
    </div>
  )
}
