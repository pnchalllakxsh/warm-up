import { create } from 'zustand'

type User = { name: string } | null

interface UserState {
  user: User
  setUser: (u: User) => void
  clear: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (u) => set({ user: u }),
  clear: () => set({ user: null }),
}))
