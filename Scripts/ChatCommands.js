Hooks.on("ready", () => {
    ChatCommands.registerCommand("/usehelp", (args, message) => {
        return ChatMessage.create({
            content: "",
            whisper: [message.user],
        })
    })
    ChatCommands.registerCommand("/ft", (args, message) => {
        let feet = parseFloat(args[0]);
        if (isNaN(feet)) {
            return ChatMessage.create({
                content: "Por favor, insira um valor numérico para os pés.",
                whisper: [message.user],
            });
        }
        let meters = feet * 0.3048;
        ChatMessage.create({
            content: `${feet} pés são aproximadamente ${meters.toFixed(1)} metros.`,
            whisper: [message.user],
        });
    });
    ChatCommands.registerCommand("/inch", (args, message) => {
        let inches = parseFloat(args[0]);
        if (isNaN(inches)) {
            return ChatMessage.create({
                content: "<h1>Useful commands</h1><p><b>Welcome to the Useful commands help page</b></p><p><u>/usehelp</u> - Show the command list and how to use.</p><p><u>/ft [Feets] </u> - will convert fts on metric system (Meters) and whisper to you. </p><p><u>/inch [Inches] </u> - will convert inches on metric system (Centimeters) and whisper to you. </p><p><u>/lb [Pounds] </u> - will convert lbs on metric system (kilograms) and whisper to you.</p>",
                whisper: [message.user],
            });
        }
        let cm = inches * 2.54;
        ChatMessage.create({
            content: `${inches} polegadas são aproximadamente ${cm.toFixed(
            2)} centímetros.`,
            whisper: [message.user],
        });
    });
    ChatCommands.registerCommand("/lb", (args, message) => {
        let pounds = parseFloat(args[0]);
        if (isNaN(pounds)) {
            return ChatMessage.create({
                content: "Por favor, insira um valor numérico para as libras.",
                whisper: [message.user],
            });
        }
        let kg = pounds * 0.453592;
        ChatMessage.create({
            content: `${pounds} libras são aproximadamente ${kg.toFixed(
            2
            )} quilogramas.`,
            whisper: [message.user],
        });
    });
});
