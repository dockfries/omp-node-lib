import type { TCommonCallback } from "core/types";
import { OnClientMessage, defineAsyncCallback } from "core/utils/helperUtils";
import {
  OnNpcConnect,
  OnNpcDisconnect,
  OnNPCModeExit,
  OnNPCModeInit,
  OnNPCSpawn,
} from "core/wrapper/native/callbacks";

export class NpcEvent {
  constructor() {
    OnNpcConnect(defineAsyncCallback(this, "onConnect"));
    OnNpcDisconnect(defineAsyncCallback(this, "onDisconnect"));
    OnNPCModeInit(defineAsyncCallback(this, "onModeInit"));
    OnNPCModeExit(defineAsyncCallback(this, "onModeExit"));
    OnNPCSpawn(defineAsyncCallback(this, "onSpawn"));
    OnClientMessage(defineAsyncCallback(this, "onClientMessage"));
  }
  onConnect?(myplayerid: number): TCommonCallback;
  onDisconnect?(reason: string): TCommonCallback;
  onModeInit?(): TCommonCallback;
  onModeExit?(): TCommonCallback;
  onSpawn?(): TCommonCallback;
  onClientMessage?(colour: number, text: string): TCommonCallback;
}
