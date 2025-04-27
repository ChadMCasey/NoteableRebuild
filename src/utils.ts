

export const paths = {
  dashboard: "/dashboard",

  dashboardCategory: (category: string) =>
    `/dashboard?category=${category}`,

  dashboardSearch: (search: string) =>
    `/dashboard?search=${encodeURIComponent(search)}`,

  login: "/login",

  newNote: "/note/new",
  viewNote: (noteId: string) => `/note/${noteId}`
}

