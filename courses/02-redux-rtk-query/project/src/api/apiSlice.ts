import { createApi } from '@reduxjs/toolkit/query/react'
import { mockApi } from './mockServer'

type Users = Awaited<ReturnType<typeof mockApi.getUsers>>

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: async () => {
        const data = await mockApi.getUsers()
        return { data }
    },
    endpoints: (builder) => ({
        getUsers: builder.query<Users, void>({
            queryFn: async () => {
                const data = await mockApi.getUsers()
                return { data }
            },
        }),
    }),
})

export const { useGetUsersQuery } = apiSlice