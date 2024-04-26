import confetti from 'canvas-confetti';

export const makeSomeIce = () => {
  var duration = 5 * 1000;
  var scalar = 2;
  var skew = 1;
  var ice = confetti.shapeFromText({ text: '🧊', scalar });

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  var animationEnd = Date.now() + duration;

  (function frame() {
    var timeLeft = animationEnd - Date.now();
    var ticks = Math.max(200, 500 * (timeLeft / duration));
    skew = Math.max(0.8, skew - 0.001);

    confetti({
      particleCount: 1,
      startVelocity: 0,
      ticks: ticks,
      flat: true,
      origin: {
        x: Math.random(),
        // since particles fall down, skew start toward the top
        y: Math.random() * skew - 0.2,
      },
      shapes: [ice],
      gravity: randomInRange(0.4, 0.6),
      scalar: randomInRange(0.5, 3),
      drift: randomInRange(-0.4, 0.4),
    });

    if (timeLeft > 0) {
      requestAnimationFrame(frame);
    }
  })();
};
