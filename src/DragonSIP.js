import {
    UserAgent,
    Registerer,
    Inviter,
    Invitation,
    UserAgentDelegate,
    UserAgentOptions
} from "sip.js";

export class DragonSIP {
    constructor(username, onStatusUpdate) {
        this.username = username;
        this.onStatusUpdate = onStatusUpdate;
        this.server = "ws://localhost:8088/asterisk/ws";
        this.password = "1234";
    }

    init() {
        const uri = UserAgent.makeURI(`sip:${this.username}@localhost`);

        console.log(`Iniciando DragonSIP para ${this.username} com URI: ${uri.toString()}`);
        console.log(`Servidor SIP: ${this.password}`);
        this.userAgent = new UserAgent({
            uri,
            transportOptions: {
                server: this.server,
            },
            authorizationUsername: this.username,
            authorizationPassword: '1234',
        });

        this.registerer = new Registerer(this.userAgent);

        this.userAgent.delegate = {
            onInvite: async (invitation) => {
                this.onStatusUpdate("Chamada recebida");
                await invitation.accept();
                this.session = invitation;
            },
        };
    }

    async start() {
        this.init();
        await this.userAgent.start();
        await this.registerer.register();
        this.onStatusUpdate(`Registrado como ${this.username}`);
    }

    async call(target) {
        const targetURI = UserAgent.makeURI(`sip:${target}@localhost`);
        const inviter = new Inviter(this.userAgent, targetURI, {
            sessionDescriptionHandlerOptions: {
                constraints: { audio: true, video: false },
            },
        });
        this.session = inviter;
        await inviter.invite();
        this.onStatusUpdate(`Chamando ${target}`);
    }
}
