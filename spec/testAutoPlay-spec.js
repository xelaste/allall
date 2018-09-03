import AutoPlay from "../src/auto/AutoPlay"

describe('AutoPlay tests', function () {
    it('AutoPlay', function () {
        let autoPlay = new AutoPlay();
        console.log("$$$$" + autoPlay.getInitialSet().length);
        expect(autoPlay.getInitialSet()).toBeDefined()
    });
});
