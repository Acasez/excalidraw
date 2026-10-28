import clsx from "clsx";

import { actionShortcuts } from "../../actions";
import { useTunnels } from "../../context/tunnels";
import { ExitZenModeButton, UndoRedoActions, ZoomActions } from "../Actions";
import { useApp, useExcalidrawSetAppState } from "../App";
import { HelpButton } from "../HelpButton";
import { Section } from "../Section";
import Stack from "../Stack";

import type { ActionManager } from "../../actions/manager";
import type { InputDevice, UIAppState } from "../../types";
import DropdownMenuItemContentRadio from "../dropdownMenu/DropdownMenuItemContentRadio";
import { resolveInputDevice } from "@excalidraw/excalidraw/appState";
import { t } from "@excalidraw/excalidraw/i18n";
import { emptyIcon } from "../icons";

const Footer = ({
  appState,
  actionManager,
  showExitZenModeBtn,
  renderWelcomeScreen,
  defaultUIEnabled,
  zoomUIEnabled,
}: {
  appState: UIAppState;
  actionManager: ActionManager;
  showExitZenModeBtn: boolean;
  renderWelcomeScreen: boolean;
  defaultUIEnabled: boolean;
  zoomUIEnabled: boolean;
}) => {
  const { FooterCenterTunnel, WelcomeScreenHelpHintTunnel } = useTunnels();
  const app = useApp();
  const setAppState = useExcalidrawSetAppState();

  return (
    <footer
      role="contentinfo"
      className="layer-ui__wrapper__footer App-menu App-menu_bottom"
    >
      {/* footer-left is not faded out in zen mode: it holds the zoom controls,
          which stay visible (chrome-less). Its children opt in individually. */}
      {(defaultUIEnabled || (zoomUIEnabled && app.isNavigationEnabled())) && (
        <div className="layer-ui__wrapper__footer-left zen-mode-transition">
          <Stack.Col gap={2}>
            <Section heading="canvasActions">
              {zoomUIEnabled && app.isNavigationEnabled() && (
                <ZoomActions renderAction={actionManager.renderAction} />
              )}

              {defaultUIEnabled && !appState.viewModeEnabled && (
                <UndoRedoActions
                  renderAction={actionManager.renderAction}
                  className={clsx("zen-mode-transition", {
                    "layer-ui__wrapper__footer-left--transition-bottom":
                      appState.zenModeEnabled,
                  })}
                />
              )}
              {defaultUIEnabled && !appState.viewModeEnabled && (
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
                  {t("labels.inputDevice")}
                </DropdownMenuItemContentRadio>
              )}
            </Section>
          </Stack.Col>
        </div>
      )}
      <FooterCenterTunnel.Out />
      {(defaultUIEnabled || renderWelcomeScreen) && (
        <div
          className={clsx(
            "layer-ui__wrapper__footer-right zen-mode-transition",
            {
              "transition-right": appState.zenModeEnabled,
            },
          )}
        >
          <div style={{ position: "relative" }}>
            {renderWelcomeScreen && <WelcomeScreenHelpHintTunnel.Out />}
            {defaultUIEnabled && (
              <HelpButton
                onClick={() => actionManager.executeAction(actionShortcuts)}
              />
            )}
          </div>
        </div>
      )}
      {defaultUIEnabled && (
        <ExitZenModeButton
          actionManager={actionManager}
          showExitZenModeBtn={showExitZenModeBtn}
        />
      )}
    </footer>
  );
};

export default Footer;
Footer.displayName = "Footer";
