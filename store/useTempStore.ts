import { Thread } from "@/types/threadType";
import { create } from "zustand";

interface useTempStore {
  currentThread: Thread | null;
  setCurrentThread: (thread: Thread | null) => void;
}

const useTempStore = create<useTempStore>((set) => ({
  currentThread: null,
  setCurrentThread: (thread) => set({ currentThread: thread }),
}));

export default useTempStore;
