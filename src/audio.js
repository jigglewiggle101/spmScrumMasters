import * as THREE from 'three';

export function setupAudio(camera) {
    const listener = new THREE.AudioListener();
    camera.add(listener); // Attach listener to the camera

    const sound = new THREE.Audio(listener);

    // Load your audio file (use an absolute URL if needed)
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('./audio/game.mp3', function(buffer) {
        // Set the loaded buffer as the Audio object's buffer
        sound.setBuffer(buffer);
        sound.setLoop(true); // Set to true if you want the audio to loop
        sound.setVolume(0.5); // Adjust volume (0.0 to 1.0)

        // Play the audio (handle Promise)
        sound.play()
            .then(() => {
                console.log('Audio is playing.');
            })
            .catch(error => {
                console.error('Error playing audio:', error);
            });
    });

    return sound; // Return the audio source for further use
}

