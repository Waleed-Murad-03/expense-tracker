// CategoryFilter
// Props: value - selected category ("All" or a category), onChange(category) - called on selection. No state.
import { CATEGORIES } from '../utils/categories'

export default function CategoryFilter({ value, onChange }) {
  return (
    <select
      data-cy="filter"
      aria-label="Filter by category"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {['All', ...CATEGORIES].map((c) => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>
  )
}
