// Import Modules
import { FitDRollerPopup } from "./module/fitd-roll.js";


// getSceneControlButtons
Hooks.on("renderSceneControls", async (app, html) =>
{
  const dice_roller = $('<li class="scene-control" title="FitD Roller"><i class="fas fa-dice"></i></li>');
  dice_roller.click(() =>
  {
    FitDRollerPopup();
  });
  html.append(dice_roller);
});

Hooks.once("init", () =>
{
	game.settings.register("foundryvtt-fitdroller", "maxDiceCount", {
		"name": game.i18n.localize("FitDRoller.maxDiceCountName"),
		"hint": game.i18n.localize("FitDRoller.maxDiceCountHint"),
		"scope": "world",
		"config": true,
		"default": 10,
		"type": Number
	});
});


console.log("FitDRoller | Forged in the Dark Dice Roller loaded");
