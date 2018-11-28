const players = require ("../models/player");
var collection = null;
beforeEach(() => {
    collection = players.init();
    collection.clear();
  });
test('add new player aa', () => {
    player = players.createPlayer({name: "aa" ,    score: 0})
    var tyrfing = collection.findOne({'name': 'aa'});
    expect(tyrfing).not.toBeNull();
    expect(tyrfing.score).toBe(0);
    console.log(tyrfing);
  });
  test('find all the players', () => {
    players.createPlayer({name: "bb" ,    score: 0});
    players.createPlayer({name: "cc" ,    score: 0});
    var tyrfing = collection.find();
    console.log(tyrfing);
    expect(tyrfing.length).toBeGreaterThan(0);
    
  });

  test('find all the winners', () => {
    players.createPlayer({name: "bb" ,    score: 0});
    players.createPlayer({name: "cc" ,    score: 1});
    players.createPlayer({name: "dd" ,    score: 10});
    players.createPlayer({name: "xx" ,    score: 100});
    var tyrfing = players.getWinners(3)
    expect.assertions(2);
    return tyrfing.then(data=>{
      console.log(data);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0].name).toBe("xx")
    });
  });

  test('Update the player', () => {
    players.createPlayer({name: "bb" ,    score: 0});
    var tyrfing = collection.findOne({'name': 'bb'});
    console.log(tyrfing.score);
    let score = tyrfing.score
    tyrfing.score++;
    players.updatePlayer(tyrfing);
    tyrfing = collection.findOne({'name': 'bb'});
    expect(tyrfing.score).toEqual(score + 1 );
    console.log(tyrfing);
  });
