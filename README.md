# Forged in the Dark Roller

A generic dice roller for Forged in the Dark games in FoundryVTT, based on code by Megastruktur

## Usage

Use the icon at the bottom of the taskbar.
Pick your dice pool, position, and effect and roll.
There's a setting for controlling the max number of dice available in the drop down in Module Settings.

NEW!  Macro usage

You can now set up macros and skip the popup UI altogether (Thanks to Thune#3566 for this idea and the idea for the entire module!)

game.fitdroller.FitDRoller("attribute", dice, "position", "effect")

attribute = can be any string (defaults to "")
dice = total number of dice to roll
position = either controlled, risky, or desperate (defaults to risky if you enter anything else)
effect = either great, standard, or limited (defaults to standard if you enter anything else)


Based on concepts from Blades in the Dark (found at http://www.bladesinthedark.com/), product of One Seven Design, developed and authored by John Harper, and licensed for use under the Creative Commons Attribution 3.0 Unported license (http://creativecommons.org/licenses/by/3.0/).
