import type { InputDevice, UIAppState } from "@excalidraw/excalidraw/types";

import { resolveInputDevice } from "../../appState";
import { useI18n } from "../../i18n";

import { emptyIcon } from "../icons";
import { useExcalidrawSetAppState } from "../App";

import DropdownMenuItemContentRadio from "./DropdownMenuItemContentRadio";

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
  return (
    <div className={className}>
      {show && (
        <DropdownMenuItemContentRadio<Exclude<InputDevice, "auto">>
          name="inputDevice"
          icon={emptyIcon}
          // `auto` isn't offered yet; the radio shows what it resolves to
          value={resolveInputDevice(appState.inputDevice)}
          onChange={(value) => {
            setAppState({
              inputDevice: value,
            });
          }}
          choices={[
            {
              value: "trackpad",
              label: t("labels.inputDeviceTrackpad"),
              ariaLabel: t("labels.inputDeviceTrackpad"),
            },
            {
              value: "mouse",
              label: t("labels.inputDeviceMouse"),
              ariaLabel: t("labels.inputDeviceMouse"),
            },
          ]}
        >
          {!footer && <p>{t("labels.inputDevice")}</p>}
        </DropdownMenuItemContentRadio>
      )}
    </div>
  );
}
