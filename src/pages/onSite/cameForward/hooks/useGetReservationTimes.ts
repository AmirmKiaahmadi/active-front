import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { reservationTimeranges } from 'services/onSite'

export default function useGetReservationTimes(customDate : string | undefined) {
  const {data} = useQuery({
    queryKey : ["reservation-time-ranges" , customDate],
    queryFn : reservationTimeranges,
    enabled : !!customDate
  })
    return {reservationTimes : data}
}
