<template>
  <div id="app">
    <ul class="image__list">
      <li v-for="image in results.items">
        <img :src="image.media.m"
          v-on:click="toggle(image.media.m)"
          :class="{'selected': isInSelected(image.media.m)}" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {

  },
  data () {
    return {
      API_URL: 'http://api.flickr.com/services/feeds/photos_public.gne?format=json',
      API_CALLBACK: 'jsonFlickrFeed',
      results: [],  // For the JSON data
      store: []     // Temporary holding variable, for reactivity goodness
    }
  },
  created () {
    // Define the store as either whatever is already saved, or as an empty array
    this.store = JSON.parse(window.localStorage.getItem('favourites')) || []
    // Make the call to get the data
    this.results = this.makeRequest()
  },
  watch: {
    store: 'updateStore' // Call `updateStore` everytime `store` is changed
  },
  methods: {
    makeRequest: function () {
      console.log('making request')
      let self = this
      return this.$jsonp(this.API_URL, { callbackQuery: 'cb', callbackName: this.API_CALLBACK }).then(json => {
        self.results = json
      }).catch(err => {
        console.error(err)
      })
    },
    /**
     * Event that is called when the image is clicked, detects if it's
     *      previously saved and calls the appropriate function to add/remove
     *
     * @param  {String} image The full URL of the image
     * @return {boolean}       Whether the image is already selected or not
     */
    isInSelected: function (image) {
      if (this.store.indexOf(image) === -1) {
        return false
      }
      return true
    },
    /**
     * Event that is called when the image is clicked, detects if it's
     *      previously saved and calls the appropriate function to add/remove
     *
     * @param  {String} image The full URL of the image
     */
    toggle: function (image) {
      if (this.isInSelected(image)) {
        this.remove(image)
      } else {
        this.add(image)
      }
    },
    /**
     * Adds the image to the temporary array
     *
     * @param  {String} image The URL of the image
     */
    add: function (image) {
      this.store.push(image)
    },
    /**
     * Removes the image to the temporary array
     *
     * @param  {String} image The URL of the image
     */
    remove: function (image) {
      let index = this.store.indexOf(image)
      if (index > -1) {
        this.store.splice(index, 1)
      }
    },
    /**
     * Updates the localStorage, triggered from a watch() function
     */
    updateStore: function () {
      try {
        window.localStorage.setItem('favourites', JSON.stringify(this.store))
      } catch (error) {
        // TODO: Better/visual/user-friendly error handling
        console.log(error)
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.image__list > li {
  display: inline-block;
  margin: 1em;
  padding: 1em;
}

.image__list > li > img:hover {
  cursor: pointer;
}

.selected {
  border: 5px dashed pink;
}
</style>
