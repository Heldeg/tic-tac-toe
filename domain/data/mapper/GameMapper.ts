import { Game } from "../entity/Game"
import { GameModel } from "../../model/GameModel"


export class GameMapper {
    static toEntity(model: GameModel): Game {
        return {
            id: model.id,
            playerX: model.playerX,
            playerO: model.playerO,
            numMoves: model.numMoves,
        };
    }

    static toModel(entity: Game): GameModel {
        return {
            id: entity.id,
            playerX: entity.playerX,
            playerO: entity.playerO,
            numMoves: entity.numMoves,
        };
    }

}