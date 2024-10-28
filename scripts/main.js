import Roller from "./fitdroller.js";
const moduleName = "foundryvtt-fitdroller";

Hooks.once("ready", () => {

});

Hooks.on("getSceneControlButtons", ( controls ) => {
  if( game.release.generation >= 13 ){
    controls.tokens.tools.fitdroller = {
      name: "fitdroller",
      title: "FitDRoller.RollTitleShort",
      icon: "rollerSvg",
      button: true,
      onChange: async() => {
        await game.fitdroller.FitDRollerPopup();
      }
    };
  } else {
    const tokenControlsIndex = controls.findIndex( c => c.name === "token" );
    controls[tokenControlsIndex].tools.push( {
      name: "roller",
      title: "FitDRoller.RollTitleShort",
      icon: "rollerSvg",
      button: true,
      onClick: async() => {
        await game.fitdroller.FitDRollerPopup();
      }
    });
  }
});

Hooks.once("init", () => {

  // "N Times" loop for handlebars.
  //  Block is executed N times starting from n=0.
  //
  // Usage:
  // {{#times_from_0 10}}
  //   <span>{{this}}</span>
  // {{/times_from_0}}
  Handlebars.registerHelper('times_from_0', function(n, block) {

    let accum = '';
    for (let i = 0; i <= n; ++i) {
      accum += block.fn(i);
    }
    return accum;
  });

  game.settings.register( moduleName, "backgroundColor", {
    "name": game.i18n.localize("FitDRoller.backgroundColorName"),
    "hint": game.i18n.localize("FitDRoller.backgroundColorHint"),
    "scope": "world",
    "config": true,
    "choices": {
      "gray": game.i18n.localize("FitDRoller.backgroundColorGray"),
      "black": game.i18n.localize("FitDRoller.backgroundColorBlack")
    },
    "default": "gray",
    "type": String
  });

  game.settings.register( moduleName, "useExtreme", {
    "name": game.i18n.localize("FitDRoller.useExtremeName"),
    "hint": game.i18n.localize("FitDRoller.useExtremeHint"),
    "scope": "world",
    "config": true,
    "type": Boolean,
    "default": true,
    "requiresReload": true,
    "onChange": function(){ game.fitdroller = new Roller(); }
  });

  game.settings.register( moduleName, "maxDiceCount", {
    "name": game.i18n.localize("FitDRoller.maxDiceCountName"),
    "hint": game.i18n.localize("FitDRoller.maxDiceCountHint"),
    "scope": "world",
    "config": true,
    "default": 6,
    "type": Number,
    "range": {
      "min": 1,
      "max": 10,
      "step": 1
    },
    "requiresReload": true,
    "onChange": function(){ game.fitdroller = new Roller(); }
  });

  game.settings.register( moduleName, "defaultDiceCount", {
    "name": game.i18n.localize("FitDRoller.defaultDiceCountName"),
    "hint": game.i18n.localize("FitDRoller.defaultDiceCountHint"),
    "scope": "world",
    "config": true,
    "default": 2,
    "type": Number,
    "range": {
      "min": 0,
      "max": 10,
      "step": 1
    },
    "requiresReload": true,
    "onChange": function(){ game.fitdroller = new Roller(); }
  });

  game.settings.register( moduleName, "defaultPosition", {
    "name": game.i18n.localize("FitDRoller.defaultPositionName"),
    "hint": game.i18n.localize("FitDRoller.defaultPositionHint"),
    "scope": "world",
    "config": true,
    "type": String,
    "choices": {
      "controlled": game.i18n.localize("FitDRoller.PositionControlled"),
      "risky": game.i18n.localize("FitDRoller.PositionRisky"),
      "desperate": game.i18n.localize("FitDRoller.PositionDesperate")
    },
    "default": "risky",
    "requiresReload": true,
    "onChange": function(){ game.fitdroller = new Roller(); }
  });

  game.settings.register( moduleName, "defaultEffect", {
    "name": game.i18n.localize( "FitDRoller.defaultEffectName" ),
    "hint": game.i18n.localize( "FitDRoller.defaultEffectHint" ),
    "scope": "world",
    "config": true,
    "type": String,
    "choices": {
      "extreme": game.i18n.localize( "FitDRoller.EffectExtreme" ),
      "great": game.i18n.localize( "FitDRoller.EffectGreat" ),
      "standard": game.i18n.localize( "FitDRoller.EffectStandard" ),
      "limited": game.i18n.localize( "FitDRoller.EffectLimited" ),
      "zero": game.i18n.localize( "FitDRoller.EffectZero" ),
    },
    "default": "standard",
    "requiresReload": true,
    "onChange": function() {
      game.fitdroller = new Roller();
    }
  });

  game.settings.register( moduleName, "newInterface", {
    "name": game.i18n.localize("FitDRoller.newInterface"),
    "hint": game.i18n.localize("FitDRoller.newInterfaceHint"),
    "scope": "client",
    "config": true,
    "default": true,
    "type": Boolean
  });

  game.settings.registerMenu( moduleName, "customMessagesMenu", {
    name: "FitDRoller.customMessagesMenu",
    label: "FitDRoller.customMessagesButton",
    hint: "FitDRoller.customMessagesHint",
    icon: "fas fa-envelope-open-text",
    type: CustomMessagesConfig,
    restricted: true
  });

  game.settings.register( moduleName, "customMessages", {
    "name": "Custom Messages",
    "scope": "world",
    "config": false,
    "default": {},
    "type": Object
  });

  game.keybindings.register( moduleName, "FitDRollerShortcut", {
    name: game.i18n.localize("FitDRoller.FitDRollerShortcutName"),
    hint: game.i18n.localize("FitDRoller.FitDRollerShortcutHint"),
    editable: [{ key: "KeyR", modifiers: []}],
    onDown: async () => {
      await game.fitdroller.FitDRollerPopup();
    },
    onUp: () => {},
    restricted: false,
    reservedModifiers: [],
    precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
  });

  game.fitdroller = new Roller();
  game.fitdroller.defaultPosition = game.settings.get( moduleName, "defaultPosition");
  game.fitdroller.defaultEffect = game.settings.get( moduleName, "defaultEffect");
  game.fitdroller.maxDice = game.settings.get( moduleName, "maxDiceCount" );
  // prevent # of default dice from exceeding # of max dice
  let dDice = game.settings.get( moduleName, "defaultDiceCount");
  game.fitdroller.defaultDice = dDice > game.fitdroller.maxDice ? game.fitdroller.maxDice : dDice;
  game.fitdroller.useExtreme = game.settings.get( moduleName, "useExtreme" );
});


class CustomMessagesConfig extends FormApplication {

  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      title: game.i18n.localize("FitDRoller.customMessagesMenu"),
      id: "custom-messages-config",
      classes: ["fitdroller", "custom-messages-config"],
      template: "modules/foundryvtt-fitdroller/templates/message-dialog.html",
      width: 660,
      height: "auto",
      resizable: true,
      closeOnSubmit: true
    });
  }

  /* -------------------------------------------- */

  /** @override */
  async getData(options) {
    return game.settings.get( moduleName, "customMessages" );
  }

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    html.find('button[name="reset"]').click(this._onResetDefaults.bind(this));
  }

  /* -------------------------------------------- */

  /**
   * Handle button click to reset default settings
   * @param event {Event}   The initial button click event
   * @private
   */
  async _onResetDefaults(event) {
    event.preventDefault();
    const confirm = await Dialog.confirm({
      title: game.i18n.localize("FitDRoller.ResetDefaults"),
      content: `<p>${game.i18n.localize("FitDRoller.ResetDefaultsWarning")}</p>`
    });
    if ( !confirm ) return;
    await game.settings.set( moduleName, "customMessages", {});
    ui.notifications.info(game.i18n.localize('FitDRoller.ResetDefaultsDone'));
    return this.render();
  }

  /* -------------------------------------------- */

  /** @override */
  async _updateObject(event, formData) {
    const customMessages = foundry.utils.expandObject(formData);
    await game.settings.set(moduleName, "customMessages", customMessages);
  }
}

console.log("FitDRoller | Forged in the Dark Dice Roller loaded");
