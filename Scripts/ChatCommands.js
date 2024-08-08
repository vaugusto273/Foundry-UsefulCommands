Hooks.on('chatMessage', (chatLog, messageText, chatData) => {
    if (messageText.startsWith("/ft")) {
        let feet = parseFloat(messageText.replace("/ft ", "").trim());
        if (isNaN(feet)) {
            ChatMessage.create({
                content: "Por favor, insira um número válido de pés.",
                whisper: [chatData.user]
            });
        } else {
            let meters = feet * 0.3048;
            ChatMessage.create({
                content: `${feet} pés equivalem a ${meters.toFixed(1)} metros.`,
                whisper: [chatData.user]
            });
        }
        return false;
    }
});
