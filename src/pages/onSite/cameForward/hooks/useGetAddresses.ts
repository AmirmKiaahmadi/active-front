import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { addressesService } from 'services/onSite'

export default function useGetAddresses() {
  const {data} = useQuery({
    queryKey : ["get-addresses"],
    queryFn : addressesService
  })
    return {addresses: data}
}
