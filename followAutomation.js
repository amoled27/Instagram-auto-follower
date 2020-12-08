automationHandler = {
    config: {
        actionInterval: 2000,
        searchString: 'goa/',
        instagramUri: 'https://www.instagram.com',
        searchHashTagPath: '/explore/tags/'
    },
    postIndex: 0,
    postCollection: [],
    init: function () {
        this.execute();
    },
    execute: function () {
        this.searchHashtag();
        let that = this;
        that.getPosts();

        setTimeout(function () {
            that.populatePost();
        }, that.config.actionInterval);

    },

    //check if we are already on the specified url 
    checkCurrentUrl: function () {
        if ((window.location.href).indexOf(this.config.instagramUri + this.config.searchHashTagPath + this.config.searchString) > -1) {
            return true;
        }
        return false;
    },

    //search hashtag 
    searchHashtag: function () {
        if (!this.checkCurrentUrl()) {
            window.location.replace(this.config.instagramUri + this.config.searchHashTagPath + this.config.searchString);
        }
    },

    //get posts with given hashtag
    getPosts: function () {
        this.postCollection = document.querySelectorAll('.v1Nh3.kIKUG._bz0w');
        return this.postCollection;
    },

    postIndexIncrement: function () {
        this.postIndex++;
    },

    postIndexDecrement: function () {
        this.postIndex--;
    },

    // open the post as a popup
    populatePost: function () {
        this.postCollection[this.postIndex].querySelector('a').click();
        let that = this;
        setTimeout(function () {
            that.followUser();
        }, that.config.actionInterval);
    },

    //follow the instagram user
    followUser: function () {
        if (document.querySelectorAll('.sqdOP.yWX7d.y3zKF')[0] && document.querySelectorAll('.sqdOP.yWX7d.y3zKF')[0].innerText.indexOf('Follow') > -1) {
            document.querySelectorAll('.sqdOP.yWX7d.y3zKF')[0].click();
        }
        let that = this;
        setTimeout(() => {
            that.closePostPopUp();
        }, that.config.actionInterval);
    },

    //close the post popup
    closePostPopUp: function () {
        if (document.querySelectorAll('._2dDPU.CkGkG')[0]) {
            document.querySelectorAll('._2dDPU.CkGkG')[0].click()
        }
        let that = this;
        this.postIndexIncrement();
        if (this.postIndex >= this.postCollection.length) {
            return;
        }
        setTimeout(() => {
            that.populatePost();
        }, that.config.actionInterval);
    }
}

automationHandler.init();