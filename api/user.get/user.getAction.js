'use strict'

class userGetAction {

    async executeAction() {
        let result = {user_id:this.param1}

        return result;
    }
}

module.exports = userGetAction
