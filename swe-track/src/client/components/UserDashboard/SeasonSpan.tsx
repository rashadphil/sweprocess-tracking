function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
const seasons = [
  {
    id: 's22',
    name: '2022 Summer'
  },
  {
    id: 'w22',
    name: '2022 Winter'
  },
  {
    id: 'ng22',
    name: '2022 New Grad'
  }
]
export default function SeasonSpan({
  activeSeason,
  setActiveSeason
}: {
  activeSeason: string
  setActiveSeason: (value: string) => void
}) {
  return (
    <div className="font-[Oceanwide] border inline-flex rounded-lg bg-gray-200 text-sm">
      {seasons.map(season => {
        const { id, name } = season
        const active: boolean = activeSeason == id
        return (
          <div
            className={classNames(
              'py-2 px-2 rounded-lg ',
              active
                ? 'bg-white text-gray-900'
                : 'hover:cursor-pointer transition-all hover:bg-gray-100 text-gray-500'
            )}
            onClick={() => setActiveSeason(id)}
          >
            {name}
          </div>
        )
      })}
    </div>
  )
}
