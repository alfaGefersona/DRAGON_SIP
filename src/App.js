import React, { useEffect, useState } from 'react';
import { startSIP, call } from './DragonSIP';

function App() {
    const [target, setTarget] = useState('');
    const [status, setStatus] = useState('🔄 Iniciando...');

    useEffect(() => {
        const user = prompt('Qual dragão você é? (dragon1 ou dragon2)');
        const targetUser = user === 'dragon1' ? 'dragon2' : 'dragon1';

        setTarget(targetUser);

        async function init() {
            try {
                await startSIP(user, '1234', async (invitation) => {
                    setStatus('Chamada recebida!');
                    const aceitar = window.confirm('Outro dragão está chamando. Atender?');
                    if (aceitar) {
                        await invitation.accept({
                            sessionDescriptionHandlerOptions: {
                                constraints: { audio: true, video: false },
                            },
                        });
                        setStatus('Em chamada');
                    } else {
                        await invitation.reject();
                        setStatus('Chamada recusada');
                    }
                });

                setStatus(` Registrado como ${user}`);
            } catch (err) {
                setStatus(`Erro ao iniciar: ${err.message}`);
            }
        }
        init();
    }, []);

    return (
        <div style={{ fontFamily: 'Arial', textAlign: 'center', paddingTop: '40px' }}>
            <h1> Comunicação Dracônica</h1>
            <p>Status: {status}</p>
            <button onClick={() => call(target)}> Ligar para {target}</button>
        </div>
    );
}

export default App;
