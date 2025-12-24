import { create } from "zustand";
import { persist } from "zustand/middleware";
import useGraph from "../features/editor/views/GraphView/stores/useGraph";

export type ThemeMode = "light" | "dark" | "auto";

const initialStates = {
  darkmodeEnabled: true,
  themeMode: "auto" as ThemeMode,
  imagePreviewEnabled: true,
  liveTransformEnabled: true,
  gesturesEnabled: false,
  rulersEnabled: true,
};

export interface ConfigActions {
  toggleDarkMode: (value: boolean) => void;
  setThemeMode: (mode: ThemeMode) => void;
  toggleImagePreview: (value: boolean) => void;
  toggleLiveTransform: (value: boolean) => void;
  toggleGestures: (value: boolean) => void;
  toggleRulers: (value: boolean) => void;
}

const useConfig = create(
  persist<typeof initialStates & ConfigActions>(
    set => ({
      ...initialStates,
      toggleRulers: rulersEnabled => set({ rulersEnabled }),
      toggleGestures: gesturesEnabled => set({ gesturesEnabled }),
      toggleLiveTransform: liveTransformEnabled => set({ liveTransformEnabled }),
      toggleDarkMode: darkmodeEnabled => set({ darkmodeEnabled }),
      setThemeMode: themeMode => set({ themeMode }),
      toggleImagePreview: imagePreviewEnabled => {
        set({ imagePreviewEnabled });
        useGraph.getState().setGraph();
      },
    }),
    {
      name: "config",
    }
  )
);

export default useConfig;
