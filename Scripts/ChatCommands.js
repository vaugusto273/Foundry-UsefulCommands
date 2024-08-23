Hooks.on("chatCommandsReady", commands => {
    game.chatCommands.register(
        {
            name: "/usehelp",
            module: "UsefulCommands",
            aliases: ["/uh"],
            description: "Use this commands to see all commands of UsefulCommands Module",
            callback: (chat, parameters, messageData) => {
                return  {
                        content: "<h1>Useful commands</h1><p><b>Welcome to the Useful commands help page</b></p><p><u>/usehelp</u> - Show the command list and how to use.</p><p><u>/ft [Feets] </u> - will convert feet to meters and whisper to you. </p><p><u>/inch [Inches] </u> - will convert inches to centimeters and whisper to you. </p><p><u>/lb [Pounds] </u> - will convert pounds to kilograms and whisper to you.</p>",
                        whisper: [game.user.id]
                    };
            }
        },
    );
    game.chatCommands.register(
        {
            name:"/feets",
            module: "UsefulCommands",
            aliases: ["/fts", "/ft"],
            description: "Converts measurement from feet to meters",
            autocompleteCallback: (menu, alias, parameters) => {
                const entries = [
                    game.chatCommands.createCommandElement(`${alias} Parameter`, "Suggestion: <strong>30</strong>")
                ];
                entries.length = Math.min(entries.length, menu.maxEntries);
                return entries;
            },
            callback: (chat, parameters, messageData) => {
                let feets = parameters;
                let meter = feets * 0.3048;
                if (isNaN(feets)){
                    return { 
                        content: "Please, insert a valid number of feets",
                        whisper: [game.user.id]
                    }
                }
                else{
                    return{
                        content: `<strong>${feets}fts</strong> is approximately <strong>${meter} meters</strong>.`,
                        whisper: [game.user.id]
                    }
                }
            }
        }
    );
    game.chatCommands.register(
        {
            name:"/inches",
            module: "UsefulCommands",
            aliases: ["/in", "/inch"],
            description: "Converts measurement from inches to centimeters",
            autocompleteCallback: (menu, alias, parameters) => {
                const entries = [
                    game.chatCommands.createCommandElement(`${alias} Parameter`, "Suggestion: <strong>10</strong>")
                ];
                entries.length = Math.min(entries.length, menu.maxEntries);
                return entries;
            },
            callback: (chat, parameters, messageData) => {
                let inches = parameters;
                let centimeters = inches * 2.54;
                if (isNaN(inches)){
                    return { 
                        content: "Please, insert a valid number of inches",
                        whisper: [game.user.id]
                    }
                }
                else{
                    return{
                        content: `<strong>${inches}"</strong> is approximately <strong>${centimeters} centimeters</strong>.`,
                        whisper: [game.user.id]
                    }
                }
            }
        }
    );
    game.chatCommands.register(
        {
            name:"/pounds",
            module: "UsefulCommands",
            aliases: ["/pound", "/lb", "/lbs"],
            description: "Converts measurement from pounds to kilograms",
            autocompleteCallback: (menu, alias, parameters) => {
                const entries = [
                    game.chatCommands.createCommandElement(`${alias} Parameter`, "Suggestion: <strong>10</strong>")
                ];
                entries.length = Math.min(entries.length, menu.maxEntries);
                return entries;
            },
            callback: (chat, parameters, messageData) => {
                let lbs = parameters;
                let kgs = lbs * 0.453592;
                if (isNaN(kgs)){
                    return { 
                        content: "Please, insert a valid number of pounds",
                        whisper: [game.user.id]
                    }
                }
                else{
                    return{
                        content: `<strong>${lbs}lbs(pounds)</strong> is approximately <strong>${kgs}kg</strong>.`,
                        whisper: [game.user.id]
                    }
                }
            }
        }
    );
});
