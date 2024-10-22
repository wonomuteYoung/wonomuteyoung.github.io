// Når DOM er lastet inn
document.addEventListener('DOMContentLoaded', () => {
    // Start AudioContext når brukeren klikker første gang
    const playButton = document.querySelector('button'); // Henter første knapp som et eksempel
    playButton.addEventListener('click', async () => {
        await Tone.start(); // Starter lydkonteksten
        console.log("AudioContext started");
    });

    // Set up sampleren
    const sampler = new Tone.Sampler({
        urls: {
            "G3": "https://raw.githubusercontent.com/wonomuteYoung/workshops/main/sampleA.mp3",
            

        },
        release: 1,
        baseUrl: "",
    }).toDestination();

    // Forhåndslaste lyd
    Tone.loaded().then(() => {
        console.log("Samples loaded!");
    });

    // Legge til hendelser for alle knappene
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const note = button.getAttribute('data-note');
            sampler.triggerAttackRelease(note, 1);
        });
    });

    // Legge til keyboard-hendelser
    document.addEventListener('keydown', (event) => {
        const keyMap = {
            'q': 'C4',
            'w': 'D4',
            'e': 'E4',
            'r': 'F4',
            't': 'G4',
            'y': 'A4',
            'u': 'B4',
            'i': 'C5'
        };

        const note = keyMap[event.key.toLowerCase()];
        if (note) {
            sampler.triggerAttackRelease(note, 1);
        }
    });
});
