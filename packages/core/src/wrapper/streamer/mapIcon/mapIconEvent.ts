import type { Player } from "core/controllers/player";
import type { TCommonCallback } from "core/types";
import { defineAsyncCallback } from "core/utils/helperUtils";
import { OnGameModeExit } from "core/wrapper/native/callbacks";
import { StreamerItemTypes } from "@infernus/streamer";
import { Streamer } from "../common";
import type { DynamicMapIcon } from "./baseMapIcon";

import { mapIconBus, mapIconHooks } from "./mapIconBus";

export class DynamicMapIconEvent<P extends Player, M extends DynamicMapIcon> {
  private readonly mapIcons = new Map<number, M>();
  private readonly players;

  constructor(playersMap: Map<number, P>, destroyOnExit = true) {
    this.players = playersMap;
    mapIconBus.on(mapIconHooks.created, (mapIcon: M) => {
      this.mapIcons.set(mapIcon.id, mapIcon);
    });
    mapIconBus.on(mapIconHooks.destroyed, (mapIcon: M) => {
      this.mapIcons.delete(mapIcon.id);
    });
    if (destroyOnExit) {
      OnGameModeExit(() => {
        this.mapIcons.forEach((c) => c.destroy());
        this.mapIcons.clear();
      });
    }
    Streamer.onItemStreamIn((type, item, player) => {
      if (type === StreamerItemTypes.MAP_ICON) {
        const mi = this.mapIcons.get(item);
        const p = this.players.get(player);
        if (mi && p) return defineAsyncCallback(this, "onStreamIn")(mi, p);
      }
      return 1;
    });
    Streamer.onItemStreamOut((type, item, player) => {
      if (type === StreamerItemTypes.MAP_ICON) {
        const mi = this.mapIcons.get(item);
        const p = this.players.get(player);
        if (mi && p) return defineAsyncCallback(this, "onStreamOut")(mi, p);
      }
      return 1;
    });
  }

  onStreamIn?(mapIcon: M, player: P): TCommonCallback;
  onStreamOut?(mapIcon: M, player: P): TCommonCallback;

  getMapIconsArr(): Array<M> {
    return [...this.mapIcons.values()];
  }

  getMapIconsMap(): Map<number, M> {
    return this.mapIcons;
  }
}
