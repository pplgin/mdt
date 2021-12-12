/**
 * 上课课件 PPT课件信息(图片、doc等)
 */
declare interface IPPTInfo {
  currentPage: number;
  lesHash: string;
  docContents: string[] | number[];
  name: string;
  id: number | string;
  docId: number | string;
  ratio: number;
  docType: string;
  coursewareType: number;
}

/**
 *zml or zmg
 *
 * @interface IPPTInfoExt
 */
declare interface IPPTInfoExt extends IPPTInfo {
  coursewareType: number;
  versionCode?: string;
  autoLoad?: boolean;
  sourceType?: string;
}
