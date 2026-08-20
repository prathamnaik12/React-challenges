import { createApi } from '@reduxjs/toolkit/query/react'
import { mockApi, type Post } from './mockServer'

type Users = Awaited<ReturnType<typeof mockApi.getUsers>>
type Posts = Awaited<ReturnType<typeof mockApi.getPosts>>

export const apiSlice = createApi({
    reducerPath: 'api',

    tagTypes: ['User', 'Post'],

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

            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({
                            type: 'User' as const,
                            id,
                        })),
                        { type: 'User' as const, id: 'LIST' },
                    ]
                    : [{ type: 'User' as const, id: 'LIST' }],
        }),

        getPosts: builder.query<Posts, void>({
            queryFn: async () => {
                const data = await mockApi.getPosts()
                return { data }
            },

            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({
                            type: 'Post' as const,
                            id,
                        })),
                        { type: 'Post' as const, id: 'LIST' },
                    ]
                    : [{ type: 'Post' as const, id: 'LIST' }],
        }),

        addPost: builder.mutation<Post, Omit<Post, 'id'>>({
            queryFn: async (post) => {
                const data = await mockApi.createPost(post)
                return { data }
            },

            invalidatesTags: [{ type: 'Post', id: 'LIST' }],
        }),
    }),
})

export const {
    useGetUsersQuery,
    useGetPostsQuery,
    useAddPostMutation,
} = apiSlice