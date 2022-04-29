class MiniGames{
    #gameMap;
  
    constructor() {
      this.#gameMap = {};
    }
    /**
     * @param {string} chatId
     * @param {MiniGame|function} game
     * @param {WAWebJS.Message} message
     * @param {WAWebJS.Client} client
     * @return {boolean}
     */
    addGameChat(chatId, game, message, client){
      if(this.#gameMap[chatId]){
        return false;
      }
      this.#gameMap[chatId] = {};
      if(typeof game === 'function'){
        game = new game(message, client);
      }
      this.#gameMap[chatId].game = game;
      game.setParent(this);
      return true;
    }
  
    /**
     * @param {MiniGame|string} game
     * @return {boolean}
     */
    removeGameChat(game){
      if (typeof game === 'string') {
        if(this.#gameMap[game]) {
          delete this.#gameMap[game];
          return true;
        }
        return false;
      }
      const chatId = Object.keys(this.#gameMap).find(key => this.#gameMap[key].game === game);
      if(this.#gameMap[chatId]) {
        delete this.#gameMap[chatId];
        return true;
      }
      return false;
    }
    /**
     * @param {WAWebJS.Message} message
     * @param {WAWebJS.Client} client
     * @return {Promise<void>}
     */
    async forwardMsg(message, client){
      const minigame = this.#gameMap[message._getChatId()];
      if (minigame){
        minigame.game.procMessage(message, client);
      }
    }
  }
  class MiniGame{
    #parent;
    /**
     * @param {WAWebJS.Message} message
     * @param {WAWebJS.Client} client
     * @return {Promise<void>}
     */
    async procMessage(message, client= undefined){}
  
    /**
     * @param {WAWebJS.Message} message
     * @param {WAWebJS.Client} client
     * @return {void}
     */
    gameOver(message, client=undefined){
      this.#parent.removeGameChat(this);
    }
  
    /**
     * @param {MiniGames} newParent
     */
    setParent(newParent){
      this.#parent = newParent;
    }
  
  }
  module.exports.MiniGames = MiniGames;
  module.exports.MiniGame = MiniGame;