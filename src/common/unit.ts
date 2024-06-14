/**控件类型 */
export const UnitTypeEnum = {
    texts: 'texts',
    elements: 'elements',
    lines: 'lines',
    arcs: 'arcs',
    rects: 'rects',
    circles: 'circles',
    polygons: 'polygons',
    images: 'images',
};

export type UnitType = keyof typeof UnitTypeEnum;