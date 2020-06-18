new Vue({
  el: ".app",
  data: {
    player_health: 100,
    monster_health: 100,
    game_is_on: false,
    logs: [],
    c_attack: 10,
    c_special_attack: 20,
    c_monster_attack: 15,
    c_heal_up: 25,
    log_text: {
      attack: "player attacked : monster - ",
      special_attack: "player used special attack : monster - ",
      heal_up: "şifacı geldi : player + ",
      monster_attack: "eeellle sümsüğü kodummuu zıngılatırım : player - ",
      give_up: "beyle poh gibi kaçarsın işte!! : ",
    },
  },
  methods: {
    start_game: function () {
      this.game_is_on = true;
    },
    attack: function () {
      var point = Math.ceil(Math.random() * this.c_attack);
      this.monster_health -= point;
      this.monster_attack();
      this.add_to_log({ turn: "p", text: this.log_text.attack + point });
    },
    specialAttack: function () {
      var point = Math.ceil(Math.random() * this.c_special_attack);
      this.monster_health -= point;
      this.add_to_log({
        turn: "p",
        text: this.log_text.special_attack + point,
      });
      this.monster_attack();
    },
    healUp: function () {
      var point = Math.ceil(Math.random() * this.c_heal_up);
      this.player_health += point;
      this.add_to_log({ turn: "p", text: this.log_text.heal_up + point });
    },
    giveUp: function () {
      this.player_health = 0;
      this.add_to_log({ turn: "p", text: this.log_text.give_up });
    },
    monster_attack: function () {
      var point = Math.ceil(Math.random() * this.c_monster_attack);
      this.player_health -= point;
      this.add_to_log({
        turn: "m",
        text: this.log_text.monster_attack + point,
      });
    },
    add_to_log: function (log) {
      this.logs.push(log);
    },
  },
  watch: {
    player_health: function (value) {
      if (value <= 0) {
        this.player_health = 0;
        if (confirm("GEBERDİN !!! Bİ DAHA OYNAN MI??")) {
          this.player_health = 100;
          this.monster_health = 100;
          this.logs = [];
        }
      } else if (value >= 100) {
        this.player_health = 100;
      }
    },
    monster_health: function (value) {
      if (value <= 0) {
        this.monster_health = 0;
        if (confirm("AFFERİM KAZANDIN LAN!!! Bİ DAHA OYNAN MI ???")) {
          this.player_health = 100;
          this.monster_health = 100;
          this.logs = [];
        }
      }
    },
  },
  computed: {
    playerProgress: function () {
      return {
        width: this.player_health + "%",
      };
    },
    monsterProgress: function () {
      return {
        width: this.monster_health + "%",
      };
    },
  },
});
