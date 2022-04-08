import { useEffect, useState } from 'react'

function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)
}

export default useDebounce
