var { Kkbot, Member, Room } = require('kkbot.js');
var { Command, Commander, Pattern, Function, Type } = require('command.js');
_ = require('essential_old.js');

var dalmeum = new Kkbot(BotManager.getCurrentBot());
var commander = new Commander('/').setcommand({
    ping: (chat) => "pong",

    do: ((chat, txt) => {
        txt = txt.join(' ');

        try {
            if (txt.includes("while") || txt.includes("for")) {
                return "ㅈㄹㄴ";
            } else if (chat.member.name != "류현승") {
                return ":cut:";
            } else {
                return eval(txt);
            }
        } catch (e) {
            return e.toString();
        }
    }).type(Type.string.many())
});

dalmeum.on("message", (chat) => {
    let result = commander.execute(chat);
    if (result != null) {
        chat.send(result);
    }
});