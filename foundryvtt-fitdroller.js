// Import Modules
import { FitDRoller } from "./module/fitd-roll.js";


// getSceneControlButtons
Hooks.on("renderSceneControls", async (app, html) =>
{
  const dice_roller = $('<li class="scene-control" title="Dice Roll"><i class="fas fa-dice"></i></li>');
  dice_roller.click(() =>
  {
    FitDRoller();
  });
  html.append(dice_roller);
});

Hooks.once("init", () =>
{
	game.settings.register("FitDRoller", "maxDiceCount", {
		"name": game.i18n.localize("FiTDRoller.maxDiceCountName"),
		"hint": game.i18n.localize("FitDRoller.maxDiceCountHint"),
		"scope": "world",
		"config": true,
		"default": 10,
		"type": Number
	});
});


console.log("FitDRoller | Forged in the Dark Dice Roller loaded");
