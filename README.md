# Forged in the Dark Roller

A generic dice roller for Forged in the Dark games in FoundryVTT, based on code by Megastruktur

## Usage

Use the icon at the bottom of the taskbar.<br>
Pick your dice pool, position, and effect and roll.<br>
There are module settings for controlling:<br>
the max number of dice<br>
the default number of dice initially selected<br>
the default position initially selected<br>
the default effect initially selected<br>

NEW!  Macro usage

You can now set up macros and skip the popup UI altogether (Thanks to Thune#3566 for this idea and the idea for the entire module!)<br>

game.fitdroller.FitDRoller("attribute", dice, "position", "effect")<br>

attribute = can be any string (defaults to "")<br>
dice = total number of dice to roll (defaults to 0)<br>
position = either controlled, risky, or desperate (defaults to risky if you enter anything else)<br>
effect = either great, standard, or limited (defaults to standard if you enter anything else)<br>


Based on concepts from Blades in the Dark (found at http://www.bladesinthedark.com/), product of One Seven Design, developed and authored by John Harper, and licensed for use under the Creative Commons Attribution 3.0 Unported license (http://creativecommons.org/licenses/by/3.0/).
