/**
 * 设置管理工具
 * 负责读取和更新网站设置
 */

import fs from 'fs';
import path from 'path';
import type { Settings } from '@/types/content';

const settingsPath = path.join(process.cwd(), 'content/settings.json');

/**
 * 加载网站设置
 * @returns Settings 对象
 */
export function loadSettings(): Settings {
  const fileContents = fs.readFileSync(settingsPath, 'utf8');
  return JSON.parse(fileContents) as Settings;
}

/**
 * 更新网站设置
 * @param settings 新的设置对象
 */
export function updateSettings(settings: Settings): void {
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), 'utf8');
}

/**
 * 切换私密模式
 * @returns 新的私密模式状态
 */
export function togglePrivateMode(): boolean {
  const settings = loadSettings();
  settings.privateMode = !settings.privateMode;
  updateSettings(settings);
  return settings.privateMode;
}
