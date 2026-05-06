let win = 0, lose = 0, draw = 0;
  let ai = 0, announcedAi = 0;

  const choices = ["", "가위", "보", "바위"];

  function addLog(text) {
    const logDiv = document.getElementById("logs");
    const newLog = document.createElement("div");
    newLog.className = "log";
    newLog.innerHTML = text;

    logDiv.prepend(newLog); // 최신이 위로
  }

  function newRound() {
    announcedAi = Math.floor(Math.random() * 3) + 1;
    ai = announcedAi;

    document.getElementById("aiChoice").innerText =
      `AI는 현재 ${choices[announcedAi]}을 낼 준비를 하고있다!`;
    document.getElementById("status").innerText = "당신의 차례다";
  }

  function play(user) {
    toggleButtons(false);

    document.getElementById("status").innerText =
      "AI는 다른 행동을 할지 생각하고 있다";

    setTimeout(() => {
      if (Math.random() < 0.7) {
        let newAi;
        do {
          newAi = Math.floor(Math.random() * 3) + 1;
        } while (newAi === ai);
        ai = newAi;
      }

      let resultText = `ai의  ${choices[ai]}! / 당신의 ${choices[user]}! <br>`;
      let resultText1 = `ai의  ${choices[ai]}! / 당신의 ${choices[user]}! <br>`;
      if (ai === user) {
        draw++;
        resultText += "비겼다.";
        resultText1 += "비겼다.";
      } else if (
        (user === 1 && ai === 2) ||
        (user === 2 && ai === 3) ||
        (user === 3 && ai === 1)
      ) {
        win++;
        resultText += "이겼다.";
        resultText1 += "이겼다.";
      } else {
        lose++;
        resultText += "졌다.";
        resultText1 += "졌다.";
      }

      addLog(resultText1);

      document.getElementById("result").innerHTML = resultText;
      document.getElementById("score").innerText =
        `승: ${win} | 패: ${lose} | 무: ${draw}`;

      setTimeout(() => {
        newRound();
        document.getElementById("result").innerHTML = "";
        toggleButtons(true);
      }, 1000);

    }, 1100);
  }

  function toggleButtons(enable) {
    document.querySelectorAll("button")
      .forEach(btn => btn.disabled = !enable);
  }

  newRound();
   const tips = [
    "tip:AI는 70% 확률로 다른걸 낸답니다",
    "tip:가위바위보는 운이 90%입니다",
    "tip:연승하면 기분이 좋아집니다",
    "tip:AI는 가끔 배신합니다",
    "tip:바위만 내면 질 수도 있습니다",
    "tip:현재 제작자는 굉장히 배가 고플 확률이 높습니다!",
    "tip:제작자는 이터널 리턴 골드를 찍었습니다!!"
  ];

  let index = 0;
  const footer = document.getElementById("footerText");

  setInterval(() => {
    index = (index + 1) % tips.length;
    footer.textContent = tips[index];
  }, 10000); // 10초마다 변경
