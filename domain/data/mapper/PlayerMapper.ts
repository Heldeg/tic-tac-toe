import { Player } from "../entity/Player"

import { PlayerModel } from "../../model/PlayerModel"


export class PlayerMapper {
    static toEntity(model: PlayerModel): Player {
        return {
            id: model.id,
            name: model.name,
        };
    }

    static toModel(entity: Player): PlayerModel {
        return {
            id: entity.id,
            name: entity.name,
        };
    }
}