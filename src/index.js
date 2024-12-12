const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};

async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;    
}

async function getRandomBlock(){
    let random = Math.random();
    let result;

    switch(true){
        case random < 0.333:
            result = "RETA"
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
    }

    return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(
      `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
        diceResult + attribute
      }`
    );
  }

//start game
async function playRaceEngine(character1, character2){
    for(let round = 1; round <= 5; round++){
        console.log(`🏁 Rodada ${round}`);
        
        //Random block
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        //Roll dice
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();
    
        //total skill test
        let totalSkillTest1 = 0; 
        let totalSkillTest2 = 0; 
    
        if(block == "RETA"){
            totalSkillTest1 = diceResult1 + character1.VELOCIDADE;
            totalSkillTest2 = diceResult2 + character2.VELOCIDADE;
    
            await logRollResult(
                character1.NOME,
                "velocidade",
                diceResult1,
                character1.VELOCIDADE
            );
        
            await logRollResult(
                character2.NOME,
                "velocidade",
                diceResult2,
                character2.VELOCIDADE
            );
        }
        if(block == "CURVA"){
            totalSkillTest1 = diceResult1 + character1.MANOBRABILIDADE;
            totalSkillTest2 = diceResult2 + character2.MANOBRABILIDADE;
            
            await logRollResult(
                character1.NOME,
                "manobrabilidade",
                diceResult1,
                character1.MANOBRABILIDADE
            );
        
            await logRollResult(
                character2.NOME,
                "manobrabilidade",
                diceResult2,
                character2.MANOBRABILIDADE
            );
        }
    
        if(block == "CONFRONTO"){
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;
    
            console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);
    
            await logRollResult(
                character1.NOME,
                "poder",
                diceResult1,
                character1.PODER
            );
    
            await logRollResult(
                character2.NOME,
                "poder",
                diceResult2,
                character2.PODER
            );
    
        }
    }
 }

(async function main(){
    console.log(
        `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`
    );

    await playRaceEngine(player1, player2);

})();
  