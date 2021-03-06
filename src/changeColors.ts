import * as vscode from 'vscode';
import getSettings from './getSettings';

type ColorCustomization = { [key: string]: string | undefined };

export default async (color?: string) => {
    const settings = vscode.workspace.getConfiguration('workbench');
    const currentColorCustomization: ColorCustomization = settings.get('colorCustomizations') || {};
    const extensionSettings = getSettings();

    const tabBarBorderColor = (extensionSettings.tabBorder !== false) ? color : undefined;
    const titleBarBackgroundColor = extensionSettings.titleBackground ? color : undefined;

    let colorCustomization: ColorCustomization = { ...currentColorCustomization, 'tab.activeBorder': tabBarBorderColor, 'titleBar.activeBackground': titleBarBackgroundColor };

    settings.update('colorCustomizations', colorCustomization, vscode.ConfigurationTarget.Workspace);
}