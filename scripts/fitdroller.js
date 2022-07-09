export default class Roller {
  /**
  * Create popup for roller
  * @return none
  */
  constructor() {
    this.moduleName = "foundryvtt-fitdroller";
  }

  async FitDRollerPopup() {

    const maxDice = game.settings.get( this.moduleName, "maxDiceCount" );
    const newInterface = game.settings.get( this.moduleName, "newInterface" );

    if( !newInterface ) {
      new Dialog( {
        title: `${ game.i18n.localize( 'FitDRoller.RollTitle' ) }`,
        content: `
          <h2>${ game.i18n.localize( 'FitDRoller.Roll' ) }</h2>
          <form>
            <div class="form-group">
              <label for="roll-purpose">${game.i18n.localize("BITD.RollPurpose")}:</label>
              <input id="roll-purpose" type="text" name="purpose">
            </div>
            <div class="form-group">
              <label>${ game.i18n.localize( 'FitDRoller.RollNumberOfDice' ) }:</label>
              <select id="dice" name="dice">
                ${ Array( maxDice + 1 ).fill().map( ( item, i ) => `<option value="${ i }">${ i }d</option>` ).join( '' ) }
              </select>
              <script>$('#dice option[value="' + game.settings.get( "foundryvtt-fitdroller", "defaultDiceCount") + '"]').prop("selected", "selected");</script>
            </div>
            <div class="form-group">
              <label>${ game.i18n.localize( 'FitDRoller.Position' ) }:</label>
              <select id="pos" name="pos">
                <option value="controlled">${ game.i18n.localize( 'FitDRoller.PositionControlled' ) }</option>
                <option value="risky">${ game.i18n.localize( 'FitDRoller.PositionRisky' ) }</option>
                <option value="desperate">${ game.i18n.localize( 'FitDRoller.PositionDesperate' ) }</option>
              </select>
              <script>$('#pos option[value="' + game.settings.get( "foundryvtt-fitdroller", "defaultPosition") + '"]').prop("selected", "selected");</script>
            </div>
            <div class="form-group">
              <label>${ game.i18n.localize( 'FitDRoller.Effect' ) }:</label>
              <select id="fx" name="fx">
                <option value="zero">${ game.i18n.localize( 'FitDRoller.EffectZero' ) }</option>
                <option value="limited">${ game.i18n.localize( 'FitDRoller.EffectLimited' ) }</option>
                <option value="standard">${ game.i18n.localize( 'FitDRoller.EffectStandard' ) }</option>
                <option value="great">${ game.i18n.localize( 'FitDRoller.EffectGreat' ) }</option>
                <option value="extreme">${ game.i18n.localize( 'FitDRoller.EffectExtreme' ) }</option>
              </select>
              <script>$('#fx option[value="' + game.settings.get("foundryvtt-fitdroller", "defaultEffect") + '"]').prop("selected", "selected");</script>
            </div>
          </form>
        `,
        buttons: {
          action: {
            icon: "<i class='fas fa-running'></i>",
            label: game.i18n.localize( 'FitDRoller.Action' ),
            callback: async( html ) => {
              const dice_amount = parseInt( html.find( '[name="dice"]' )[0].value );
              const position = html.find( '[name="pos"]' )[0].value;
              const effect = html.find( '[name="fx"]' )[0].value;
              const purpose = html.find( '[name="purpose"]' )[0].value;
              await this.FitDRoller( "", dice_amount, position, effect, purpose );
            }
          },
          fortune: {
            icon: "<i class='fas fa-coins'></i>",
            label: game.i18n.localize( 'FitDRoller.Fortune' ),
            callback: async( html ) => {
              const dice_amount = parseInt( html.find( '[name="dice"]' )[0].value );
              const purpose = html.find( '[name="purpose"]' )[0].value;
              await this.FitDRoller( "fortune", dice_amount, "", "", purpose );
            }
          },
          no: {
            icon: "<i class='fas fa-times'></i>",
            label: game.i18n.localize( 'FitDRoller.Close' ),
          },
        },
        default: "action",
      } ).render( true );
    } else {
      new Dialog( {
        title: `${ game.i18n.localize( 'FitDRoller.RollTitle' ) }`,
        content: await renderTemplate( "modules/" + this.moduleName + "/templates/roll-dialog.html", {} ),
        buttons: {},
        render: ( [ html ] ) => {
          html.addEventListener( "click", async( { target } ) => {
            const buttonValue = target.value;
            const numberOfDice = parseInt( target.closest( "form" ).querySelector( "input[name='dice']:checked" ).value );
            const purpose = target.closest( "form" ).querySelector( "input[name='purpose']" ).value
            if( target.matches( ".fortune-roll" ) ){
              await this.FitDRoller( "fortune", numberOfDice, "", "", purpose );
            }
            if( !target.matches( ".rollButton" ) ) return;

            let position;
            let effect;
            switch( buttonValue ) {
              case 'bt01':
                position = 'controlled';
                effect = 'zero';
                break;
              case 'bt02':
                position = 'controlled';
                effect = 'limited';
                break;
              case 'bt03':
                position = 'controlled';
                effect = 'standard';
                break;
              case 'bt04':
                position = 'controlled';
                effect = 'great';
                break;
              case 'bt05':
                position = 'controlled';
                effect = 'extreme';
                break;
              case 'bt06':
                position = 'risky';
                effect = 'zero';
                break;
              case 'bt07':
                position = 'risky';
                effect = 'limited';
                break;
              case 'bt08':
                position = 'risky';
                effect = 'standard';
                break;
              case 'bt09':
                position = 'risky';
                effect = 'great';
                break;
              case 'bt10':
                position = 'risky';
                effect = 'extreme';
                break;
              case 'bt11':
                position = 'desperate';
                effect = 'zero';
                break;
              case 'bt12':
                position = 'desperate';
                effect = 'limited';
                break;
              case 'bt13':
                position = 'desperate';
                effect = 'standard';
                break;
              case 'bt14':
                position = 'desperate';
                effect = 'great';
                break;
              case 'bt15':
                position = 'desperate';
                effect = 'extreme';
                break;
              default:
                console.log( "error 666!" );
            }

            await this.FitDRoller( "", numberOfDice, position, effect, purpose );
          } )
        }
      } ).render( true );
    }
  }


  /**
   * Roll Dice.
   * @param {string} attribute arbitrary label for the roll
   * @param {int} dice_amount number of dice to roll
   * @param {string} position position
   * @param {string} effect effect
   * @param {string} purpose purpose
   */
  async FitDRoller( attribute = "", dice_amount = 0, position = "risky", effect = "standard", purpose = "" ){
    let versionParts;
    if( game.version ) {
      versionParts = game.version.split( '.' );
      game.majorVersion = parseInt( versionParts[0] );
      game.minorVersion = parseInt( versionParts[1] );
    } else {
      versionParts = game.data.version.split( '.' );
      game.majorVersion = parseInt( versionParts[1] );
      game.minorVersion = parseInt( versionParts[2] );
    }

    let zeromode = false;
    if (dice_amount < 0) { dice_amount = 0; }
    if (dice_amount === 0) { zeromode = true; dice_amount = 2; }

    const r = new Roll(`${dice_amount}d6`, {});

    if (game.majorVersion > 7) {
      await r.evaluate({async: true});
    } else {
      r.roll();
    }
    return await this.showChatRollMessage( r, zeromode, attribute, position, effect, purpose );
  }

  /**
   * Shows Chat message.
   *
   * @param {Roll} r array of rolls
   * @param {Boolean} zeromode whether to treat as if 0d
   * @param {string} attribute arbitrary label for the roll
   * @param {string} position position
   * @param {string} effect effect
   * @param {string} purpose purpose
   */
  async showChatRollMessage(r, zeromode, attribute = "", position = "", effect = "", purpose = "") {
    let versionParts;
    if( game.version ) {
      versionParts = game.version.split( '.' );
      game.majorVersion = parseInt( versionParts[0] );
      game.minorVersion = parseInt( versionParts[1] );
    } else {
      versionParts = game.data.version.split( '.' );
      game.majorVersion = parseInt( versionParts[1] );
      game.minorVersion = parseInt( versionParts[2] );
    }

    const speaker = ChatMessage.getSpeaker();
    let rolls = [];

    rolls = (r.terms)[0].results;

    // Retrieve Roll status.
    let roll_status;
    if( attribute === "fortune" ) {
      roll_status = this.getFitDFortuneRollStatus( rolls, zeromode );
    } else {
      attribute = "action";
      roll_status = this.getFitDActionRollStatus( rolls, zeromode );
    }

    if( effect === "zero" ){ roll_status = "zero" }

    let color = game.settings.get("foundryvtt-fitdroller", "backgroundColor");

    let position_localize = '';
    switch (position){
      case 'controlled':
        position_localize = 'FitDRoller.PositionControlled';
        break;
      case 'desperate':
        position_localize = 'FitDRoller.PositionDesperate';
        break;
      case 'risky':
      default:
        position_localize = 'FitDRoller.PositionRisky';
    }

    let effect_localize = '';
    switch (effect)
    {
      case 'zero':
        effect_localize = 'FitDRoller.EffectZero';
        break;
      case 'limited':
        effect_localize = 'FitDRoller.EffectLimited';
        break;
      case 'great':
        effect_localize = 'FitDRoller.EffectGreat';
        break;
      case 'extreme':
        effect_localize = 'FitDRoller.EffectExtreme';
        break;
      case 'standard':
      default:
        effect_localize = 'FitDRoller.EffectStandard';
    }

    const result = await renderTemplate("modules/" + this.moduleName + "/templates/fitd-roll.html", { rolls, roll_status, attribute, position, position_localize, effect, effect_localize, zeromode, color, purpose });

    const messageData = {
      speaker,
      content: result,
      type: CONST.CHAT_MESSAGE_TYPES.ROLL,
      roll: r
    };
    if (game.majorVersion > 7) {
      return CONFIG.ChatMessage.documentClass.create(messageData, {});
    } else {
      return CONFIG.ChatMessage.entityClass.create(messageData, {});
    }
  }

  /**
   *  Get status of the Roll.
   *  - failure
   *  - partial-success
   *  - success
   *  - critical-success
   * @param {Array} rolls results of dice rolls
   * @param {Boolean} zeromode whether to treat as if 0d
   * @returns {string} success/failure status of roll
   */
  getFitDActionRollStatus(rolls, zeromode = false) {

    let sorted_rolls = [];
    // Sort roll values from lowest to highest.
    sorted_rolls = rolls.map((i) => i.result).sort();

    let roll_status = "failure";

    if (sorted_rolls[0] === 6 && zeromode){
      roll_status = "critical-success";
    } else {
      let use_die;
      let prev_use_die = false;

      if (zeromode){
        use_die = sorted_rolls[0];
      } else {
        use_die = sorted_rolls[sorted_rolls.length - 1];

        if (sorted_rolls.length - 2 >= 0){
          prev_use_die = sorted_rolls[sorted_rolls.length - 2];
        }
      }

      // 1,2,3 = failure
      if (use_die <= 3){
        roll_status = "failure";
        // if 6 - check the prev highest one.
      } else if (use_die === 6){
        // 6,6 - critical success
        if (prev_use_die && prev_use_die === 6){
          roll_status = "critical-success";
        } else {
          // 6 - success
          roll_status = "success";
        }
      } else {
        // else (4,5) = partial success
        roll_status = "partial-success";
      }
    }
    return roll_status;
  }

  getFitDFortuneRollStatus(rolls, zeromode = false) {
    let sorted_rolls = rolls.map(i => i.result).sort();
    let roll_status;
    let use_die;
    let prev_use_die;

    if (zeromode) {
      use_die = sorted_rolls[0];
    } else {
      use_die = sorted_rolls[sorted_rolls.length - 1];
      if (sorted_rolls.length - 2 >= 0) {
        prev_use_die = sorted_rolls[sorted_rolls.length - 2]
      }
    }

    // 1,2,3 = failure
    if (use_die <= 3) {
      roll_status = "zero";
    } else if (use_die === 6) {
      // 6,6 - critical success
      if (prev_use_die && prev_use_die === 6) {
        roll_status = "great";
      } else {
        roll_status = "standard";
      }
    } else {
      roll_status = "limited";
    }

    return roll_status;
  }
}