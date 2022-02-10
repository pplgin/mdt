import { IClassroomState } from './classroom';
import { IGlobalState } from './global';
import { ILessonState } from './lesson';
import { IRoomState } from './room-state';
import { IStickerState } from './sticker';
import { ISystemState } from './system';

declare interface IConnectState {
  classroom: IClassroomState;
  global: IGlobalState;
  lesson: ILessonState;
  roomState: IRoomState;
  sticker: IStickerState;
  system: ISystemState;
  user: IUserProps;
}
