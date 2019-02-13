'use strict'

class userGetAction {

    async executeAction() {
        let result = {ac:123}

        console.log(this.param1);
        return result;
    }
}

module.exports = userGetAction