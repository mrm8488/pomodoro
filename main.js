new Vue({
  el: "#app",
  data: {
    message: "Let the countdown begin!!",
    totalTime: 25 * 60,
    quotesUrl: "https://quotes.rest/qod?category=inspire",
    timerRunning: false,
    timerPaused: false,
    interval: null
  },
  computed: {
    time: function() {
      return this.minutes + " : " + this.seconds;
    },
    minutes: function() {
      var min = Math.floor(this.totalTime / 60);
      return min >= 10 ? min : "0" + min;
    },
    seconds: function() {
      var sec = this.totalTime - this.minutes * 60;
      return sec >= 10 ? sec : "0" + sec;
    }
  },
  methods: {
    timerRun() {
      this.timerRunning = true;
      this.getInspirationalQuote();
      this.interval = setInterval(this.countdownTimer, 1000);
      console.log(this.totalTime);
    },
    timerPause() {
      this.message = "Never quit, keep going!!";
      this.timerRunning = false;
      clearInterval(this.interval);
    },
    timerReset() {
      this.message = "Let the countdown begin!!";
      this.timerRunning = false;
      clearInterval(this.interval);
      this.totalTime = 25 * 60;
    },
    timerCountdown() {
      console.log("Working");
      this.timerRunning = true;
      this.interval = setInterval(this.updateCurrentTime, 1000);
      // Counts down from 60 seconds times 1000.
      setInterval(() => {
        this.timerMinutes--;
      }, 60 * 1000);

      // Check if seconds at double zero and then make it a 59 to countdown from.
      // need another method of checking the number while in the loop and then adding a zero on the number under 10
      if (this.timerSeconds === "00") {
        this.timerSeconds = 59;
        setInterval(() => {
          this.timerSeconds--;
        }, 1000);
      } else {
        setInterval(() => {
          this.timerSeconds--;
        }, 1000);
      }
    },
    countdownTimer() {
      if (this.timerRunning == true) {
        this.totalTime--;
      }
    },
    async getInspirationalQuote() {
      try {
        const response = await axios.get(quotesUrl);
        this.message =
          response.data.contents.quotes[0].quote ||
          "Greatness is within sight!!";
      } catch (error) {
        console.error(error);
      }
    }
  }
});
