  const ATTACK_VALUE = 10;
  const MONSTER_ATTACK_VALUE = 14;
  const STRONG_ATTACK_VALUE = 17;
  const HEAL_VALUE = 20;
  const MODE_ATTACK = 'ATTACK';
  const MODE_STRONG_ATTACK = 'STRONG ATTACK';
  const LOG_EVENT_PLAYER_ATTACK = 'Player attack';
  const LOG_EVENT_PLAYER_STRONG_ATTACK = 'Player strong attack';
  const LOG_EVENT_MONSTER_ATTACK = '  Monster attack';
  const LOG_EVENT_PLAYER_HEAL = 'Player heal';
  const LOG_EVENT_GAME_OVER = 'Game over';
  const defaultHealth = 500;
  let forFlexibility = true;
  let battleLog = [];
  function getMaxLivesValues() {
    let enteredValue = prompt(
      'Type in your and the monsters maximum life  ♥',
      defaultHealth
    );
    const parsedValueOfEnteredValue = parseInt(enteredValue);
    if (isNaN(parsedValueOfEnteredValue) || parsedValueOfEnteredValue <= 0) {
      throw {
        alert:
          'The chosen max life is not a valid input, pleaseType in a number to get a desired game!!',
      };
    }
    return parsedValueOfEnteredValue;
  }
  let chosenMaxLife;
  try {
    chosenMaxLife = getMaxLivesValues();
  } catch (error) {
    console.log(error);
    chosenMaxLife = defaultHealth;
    alert(
      `You had entered a wrong value so the health has been set to the default health which is: ${defaultHealth}`
    );
  }
  let hasBonusLife = true;
  let currentMonsterHealth = chosenMaxLife;
  let currentPlayerHealth = chosenMaxLife;
  function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
  }
  function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeToLog(
      LOG_EVENT_MONSTER_ATTACK,
      parseInt(playerDamage),
      parseInt(currentMonsterHealth),
      parseInt(currentPlayerHealth)
    );
    if (currentPlayerHealth <= 0 && hasBonusLife) {
      hasBonusLife = false;
      removeBonusLife();
      currentPlayerHealth = initialPlayerHealth;
      setPlayerHealth(initialPlayerHealth);
      alert(
        "Your bonus life has saved you from death (even if you didn't want to)"
      );
    }
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
      alert('You won!!!');
      writeToLog(
        LOG_EVENT_GAME_OVER,
        'Player won!!',
        parseInt(currentMonsterHealth),
        parseInt(currentPlayerHealth)
      );
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
      alert('You lost!!');
      writeToLog(
        LOG_EVENT_GAME_OVER,
        'Monster won!!',
        parseInt(currentMonsterHealth),
        parseInt(currentPlayerHealth)
      );
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
      alert(' You have a draw!!');
      writeToLog(
        LOG_EVENT_GAME_OVER,
        'A Draw!!',
        parseInt(currentMonsterHealth),
        parseInt(currentPlayerHealth)
      );
    }
    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
      reset();
    }
  }
  function attackType(mode) {
    const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
    const logAttackType =
      mode === MODE_ATTACK
        ? LOG_EVENT_PLAYER_ATTACK
        : LOG_EVENT_PLAYER_STRONG_ATTACK;
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    endRound();
    writeToLog(
      logAttackType,
      parseInt(damage),
      parseInt(currentMonsterHealth),
      parseInt(currentPlayerHealth)
    );
  }
  function attackHandler() {
    attackType(MODE_ATTACK);
  }
  function strongAttackHandler() {
    attackType(MODE_STRONG_ATTACK);
  }
  function healPlayerHandler() {
    let healValue;
    if (currentPlayerHealth >= chosenMaxLife - currentPlayerHealth / 5) {
      alert(`You can't heal more than the max life you chose !!!!!`);
      healValue = chosenMaxLife - currentPlayerHealth;
    } else {
      healValue = HEAL_VALUE;
    }
    increasePlayerHealth(HEAL_VALUE);
    currentPlayerHealth += HEAL_VALUE;
    writeToLog(
      LOG_EVENT_PLAYER_HEAL,
      parseInt(healValue),
      parseInt(currentMonsterHealth),
      parseInt(currentPlayerHealth)
    );
    endRound();
  }

  adjustHealthBars(chosenMaxLife);

  function writeToLog(evt, val, monsterHealth, playerHealth) {
    let logEntry = {
      event: evt,
      value: val,
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };

    switch (evt) {
      case LOG_EVENT_PLAYER_ATTACK:
        logEntry.target = 'Monster';
        break;
      case LOG_EVENT_PLAYER_STRONG_ATTACK:
        logEntry.target = 'Monster';
        break;
      case LOG_EVENT_MONSTER_ATTACK:
        logEntry.target = 'Player';
        break;
      case LOG_EVENT_PLAYER_HEAL:
        logEntry.target = 'Player';
        break;
      case LOG_EVENT_GAME_OVER:
        logEntry;
        break;
      default:
        logEntry;
        break;
    }
    battleLog.push(logEntry);
  }
  function printLogCommand() {
    let i = 1;
    for (const logEntry of battleLog) {
        console.log(`#${i}`);
        for (const key in logEntry) {
          console.log(`${key}: ${logEntry[key]}`);
        }
      i++;
    }
    if (forFlexibility) {
      forFlexibility = false;
      alert('The battle log is in the console of the developer tools (shortcut: ctrl + shift + I)');
    }
  }
  attackBtn.addEventListener('click', attackHandler);
  strongAttackBtn.addEventListener('click', strongAttackHandler);
  healBtn.addEventListener('click', healPlayerHandler);
  logBtn.addEventListener('click', printLogCommand);
