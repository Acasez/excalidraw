import type { UIAppState } from "@excalidraw/excalidraw/types";

import { resolveInputDevice } from "../../appState";
import { useI18n } from "../../i18n";

import { useExcalidrawSetAppState } from "../App";
import { Tooltip } from "../Tooltip";
import { mouseIcon, trackpadIcon } from "../icons";
import { IconButton } from "../IconButton";

export default function SetInputMenu({
  appState,
  className,
  show,
}: {
  appState: UIAppState;
  className?: string;
  show: Boolean;
}) {
  const setAppState = useExcalidrawSetAppState();
  const { t } = useI18n();

  const currentDevice = resolveInputDevice(appState.inputDevice);
  const swapInputMethod = () => {
    setAppState({
      inputDevice: currentDevice === "trackpad" ? "mouse" : "trackpad",
    });
  };

  return (
    <div className={className}>
      {show && (
        <>
          <Tooltip
            children={
              <IconButton
                type="button"
                icon={currentDevice === "trackpad" ? trackpadIcon : mouseIcon}
                onClick={swapInputMethod}
                aria-label={
                  currentDevice === "trackpad"
                    ? t("labels.inputDeviceTrackpad")
                    : t("labels.inputDeviceMouse")
                }
              />
            }
            label={
              currentDevice === "trackpad"
                ? t("labels.inputDeviceTrackpad")
                : t("labels.inputDeviceMouse")
            }
          ></Tooltip>
        </>
      )}
    </div>
  );
}
