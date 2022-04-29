export namespace WAMiniGame {
    export class MiniGames {
        private gameMap: object;
        constructor()

        addGameChat(chatId: string, game: MiniGame|Function, message?: WAWebJS.Message, client?: WAWebJS.Client): boolean

        removeGameChat(chatId: string|MiniGame): boolean
        removeGameChat(game: MiniGame|string): boolean

        forwardMsg(message: WAWebJS.Message, client: WAWebJS.Client): Promise<void>
    }

    export interface MiniGame {
        _parent: MiniGames
        procMessage(message: WAWebJS.Message, client?: WAWebJS.Client): Promise<void>

        gameOver(message: WAWebJS.Message, client?: WAWebJS.Client): void
        setParent(parent: MiniGames): void
    }
}
declare namespace WAWebJS {
    export class Client{}

    export interface Message {
        getChatId: () => string,
    }
}