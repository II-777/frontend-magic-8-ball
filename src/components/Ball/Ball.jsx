import { useEffect, useRef, useState } from 'react';
import css from './Ball.module.css';
import EmptyBall from '../../img/EmptyBall.webp';

const answers = [
  "It is certain",
  "It is decidedly so",
  "Without a doubt",
  "Yes definitely",
  "You may rely\non it",
  "As I see it,\nyes",
  "Most likely",
  "Outlook\ngood",
  "Yes",
  "Signs point to yes",
  "Reply hazy",
  "Ask again\nlater",
  "Better not tell you now",
  "Cannot\npredict\nnow",
  "Concentrate\nand ask again",
  "Try again",
  "My reply is no",
  "My sources say no",
  "Outlook not so good",
  "Very doubtful"
];

const pickAnswer = () => answers[Math.floor(Math.random() * answers.length)];

const SHAKE_MS = 1700;

function Ball() {
  const [answer, setAnswer] = useState("");
  const [phase, setPhase] = useState("idle");
  const timers = useRef([]);

  useEffect(() => () => {
    timers.current.forEach(clearTimeout);
  }, []);

  const shakeBall = () => {
    if (phase === "shaking") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduceMotion ? 160 : SHAKE_MS;
    const next = pickAnswer();

    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPhase("shaking");
    setAnswer("");

    timers.current.push(window.setTimeout(() => setAnswer(next), duration * 0.62));
    timers.current.push(window.setTimeout(() => setPhase("revealed"), duration));
  };

  const shaking = phase === "shaking";

  return (
    <div className={css.stage}>
      <div className={`${css.rig} ${shaking ? css.shaking : ""}`}>
        <div className={css.hover}>
          <button
            type="button"
            className={css.ball}
            onClick={shakeBall}
            aria-label="Shake the Magic 8-Ball"
          >
            <span className={css.shell} style={{ backgroundImage: `url(${EmptyBall})` }}>
              <span className={css.window}>
                <span className={css.bubble} />
                <span className={`${css.bubble} ${css.bubbleLate}`} />
                <span className={css.die}>
                  <span className={css.rim} />
                  <span className={css.face}>
                    <span className={`${css.answer} ${answer === "Yes" ? css.yes : ""}`}>
                      {answer || "Ask a question..."}
                    </span>
                  </span>
                </span>
                <span className={css.glass} />
              </span>
            </span>
          </button>
        </div>
        <span className={css.shadow} />
      </div>
    </div>
  );
}

export default Ball;
