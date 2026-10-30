import {
  actionToggleArrowBinding,
  actionToggleGridMode,
  actionToggleMidpointSnapping,
  actionToggleObjectsSnapMode,
  actionToggleShowHints,
  actionToggleStats,
  actionToggleZenMode,
} from "../../actions";

import { Tooltip } from "../Tooltip";

import { actionToggleViewMode } from "../../actions/actionToggleViewMode";
import { resolveInputDevice } from "../../appState";

import { getShortcutFromShortcutName } from "../../actions/shortcuts";
import { useUIAppState } from "../../context/ui-appState";
import { useI18n } from "../../i18n";
import {
  useExcalidrawSetAppState,
  useExcalidrawActionManager,
  useApp,
} from "../App";

import DropdownMenuItemCheckbox from "../dropdownMenu/DropdownMenuItemCheckbox";
import DropdownMenuItemContentRadio from "../dropdownMenu/DropdownMenuItemContentRadio";

import DropdownMenu from "../dropdownMenu/DropdownMenu";
import { settingsIcon, emptyIcon } from "../icons";

import "./DefaultItems.scss";

import type { ActionManager } from "../../actions/manager.tsx";

import type { InputDevice } from "../../types";

const PreferencesToggleToolLockItem = () => {
  const { t } = useI18n();
  const app = useApp();
  const appState = useUIAppState();

  return (
    <DropdownMenuItemCheckbox
      checked={appState.activeTool.locked}
      shortcut={getShortcutFromShortcutName("toolLock")}
      onSelect={(event) => {
        app.toggleLock();
        event.preventDefault();
      }}
    >
      {t("labels.preferences_toolLock")}
    </DropdownMenuItemCheckbox>
  );
};

const PreferencesBoxSelectionModeItem = () => {
  const { t } = useI18n();
  const appState = useUIAppState();
  const setAppState = useExcalidrawSetAppState();

  return (
    <DropdownMenuItemContentRadio<"contain" | "overlap">
      name="boxSelectionMode"
      icon={emptyIcon}
      value={appState.boxSelectionMode}
      onChange={(value) => {
        setAppState({
          boxSelectionMode: value,
        });
      }}
      choices={[
        {
          value: "contain",
          label: t("labels.boxSelectionContain"),
          ariaLabel: t("labels.boxSelectionContain"),
        },
        {
          value: "overlap",
          label: t("labels.boxSelectionOverlap"),
          ariaLabel: t("labels.boxSelectionOverlap"),
        },
      ]}
    >
      {t("labels.boxSelectionMode")}
    </DropdownMenuItemContentRadio>
  );
};

const PreferencesInputDeviceItem = () => {
  const { t } = useI18n();
  const appState = useUIAppState();
  const setAppState = useExcalidrawSetAppState();

  return (
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
  );
};

const PreferencesToggleSnapModeItem = () => {
  const { t } = useI18n();
  const actionManager = useExcalidrawActionManager();
  const appState = useUIAppState();
  return (
    <DropdownMenuItemCheckbox
      checked={appState.objectsSnapModeEnabled}
      shortcut={getShortcutFromShortcutName("objectsSnapMode")}
      onSelect={(event) => {
        actionManager.executeAction(actionToggleObjectsSnapMode);
        event.preventDefault();
      }}
    >
      {t("buttons.objectsSnapMode")}
    </DropdownMenuItemCheckbox>
  );
};

const PreferencesToggleArrowBindingItem = () => {
  const { t } = useI18n();
  const actionManager = useExcalidrawActionManager();
  const appState = useUIAppState();
  return (
    <DropdownMenuItemCheckbox
      checked={appState.bindingPreference === "enabled"}
      onSelect={(event) => {
        actionManager.executeAction(actionToggleArrowBinding);
        event.preventDefault();
      }}
    >
      {t("labels.arrowBinding")}
    </DropdownMenuItemCheckbox>
  );
};

const PreferencesToggleMidpointSnappingItem = () => {
  const { t } = useI18n();
  const actionManager = useExcalidrawActionManager();
  const appState = useUIAppState();
  return (
    <DropdownMenuItemCheckbox
      checked={appState.isMidpointSnappingEnabled}
      onSelect={(event) => {
        actionManager.executeAction(actionToggleMidpointSnapping);
        event.preventDefault();
      }}
    >
      {t("labels.midpointSnapping")}
    </DropdownMenuItemCheckbox>
  );
};

const PreferencesToggleShowHintsItem = () => {
  const { t } = useI18n();
  const actionManager = useExcalidrawActionManager();
  const appState = useUIAppState();
  return (
    <DropdownMenuItemCheckbox
      checked={appState.showHints}
      onSelect={(event) => {
        actionManager.executeAction(actionToggleShowHints);
        event.preventDefault();
      }}
    >
      {t("labels.showHints")}
    </DropdownMenuItemCheckbox>
  );
};

const PreferencesToggleGridModeItem = () => {
  const { t } = useI18n();
  const actionManager = useExcalidrawActionManager();
  const appState = useUIAppState();

  return (
    <DropdownMenuItemCheckbox
      checked={appState.gridModeEnabled}
      shortcut={getShortcutFromShortcutName("gridMode")}
      onSelect={(event) => {
        actionManager.executeAction(actionToggleGridMode);
        event.preventDefault();
      }}
    >
      {t("labels.toggleGrid")}
    </DropdownMenuItemCheckbox>
  );
};

const PreferencesToggleZenModeItem = () => {
  const { t } = useI18n();
  const actionManager = useExcalidrawActionManager();
  const appState = useUIAppState();
  return (
    <DropdownMenuItemCheckbox
      checked={appState.zenModeEnabled}
      shortcut={getShortcutFromShortcutName("zenMode")}
      onSelect={(event) => {
        actionManager.executeAction(actionToggleZenMode);
        event.preventDefault();
      }}
    >
      {t("buttons.zenMode")}
    </DropdownMenuItemCheckbox>
  );
};

const PreferencesToggleViewModeItem = () => {
  const { t } = useI18n();
  const actionManager = useExcalidrawActionManager();
  const appState = useUIAppState();
  if (!actionManager.isActionEnabled(actionToggleViewMode)) {
    return null;
  }
  return (
    <DropdownMenuItemCheckbox
      checked={appState.viewModeEnabled}
      shortcut={getShortcutFromShortcutName("viewMode")}
      onSelect={(event) => {
        actionManager.executeAction(actionToggleViewMode);
        event.preventDefault();
      }}
    >
      {t("labels.viewMode")}
    </DropdownMenuItemCheckbox>
  );
};

const PreferencesToggleElementPropertiesItem = () => {
  const { t } = useI18n();
  const actionManager = useExcalidrawActionManager();
  const appState = useUIAppState();
  return (
    <DropdownMenuItemCheckbox
      checked={appState.stats.open}
      shortcut={getShortcutFromShortcutName("stats")}
      onSelect={(event) => {
        actionManager.executeAction(actionToggleStats);
        event.preventDefault();
      }}
    >
      {t("stats.fullTitle")}
    </DropdownMenuItemCheckbox>
  );
};

export default function Preferences({
  children,
  additionalItems,
  className,
  renderAction,
}: {
  children?: React.ReactNode;
  additionalItems?: React.ReactNode;
  className?: string;
  renderAction: ActionManager["renderAction"];
}) {
  const appState = useUIAppState();
  const setAppState = useExcalidrawSetAppState();
  const { t } = useI18n();
  return (
    <div className={className}>
      <Tooltip label={t("labels.preferences")} delay>
        {renderAction("undo")}
      </Tooltip>
      <DropdownMenu open={appState.openPreferences === "canvas"}>
        <DropdownMenu.Trigger
          // onToggle={() => {
          //   setIsExtraToolsMenuOpen(!isExtraToolsMenuOpen);
          // }}
          onToggle={() => {
            setAppState({
              openPreferences:
                appState.openPreferences === "canvas" ? null : "canvas",
              openPopup: null,
              openDialog: null,
            });
          }}
          // data-testid="main-menu-trigger"
          // className="main-menu-trigger"
        >
          {settingsIcon}
          {/* {t("labels.preferences")} */}
        </DropdownMenu.Trigger>
        <DropdownMenu.Content
          className="excalidraw-main-menu-preferences-submenu"
          onClickOutside={() => setAppState({ openPreferences: null })}
        >
          {children || (
            <>
              <PreferencesBoxSelectionModeItem />
              <PreferencesInputDeviceItem />
              <PreferencesToggleToolLockItem />
              <PreferencesToggleSnapModeItem />
              <PreferencesToggleGridModeItem />
              <PreferencesToggleZenModeItem />
              <PreferencesToggleViewModeItem />
              <PreferencesToggleElementPropertiesItem />
              <PreferencesToggleArrowBindingItem />
              <PreferencesToggleMidpointSnappingItem />
              <PreferencesToggleShowHintsItem />
            </>
          )}
          {additionalItems}
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  );
}
