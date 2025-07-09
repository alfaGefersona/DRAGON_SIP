import React, { useState } from "react";
import { DragonSIP } from "./DragonSIP";

function App() {
    const [dragon, setDragon] = useState("dragon1");
    const [sip, setSip] = useState(null);
    const [status, setStatus] = useState("Desconectado");

    const onStatusUpdate = (msg) => {
        console.log("[STATUS]", msg);
        setStatus(msg);
    };

    const handleRegister = async () => {
        const newSip = new DragonSIP(dragon, onStatusUpdate);
        await newSip.start();
        setSip(newSip);
    };

    const handleCall = async () => {
        const target = dragon === "dragon1" ? "dragon2" : "dragon1";
        await sip.call(target);
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h2>Dragão SIP</h2>
            <label>
                Escolha seu dragão:
                <select
                    value={dragon}
                    onChange={(e) => setDragon(e.target.value)}
                    style={{ marginLeft: "10px" }}
                >
                    <option value="dragon1">dragon1</option>
                    <option value="dragon2">dragon2</option>
                </select>
            </label>
            <br /><br />
            <button onClick={handleRegister}>Registrar</button>
            <button onClick={handleCall} disabled={!sip}>
                Ligar para outro dragão
            </button>
            <p><strong>Status:</strong> {status}</p>
        </div>
    );
}

export default App;
