import { useEffect, useState } from 'react'

const useFetchIazosFromApi = (id: number) => {
  const [sale, setSale] = useState<[] | null>(null)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${apiBaseUrl}/nfas/history/${id}`)
//         const responsedata: SaleHistory[] = await response.json()

//         setSale(responsedata)
//       } catch (error) {
//         console.warn('Unable to fetch data:', error)
//       }
//     }
//     fetchData()
//   }, [setSale, id])
  return sale
}

export default useFetchIazosFromApi
