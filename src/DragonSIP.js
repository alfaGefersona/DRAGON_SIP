import { UserAgent, Inviter, Registerer } from 'sip.js';

let userAgent;
let registerer;

/**
 * Inicia o agente SIP e registra o "dragão"
 */
export async function startSIP(username, password, onCallReceived) {
    const uri = UserAgent.makeURI(`sip:${username}@localhost`);
    if (!uri) {
        throw new Error('URI inválida para o usuário SIP.');
    }

    userAgent = new UserAgent({
        uri,
        authorizationUsername: username,
        authorizationPassword: password,
        transportOptions: {
            server: 'ws://localhost:5066',
        },
    });

    registerer = new Registerer(userAgent);

    try {
        await userAgent.start();
        await registerer.register();

        userAgent.delegate = {
            onInvite: async (invitation) => {
                if (onCallReceived) {
                    await onCallReceived(invitation);
                }
            },
        };
    } catch (error) {
        console.error('Erro ao iniciar o SIP:', error);
        throw error;
    }
}

/**
 * Faz uma chamada para outro dragão SIP
 */
export async function call(targetUsername) {
    if (!userAgent) {
        console.error('userAgent não inicializado. Execute startSIP() primeiro.');
        return;
    }

    const targetURI = UserAgent.makeURI(`sip:${targetUsername}@localhost`);
    if (!targetURI) {
        console.error('URI do alvo inválida.');
        return;
    }

    try {
        const inviter = new Inviter(userAgent, targetURI, {
            sessionDescriptionHandlerOptions: {
                constraints: {
                    audio: true,
                    video: false
                }
            }
        });

        await inviter.invite();
    } catch (error) {
        console.error('Erro ao realizar a chamada:', error);
    }
}
