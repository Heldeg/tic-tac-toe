import { Settings } from "../entity/Settings"
import { SettingsModel } from "../../model/SettingsModel"

export class SettingsMapper {
    static toEntity(model: SettingsModel): Settings {
        return {
            id: model.id,
            difficulty: model.difficulty,
        };
    }

    static toModel(entity: Settings): SettingsModel {
        return {
            id: entity.id,
            difficulty: entity.difficulty,
        };
    }

}