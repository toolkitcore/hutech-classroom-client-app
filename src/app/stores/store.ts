import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import UserStore from "./users/userStore";
import ClassroomStore from "./classroomStore";
import FacultyStore from "./facultyStore";
import SubjectStore from "./subjectStore";

interface Store {
    classroomStore: ClassroomStore,
    facultyStore: FacultyStore,
    subjectStore: SubjectStore,
    commonStore: CommonStore,
    userStore: UserStore
}

export const store: Store = {
    classroomStore: new ClassroomStore(),
    facultyStore: new FacultyStore(),
    subjectStore: new SubjectStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore()
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext)
}