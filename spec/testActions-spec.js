import {symbols,addPlayer,updateScore} from "../src/actions/player" 
describe('Actions tests', function() 
{
    it('it should be xxx player added', function() 
    {
        let action = addPlayer("xxx");
        expect(action.payload).toEqual("xxx");
        expect(action.type).toEqual(symbols.addPlayer);
    });

    it('it should be yyy player scored', function() 
    {
        let action = updateScore("yyy",10)
        expect(action.payload.player).toEqual("yyy");
        expect(action.type).toEqual(symbols.updateScore);
    });

  });
  