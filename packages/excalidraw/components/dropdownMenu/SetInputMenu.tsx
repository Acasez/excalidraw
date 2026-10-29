import type { UIAppState } from "@excalidraw/excalidraw/types";

import { resolveInputDevice } from "../../appState";
import { useI18n } from "../../i18n";

import { useExcalidrawSetAppState } from "../App";
import { Button } from "../Button";
import { Tooltip } from "../Tooltip";
import { mouseIcon, trackpadIcon } from "../icons";

export default function SetInputMenu({
  appState,
  className,
  show,
  footer,
}: {
  appState: UIAppState;
  className?: string;
  show: Boolean;
  footer: Boolean;
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
          {!footer && <p>{t("labels.inputDevice")}</p>}
          <Button
            onSelect={swapInputMethod}
            selected={currentDevice === "mouse"}
            className={className}
          >
            <Tooltip
              label={
                currentDevice === "trackpad"
                  ? t("labels.inputDeviceTrackpad")
                  : t("labels.inputDeviceMouse")
              }
              delay
            >
              {currentDevice === "trackpad" ? trackpadIcon : mouseIcon}
            </Tooltip>
          </Button>
        </>
      )}
    </div>
  );
}
