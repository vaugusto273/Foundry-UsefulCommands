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
                let roundmeters = Math.round(meter / 1.5) * 1.5;
                if (isNaN(feets)){
                    return { 
                        content: "Please, insert a valid number of feets",
                        whisper: [game.user.id]
                    }
                }
                else{
                    return{
                        content: `<strong>${feets}fts</strong> is approximately <strong>${meter} meters</strong>.<br>rounding by the meters of a common grid (1.5 meters)<strong>${roundmeters}</strong>`,
                        whisper: [game.user.id]
                    }
                }
            }
        },
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
        },
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
        },
    );
    game.chatCommands.register(
        {
            name:"/createnpc",
            module: "UsefulCommands",
            aliases: ["/cnpc"],
            description: "Opens a NPC creation dialog",
            callback: (chat, parameters, messageData) => {
                async function createNPC(name, race, bio, str, IsSTR, dex, IsDEX, con, IsCON, int, IsINT, wis, IsWIS, cha, IsCHA, ToSummon) {
                    let npcData = {
                        name: name,
                        type: "npc", // Certifique-se de que o tipo esteja correto conforme o sistema que você está usando
                        img: "icons/svg/mystery-man.svg", // Substitua pelo caminho da imagem do NPC
                        system: {
                            abilities: {
                                str: { value: str, proficient: IsSTR },
                                dex: { value: dex, proficient: IsDEX },
                                con: { value: con, proficient: IsCON },
                                int: { value: int, proficient: IsINT },
                                wis: { value: wis, proficient: IsWIS },
                                cha: { value: cha, proficient: IsCHA },
                        },
                        details: {
                            race: race,
                            biography: { value: bio },
                        },
                        currency: {
                            cp: "",
                            sp: "",
                            gp: "",
                            pp: "",
                        },
                        skills: {},
                        },
                    };
                    await Actor.create(npcData);
                    let actorId = newActor.id;
                    ui.notifications.info(`NPC "${name}" criado com sucesso!`);
                    ui.notifications.warn(ToSummon + " e " + actorId);
                    if (ToSummon == 1){
                            Summon(name, actorId)
                        }
                    }
                    function openAttributesDialog(name, race, bio) {
                    new Dialog({
                        title: "Atributos do NPC",
                        content: `
                            <style>
                            .npc-dialog .form-group {
                                margin-bottom: 10px;
                            }
                            .npc-dialog label {
                                font-weight: bold;
                            }
                            .npc-dialog input[type="number"] {
                                width: 100%;
                                padding: 5px;
                                box-sizing: border-box;
                            }
                            </style>
                            <form class="npc-dialog">
                            <div class="form-group">
                                <label>Força:</label>
                                <input type="number" min="1" max="20" value="10" name="npcSTR" />
                                <input type="checkbox" name="IsSTR"/>
                            </div>
                            <div class="form-group">
                                <label>Destreza:</label>
                                <input type="number" min="1" max="20" value="10" name="npcDEX" />
                                <input type="checkbox" name="IsDEX"/>
                            </div>
                            <div class="form-group">
                                <label>Constituição:</label>
                                <input type="number" min="1" max="20" value="10" name="npcCON" />
                                <input type="checkbox" name="IsCON"/>
                            </div>
                            <div class="form-group">
                                <label>Inteligência:</label>
                                <input type="number" min="1" max="20" value="10" name="npcINT" />
                                <input type="checkbox" name="IsINT"/>
                            </div>
                            <div class="form-group">
                                <label>Sabedoria:</label>
                                <input type="number" min="1" max="20" value="10" name="npcWIS" />
                                <input type="checkbox" name="IsWIS"/>
                            </div>
                            <div class="form-group">
                                <label>Carisma:</label>
                                <input type="number" min="1" max="20" value="10" name="npcCHA" />
                                <input type="checkbox" name="IsCHA"/>
                            </div>
                            <div class="form-group">
                                <label>Summonar?</label>
                                <input type="checkbox" name="Summon"/>
                            </div>
                            </form>
                        `,
                        buttons: {
                        ok: {
                            label: "OK",
                            callback: async (html) => {
                            // Obtém os atributos do NPC da entrada do usuário
                            let npcSTR = parseInt(html.find('[name="npcSTR"]').val());
                            let IsSTR = parseInt(html.find('[name="IsSTR"]').is(":checked") ? 1 : 0);
                            let npcDEX = parseInt(html.find('[name="npcDEX"]').val());
                            let IsDEX = parseInt(html.find('[name="IsDEX"]').is(":checked") ? 1 : 0);
                            let npcCON = parseInt(html.find('[name="npcCON"]').val());
                            let IsCON = parseInt(html.find('[name="IsCON"]').is(":checked") ? 1 : 0);
                            let npcINT = parseInt(html.find('[name="npcINT"]').val());
                            let IsINT = parseInt(html.find('[name="IsINT"]').is(":checked") ? 1 : 0);
                            let npcWIS = parseInt(html.find('[name="npcWIS"]').val());
                            let IsWIS = parseInt(html.find('[name="IsWIS"]').is(":checked") ? 1 : 0);
                            let npcCHA = parseInt(html.find('[name="npcCHA"]').val());
                            let IsCHA = parseInt(html.find('[name="IsCHA"]').is(":checked") ? 1 : 0);
                            let ToSummon = parseInt(html.find('[name="Summon"]').is(":checked") ? 1 : 0);
                            // Cria o NPC com o nome, raça e atributos fornecidos
                            console.log(IsCON)
                            await createNPC(
                                name,
                                race,
                                bio,
                                npcSTR,
                                IsSTR,
                                npcDEX,
                                IsDEX,
                                npcCON,
                                IsCON,
                                npcINT,
                                IsINT,
                                npcWIS,
                                IsWIS,
                                npcCHA,
                                IsCHA,
                                ToSummon
                            );
                        },
                    },
                        cancel: {
                            label: "Cancelar",
                        },
                    },
                        default: "ok",
                    }).render(true);
                }
                    new Dialog({
                    title: "Criar NPC",
                    content: `
                        <style>
                            .npc-dialog .form-group {
                                margin-bottom: 10px;
                            }
                            .npc-dialog label {
                                font-weight: bold;
                            }
                            .npc-dialog input[type="text"] {
                                width: 100%;
                                padding: 5px;
                                box-sizing: border-box;
                            }
                        </style>
                        <form class="npc-dialog">
                            <div class="form-group">
                                <label>Nome do NPC:</label>
                                <input type="text" name="npcName" />
                            </div>
                            <div class="form-group">
                                <label>Raça do NPC:</label>
                                <input type="text" name="npcRace" />
                            </div>
                            <div class="form-group">
                                <label>Biografia:</label>
                                <textarea name="npcBio" rows="4"></textarea>
                            </div>
                        </form>
                    `,
                    buttons: {
                    ok: {
                        label: "OK",
                        callback: (html) => {
                          // Obtém o nome do NPC da entrada do usuário
                            let npcName = html.find('[name="npcName"]').val();
                            let npcRace = html.find('[name="npcRace"]').val();
                            let npcBio = html.find('[name="npcBio"]').val();
                            if (npcName) {
                            // Abre o segundo diálogo para pedir a raça do NPC
                            openAttributesDialog(npcName,npcRace,npcBio);
                            } else {
                                ui.notifications.warn("Por favor, insira um nome para o NPC.");
                            }
                        },
                        },
                        cancel: {
                            label: "Cancelar",
                        },
                    },
                    default: "ok",
                }).render(true);
                async function Summon(name, aId){
                        let position = await warpgate.crosshairs.show({
                            size:1,
                            icon: 'icons/magic/movement/trail-streak-zigzag-yellow.webp',
                            label: 'Summon NPC',
                            tag: 'Summon NPC',
                            drawIcon: true,
                            drawOutline: true,
                            interval: 0
                        })
                        let tokenData = {
                        name: name,
                        img: actor.prototypeToken.texture.src,
                        actorId: aId,
                        x: position.x,
                        y: position.y
                    };
                await TokenDocument.create(tokenData, { parent: scene });
            }
            }
        }
    );
});
