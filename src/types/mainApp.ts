declare namespace MainAppNPS {
    export interface RangeType {
        sMinX: number;
        sMaxX: number;
        sMaxY: number;
        sMinY: number;
    }

    export type ModeType = 'commonView' | 'commonEdit';

    export interface SettingsType {
        appId: string; // 应用ID
        mode: ModeType; // 全局模式
        tabId: string; // 当前tabID
        operation: string; // 操作模式
        range: RangeType; // 地图范围
        cache: boolean; // 是否缓存
    }
}