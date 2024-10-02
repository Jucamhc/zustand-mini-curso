import { create, StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
//import { firebaseStorage } from '../storages/firebase.storage'
import { logger } from '../middlewares/loger.middleware'

interface PersonState {
  firstName: string
  lastName: string
}

interface Actions {
  setFirstName: (firstName: string) => void
  setLastName: (lastName: string) => void
}

const storeAPI: StateCreator<
  PersonState & Actions,
  [['zustand/devtools', never]]
> = (set) => ({
  firstName: '',
  lastName: '',

  setFirstName: (firstName: string) =>
    set({ firstName }, false, 'setFirstName'),
  setLastName: (lastName: string) => set({ lastName }, false, 'setLastName'),
})

export const usePersonStore = create<PersonState & Actions>()(
  logger(
    devtools(
      persist(storeAPI, {
        name: 'person-storage',
       // storage: firebaseStorage,
      })
    )
  )
)
