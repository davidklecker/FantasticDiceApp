import DiceBox from "https://unpkg.com/@3d-dice/dice-box@1.1.3/dist/dice-box.es.min.js";

window.DiceBoxCall = {
    init: function (dotNetObject) {
        var Box = new window.DiceBox({
            assetPath: "https://unpkg.com/@3d-dice/dice-box@1.1.3/assets/",
            origin: "https://unpkg.com/@3d-dice/dice-box@1.1.3/dist/",
            container: "#dice-box",
            theme: "diceOfRolling",
            themeColor: "#feea03",
            externalThemes: {
                diceOfRolling: "https://www.unpkg.com/@3d-dice/theme-dice-of-rolling@0.2.1",
            },
            offscreen: true,
            scale: 7,
            throwForce: 100,
            gravity: 1,
            mass: 10,
            spinForce: 20,
        });
        Box.roll([]);

        Box.onRollComplete = (rollResult) => {
            if (dotnetObj) {
                var resultString = rollResult.map(d => `${d.qty},${d.sides},${d.value}`).join(" ");
                dotnetObj.invokeMethodAsync('GetResultsFromDieRoll', resultString);
            } else {
                console.error("Blazor dotnetObj not initialized!");
            }
        };
    }
}

const colors = [
    "#348888",
    "#22BABB",
    "#9EF8EE",
    "#FA7F08",
    "#F24405",
    "#F25EB0",
    "#B9BF04",
    "#F2B705",
    "#F27405",
    "#F23005",
];

const scale = [2, 3, 4, 5, 6, 7, 8];

// Roll the dice
export function RollTheDice(number, face) {
    if (!Box) {
        console.error("DiceBox is not initialized yet!");
        return;
    }
    Box.updateConfig({
        scale: get_random(scale),
    });
    Box.roll([`${number}d${face}`], {
        themeColor: get_random(colors),
    });
}

// Clear dice
export function ClearBoard() {
    if (Box) {
        Box.clear();
    }
}

// Get roll results
export function GetResults() {
    return Box ? Box.getRollResults().join(",") : "";
}

function get_random(list) {
    return list[Math.floor(Math.random() * list.length)];
}
