declare namespace MainAppNPS {
    export interface RangeType {
        sMinX: number;
        sMaxX: number;
        sMaxY: number;
        sMinY: number;
    }

    export type ModeType = 'commonView' | 'commonEdit';

    export type ScaleTypeType = 'zoomIn' | 'zoomOut' | 'fit';

    export interface SettingsType {
        appId: string; // 应用ID
        mode: ModeType; // 全局模式
        tabId: string; // 当前tabID
        operation: string; // 操作模式
        range: RangeType; // 地图范围
        cache: boolean; // 是否缓存
    }

    export type BusinessOperationType =
  | 'slamInfo' // slam地图信息
  | 'bkgOperation' // 背景的操作
  | 'elementCode' // 注册码点编码的创建，返回字符串类型
  | 'cursorTypeChange' // 鼠标样式变更
  | 'selectElementFilter' // 业务过滤选择的元素
  | 'addElementCheck' // 绘制元素类型的校验
  | 'addGraphicCheck' // 绘制图形类型的校验
  | 'saveMap' // 保存地图
  | 'pointChange' // 选点
  | 'bindChange' // 绑定变化
  | 'endLoading' // 加载完毕
  | 'beginLoading' // 加载开始
  | 'changeXYPosition' // xy坐标变化
  | 'scaleChange' // 变化完毕
  | 'nextUndoRedoDate' //监听下一次的撤销重做时间
  // | 'rightMenuClick' // 选择事件
  | 'selectUnits' // 选择事件
  | 'keyDown' // 键盘事件
  | 'keyUp' // 键盘事件
  | 'loaded' // 操作完成
  | 'ready' // 业务方配置完成
  | 'notice' // 撤销重做通知
  | 'bindDirectChange' // 线绑定通知
  | 'stageSizeChange' // 舞台变更
  | 'thumbnailMode'; // 缩略图模式
}