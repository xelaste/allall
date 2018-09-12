const players = require ("../models/playerLoki");
test('add new player aa', () => {
    players.createPlayer({name: "aa" ,    score: 0},()=>{});
    var tyrfing = players.findOne({'name': 'aa'});
    expect(tyrfing).not.toBeNull();
    expect(tyrfing.score).toBe(0);
    console.log(tyrfing);
  });
  test('find all the players', () => {
    players.createPlayer({name: "bb" ,    score: 0},()=>{});
    players.createPlayer({name: "cc" ,    score: 0},()=>{});
    var tyrfing = players.find();
    console.log(tyrfing);
    expect(tyrfing.length).toBeGreaterThan(0);
    
  });

  test('Update the player', () => {
    players.createPlayer({name: "bb" ,    score: 0},()=>{});
    var tyrfing = players.findOne({'name': 'bb'});
    console.log(tyrfing.score);
    let score = tyrfing.score
    tyrfing.score++;
    players.updatePlayer(tyrfing,()=>{})
    tyrfing = players.findOne({'name': 'bb'});
    expect(tyrfing.score).toEqual(score + 1 );
    console.log(tyrfing);
  });

