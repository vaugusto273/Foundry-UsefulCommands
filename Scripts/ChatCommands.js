Hooks.on("ready", () => {
    Hooks.on('chatMessage', (chatLog, messageText, chatData) => {
        if (messageText.startsWith("/usehelp")) {
            ChatMessage.create({
                content: "<h1>Useful commands</h1><p><b>Welcome to the Useful commands help page</b></p><p><u>/usehelp</u> - Show the command list and how to use.</p><p><u>/ft [Feets] </u> - will convert feet to meters and whisper to you. </p><p><u>/inch [Inches] </u> - will convert inches to centimeters and whisper to you. </p><p><u>/lb [Pounds] </u> - will convert pounds to kilograms and whisper to you.</p>",
                whisper: [chatData.user],
            });
            return false;
        }

        if (messageText.startsWith("/ft")) {
            let feet = parseFloat(messageText.replace("/ft ", "").trim());
            if (isNaN(feet)) {
                ChatMessage.create({
                    content: "Por favor, insira um valor numérico para os pés.",
                    whisper: [chatData.user],
                });
            } else {
                let meters = feet * 0.3048;
                ChatMessage.create({
                    content: `${feet} pés são aproximadamente ${meters.toFixed(1)} metros.`,
                    whisper: [chatData.user],
                });
            }
            return false;
        }

        if (messageText.startsWith("/inch")) {
            let inches = parseFloat(messageText.replace("/inch ", "").trim());
            if (isNaN(inches)) {
                ChatMessage.create({
                    content: "Por favor, insira um valor numérico para as polegadas.",
                    whisper: [chatData.user],
                });
            } else {
                let cm = inches * 2.54;
                ChatMessage.create({
                    content: `${inches} polegadas são aproximadamente ${cm.toFixed(2)} centímetros.`,
                    whisper: [chatData.user],
                });
            }
            return false;
        }

        if (messageText.startsWith("/lb")) {
            let pounds = parseFloat(messageText.replace("/lb ", "").trim());
            if (isNaN(pounds)) {
                ChatMessage.create({
                    content: "Por favor, insira um valor numérico para as libras.",
                    whisper: [chatData.user],
                });
            } else {
                let kg = pounds * 0.453592;
                ChatMessage.create({
                    content: `${pounds} libras são aproximadamente ${kg.toFixed(2)} quilogramas.`,
                    whisper: [chatData.user],
                });
            }
            return false;
        }
    });
});
