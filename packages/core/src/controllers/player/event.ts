/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Player } from "./entity";
import { defineEvent } from "../bus";
import { I18n } from "../i18n";
import type {
  BodyPartsEnum,
  KeysEnum,
  PlayerStateEnum,
  WeaponEnum,
} from "../../enums";
import { InvalidEnum } from "../../enums";

export const [onConnect] = defineEvent({
  name: "OnPlayerConnect",
  beforeEach(id: number) {
    const player = new Player(id);
    Player.players.set(id, player);
    return { player };
  },
});

export const [onDisconnect] = defineEvent({
  name: "OnPlayerDisconnect",
  beforeEach(id: number, reason: number) {
    const player = Player.players.get(id)!;
    return { player, reason };
  },
  afterEach({ player }) {
    Player.players.delete(player.id);
  },
});

export const [onUpdate] = defineEvent({
  name: "OnPlayerUpdate",
  beforeEach(id: number) {
    return { player: Player.getInstance(id)! };
  },
});

export const [onText] = defineEvent({
  name: "OnPlayerTextI18n",
  identifier: "iai",
  beforeEach(id: number, buffer: number[]) {
    const player = Player.getInstance(id)!;
    return { player, text: I18n.decodeFromBuf(buffer, player.charset), buffer };
  },
});

export const [onEnterExitModShop] = defineEvent({
  name: "OnPlayerEnterExitModShop",
  beforeEach(id: number, enterexit: number, interior: number) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return {
      player: Player.getInstance(id)!,
      enterExit: Boolean(enterexit),
      interior,
    };
  },
});

export const [onClickMap] = defineEvent({
  name: "OnPlayerClickMap",
  beforeEach(id: number, fX: number, fY: number, fZ: number) {
    return {
      player: Player.getInstance(id)!,
      fX,
      fY,
      fZ,
    };
  },
});

export const [onClickPlayer] = defineEvent({
  name: "OnPlayerClickPlayer",
  beforeEach(id: number, clickedId: number, source: number) {
    return {
      player: Player.getInstance(id)!,
      clickedPlayer: Player.getInstance(clickedId)!,
      source,
    };
  },
});

export const [onDeath] = defineEvent<{
  player: Player;
  killer: Player | InvalidEnum.PLAYER_ID;
  reason: number;
}>({
  name: "OnPlayerDeath",
  beforeEach(id: number, killer: number, reason: number) {
    return {
      player: Player.getInstance(id)!,
      killer: Player.getInstance(killer) || InvalidEnum.PLAYER_ID,
      reason,
    };
  },
});

export const [onGiveDamage] = defineEvent({
  name: "OnPlayerGiveDamage",
  beforeEach(
    id: number,
    damage: number,
    amount: number,
    weapon: WeaponEnum,
    bodyPart: BodyPartsEnum
  ) {
    return {
      player: Player.getInstance(id)!,
      damage: Player.getInstance(damage)!,
      amount,
      weapon,
      bodyPart,
    };
  },
});

export const [onKeyStateChange] = defineEvent({
  name: "OnPlayerKeyStateChange",
  beforeEach(id: number, newKeys: KeysEnum, oldKeys: KeysEnum) {
    return {
      player: Player.getInstance(id)!,
      newKeys,
      oldKeys,
    };
  },
});

export const [onRequestClass] = defineEvent({
  name: "OnPlayerRequestClass",
  beforeEach(id: number, classId: number) {
    return {
      player: Player.getInstance(id)!,
      classId,
    };
  },
});

export const [onRequestSpawn] = defineEvent({
  name: "OnPlayerRequestSpawn",
  beforeEach(id: number) {
    return { player: Player.getInstance(id)! };
  },
});

export const [onSpawn] = defineEvent({
  name: "OnPlayerSpawn",
  beforeEach(id: number) {
    return { player: Player.getInstance(id)! };
  },
});

export const [onStateChange] = defineEvent({
  name: "OnPlayerStateChange",
  beforeEach(id: number, newState: PlayerStateEnum, oldState: PlayerStateEnum) {
    return { player: Player.getInstance(id)!, newState, oldState };
  },
});

export const [onStreamIn] = defineEvent({
  name: "OnPlayerSteamIn",
  beforeEach(id: number, forPlayer: number) {
    return {
      player: Player.getInstance(id)!,
      forPlayer: Player.getInstance(forPlayer),
    };
  },
});

export const [onStreamOut] = defineEvent({
  name: "OnPlayerSteamOut",
  beforeEach(id: number, forPlayer: number) {
    return {
      player: Player.getInstance(id)!,
      forPlayer: Player.getInstance(forPlayer),
    };
  },
});

export const [onTakeDamage] = defineEvent<{
  player: Player;
  damage: Player | InvalidEnum.PLAYER_ID;
  amount: number;
  weapon: WeaponEnum;
  bodyPart: BodyPartsEnum;
}>({
  name: "OnPlayerTakeDamage",
  beforeEach(
    id: number,
    damage: number | InvalidEnum.PLAYER_ID,
    amount: number,
    weapon: WeaponEnum,
    bodyPart: BodyPartsEnum
  ) {
    return {
      player: Player.getInstance(id)!,
      damage: Player.getInstance(damage) || InvalidEnum.PLAYER_ID,
      amount,
      weapon,
      bodyPart,
    };
  },
});

export const [onInteriorChange] = defineEvent({
  name: "OnPlayerInteriorChange",
  beforeEach(id: number, newInteriorId: number, oldInteriorId: number) {
    return {
      player: Player.getInstance(id)!,
      newInteriorId,
      oldInteriorId,
    };
  },
});

export const [onRequestDownload] = defineEvent({
  name: "OnPlayerRequestDownload",
  beforeEach(id: number, type: number, crc: number) {
    return {
      player: Player.getInstance(id)!,
      type,
      crc,
    };
  },
});

export const [onFinishedDownloading] = defineEvent({
  name: "OnPlayerFinishedDownloading",
  beforeEach(id: number, virtualWorld: number) {
    return {
      player: Player.getInstance(id)!,
      virtualWorld,
    };
  },
});
