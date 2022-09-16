import { useReducer } from "react";
import Tombol from "./components/Tombol";
import Operasi from "./components/Operasi";
import "./kalkulator-style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete-digit',
    EVALUATE: 'evaluate',
    TERBILANG: 'terbilang',
    LOGOUT:'logout'
}

function reducer(state, { type, payload }) {
    switch (type) {
        case ACTIONS.ADD_DIGIT:
            if (state.overwrite) {
                return {
                    ...state,
                    current: payload.digit,
                    overwrite:false
                }
            }
            if ((payload.digit === "1" || payload.digit === "2" || payload.digit === "3" || payload.digit === "4" || payload.digit === "5" || payload.digit === "6" || payload.digit === "7" || payload.digit === "8" || payload.digit === "9") &&  state.current === "0") return state
            if (payload.digit === "0" && state.current === "0") return state
            if (payload.digit === "." && state.current.includes(".")) return state
            return {
                ...state,
                current: `${state.current || ""}${payload.digit}`
            }
        case ACTIONS.CLEAR:
            return {}
        
        case ACTIONS.CHOOSE_OPERATION:
            if (state.prev == null & state.current == null) {
                return state
            }

            if (state.current == null) {
                return {
                    ...state,
                    operation: payload.operation
                }
            }

            if (state.prev == null) {
                return {
                    ...state,
                    operation: payload.operation,
                    prev: state.current,
                    current: null
                }
            }
            return {
                ...state,
                operation: payload.operation,
                prev: evaluate(state),
                current: null
            }
        case ACTIONS.EVALUATE:
            if (state.prev == null || state.current == null || state.operation == null) {
                return state
            }
            return {
                ...state,
                overwrite:true,
                prev: null,
                operation: null,
                current: evaluate(state)
            }
        case ACTIONS.DELETE_DIGIT:
            if (state.overwrite) {
                return {
                    ...state,
                    overwrite: false,
                    current: null
                }
            }
            if (state.current == null) return state
            if (state.current.length === 1) {
                return { ...state, current: null}
            }
            return {
                ...state,
                current: state.current.slice(0, -1)
            }
        
        case ACTIONS.TERBILANG:
            if (state.prev != null  || state.operation != null) {
                return state
            }
            return {
                ...state,
                prev: null,
                overwrite:true,
                operation: null,
                current: terbilang(state.current)
            }
    }
}

function terbilang(current) {
    var bilangan = ['', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan', 'Sepuluh', 'Sebelas'];

    // 1 - 11
    if (current < 12) {
        var kalimat = bilangan[current];
    }
    // 12 - 19
    else if (current < 20) {
        var kalimat = bilangan[current - 10] + ' Belas';
    }
    // 20 - 99
    else if (current < 100) {
        var utama = current / 10;
        var depan = parseInt(String(utama).substr(0, 1));
        var belakang = current % 10;
        var kalimat = bilangan[depan] + ' Puluh ' + bilangan[belakang];
    }
    // 100 - 199
    else if (current < 200) {
        var kalimat = 'Seratus ' + terbilang(current - 100);
    }
    // 200 - 999
    else if (current < 1000) {
        var utama = current / 100;
        var depan = parseInt(String(utama).substr(0, 1));
        var belakang = current % 100;
        var kalimat = bilangan[depan] + ' Ratus ' + terbilang(belakang);
    }
    // 1,000 - 1,999
    else if (current < 2000) {
        var kalimat = 'Seribu ' + terbilang(current - 1000);
    }
    // 2,000 - 9,999
    else if (current < 10000) {
        var utama = current / 1000;
        var depan = parseInt(String(utama).substr(0, 1));
        var belakang = current % 1000;
        var kalimat = bilangan[depan] + ' Ribu ' + terbilang(belakang);
    }
    // 10,000 - 99,999
    else if (current < 100000) {
        var utama = current / 100;
        var depan = parseInt(String(utama).substr(0, 2));
        var belakang = current % 1000;
        var kalimat = terbilang(depan) + ' Ribu ' + terbilang(belakang);
    }
    // 100,000 - 999,999
    else if (current < 1000000) {
        var utama = current / 1000;
        var depan = parseInt(String(utama).substr(0, 3));
        var belakang = current % 1000;
        var kalimat = terbilang(depan) + ' Ribu ' + terbilang(belakang);
    }
    // 1,000,000 - 	99,999,999
    else if (current < 100000000) {
        var utama = current / 1000000;
        var depan = parseInt(String(utama).substr(0, 4));
        var belakang = current % 1000000;
        var kalimat = terbilang(depan) + ' Juta ' + terbilang(belakang);
    }
    else if (current < 1000000000) {
        var utama = current / 1000000;
        var depan = parseInt(String(utama).substr(0, 4));
        var belakang = current % 1000000;
        var kalimat = terbilang(depan) + ' Juta ' + terbilang(belakang);
    }
    else if (current < 10000000000) {
        var utama = current / 1000000000;
        var depan = parseInt(String(utama).substr(0, 1));
        var belakang = current % 1000000000;
        var kalimat = terbilang(depan) + ' Milyar ' + terbilang(belakang);
    }
    else if (current < 100000000000) {
        var utama = current / 1000000000;
        var depan = parseInt(String(utama).substr(0, 2));
        var belakang = current % 1000000000;
        var kalimat = terbilang(depan) + ' Milyar ' + terbilang(belakang);
    }
    else if (current < 1000000000000) {
        var utama = current / 1000000000;
        var depan = parseInt(String(utama).substr(0, 3));
        var belakang = current % 1000000000;
        var kalimat = terbilang(depan) + ' Milyar ' + terbilang(belakang);
    }
    else if (current < 10000000000000) {
        var utama = current / 10000000000;
        var depan = parseInt(String(utama).substr(0, 1));
        var belakang = current % 10000000000;
        var kalimat = terbilang(depan) + ' Triliun ' + terbilang(belakang);
    }
    else if (current < 100000000000000) {
        var utama = current / 1000000000000;
        var depan = parseInt(String(utama).substr(0, 2));
        var belakang = current % 1000000000000;
        var kalimat = terbilang(depan) + ' Triliun ' + terbilang(belakang);
    }

    else if (current < 1000000000000000) {
        var utama = current / 1000000000000;
        var depan = parseInt(String(utama).substr(0, 3));
        var belakang = current % 1000000000000;
        var kalimat = terbilang(depan) + ' Triliun ' + terbilang(belakang);
    }

    else if (current < 10000000000000000) {
        var utama = current / 1000000000000000;
        var depan = parseInt(String(utama).substr(0, 1));
        var belakang = current % 1000000000000000;
        var kalimat = terbilang(depan) + ' Kuadriliun ' + terbilang(belakang);
    }

    var pisah = kalimat.split(' ');
    var full = [];
    for (var i = 0; i < pisah.length; i++) {
        if (pisah[i] != "") { full.push(pisah[i]); }
    }

    return full.join(' ');
}

function evaluate({ current, prev, operation }) {
    const pre = parseFloat(prev)
    const curr = parseFloat(current)
    if (isNaN(pre) || isNaN(curr)) return ""
    let hitung = ""
    switch (operation) {
        case "+":
            hitung = pre + curr
            break
        case "-":
            hitung = pre - curr
            break
        case "x":
            hitung = pre * curr
            break
        case "÷":
            hitung = pre / curr
            break
    }

   return hitung.toString()
}


function Kalkulator() {
    const [{ current, prev, operation }, dispatch] = useReducer(reducer, {})
    const navigate = useNavigate();

    if (sessionStorage.length === 0) {
        navigate('/')
    }
    const logoutUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get("http://localhost:8080/api/auth/signout", {
                headers: {
                    'x-access-token': sessionStorage.getItem("_token")
                }
            });
            if (response.status == 200) {
                sessionStorage.clear();
                navigate('/')
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="kalkulator-grid">
            <div className="hasil">
                <div className="prev">{prev}{operation}</div>
                <div className="current">{current}</div>
            </div>
            <button className="span-two" onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
            <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
            <Operasi operation="÷" dispatch={dispatch} />
            <Tombol digit="1" dispatch={dispatch} />
            <Tombol digit="2" dispatch={dispatch} />
            <Tombol digit="3" dispatch={dispatch} />
            <Operasi operation="x" dispatch={dispatch} />
            <Tombol digit="4" dispatch={dispatch} />
            <Tombol digit="5" dispatch={dispatch} />
            <Tombol digit="6" dispatch={dispatch} />
            <Operasi operation="+" dispatch={dispatch} />
            <Tombol digit="7" dispatch={dispatch} />
            <Tombol digit="8" dispatch={dispatch} />
            <Tombol digit="9" dispatch={dispatch} />
            <Operasi operation="-" dispatch={dispatch} />
            <Tombol digit="." dispatch={dispatch} />
            <Tombol digit="0" dispatch={dispatch} />
            <button className="span-two"
                onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
            <button className="span-three"
                onClick={() => dispatch({ type: ACTIONS.TERBILANG })}>Terbilang</button>
            <button className="span-three"
                onClick={logoutUser}>Keluar</button>
        </div>
    );
}

export default Kalkulator;