# VR experiments

## Roadmap
Where to go next ?
* Add multiple models to create a 'cabinet gallery'.
    * How to browse multiple.
        * Arrange in 360 deg around the user?
        * Click floor to teleport?
        * VR buttons to move them around?
    * Rotate / Zoom / Translate buttons


## Findings

The React VR stack allows us to develop VR solutions which are delivered in the browser

#### Advantages
* Integrates seamlessly with our React stack. This will allow us to develop efficiently
* Quick iteration cycle. React Hot Reloader and the browser delivery together make development extremely quick. Unity does also have some impressive tools to edit things in real-time.
* Browser delivery makes it very accessible.

#### Drawbacks
* Limited browser support. Currently only available on GearVR browser, or on Android Chrome with a developer flag enabled.
* Instability. It crashes very regularly on my (mid-range) phone - perhaps that's why the feature is still disabled...
* Limited interaction. I've not yet found a way to detect taps on the Vr Buttons when in VR mode. (works well in ordinary mode)


## Usage notes
To run simply clone the repo and invoke ```npm run start```

To view on a phone, the best method is to set up an ngrok tunnel.
First disable hot reload in index.html, then:
```
ngrok http 8081
```