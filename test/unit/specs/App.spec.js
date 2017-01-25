import Vue from 'vue'
import App from 'src/App'
import sinon from 'sinon'
//
// import VueJsonp from 'vue-jsonp'
// Vue.use(VueJsonp)

describe('Listing of the images', () => {
  // let server

  beforeEach(function () {
    // server = sinon.fakeServer.create()
  })

  afterEach(function () {
    // server.restore()
  })

  it('should render correct contents', () => {
    const VM = new Vue(App)
    expect(VM).to.not.be('undefined')
    let server = sinon.fakeServer.create()
    server.respondWith('GET', VM.$data.API_URL,
      [200, { 'Content-Type': 'application/json' },
        '{ "stuff": "is", "awesome": "in here" }'])

    // let callbacks = sinon.spy()
    //
    // VM.$jsonp({
    //   url: VM.$data.API_URL,
    //   success: callbacks
    // })
    //
    // console.log(server.requests) // Logs all requests so far
    // server.respond() // Process all requests so far

    // expect(callbacks[0].calledOnce).toBeTruthy()
  })
})
