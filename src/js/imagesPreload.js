"use strict";

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

Image.prototype.asyncLoad = function (src, asyncCallback) {

  this.onload = asyncCallback;
  this.onerror = asyncCallback;

  console.log("requesting image src of ", src);
  this.src = src;
};

function imagesPreload(requiredImages,
                       loadedImages,
                       completionCallback) {

  let numImagesRequired,
    numImagesHandled = 0,
    currentName,
    currentImage,
    preloadHandler;

  numImagesRequired = Object.keys(requiredImages).length;

  preloadHandler = function () {
    console.log("preloadHandler called with this=", this);
    loadedImages[this.name] = this;

    if (0 === this.width) {
      console.log("loading failed for", this.name);
    }

    this.onload = null;
    this.onerror = null;

    numImagesHandled += 1;

    if (numImagesHandled === numImagesRequired) {
      console.log("all preload images handled");
      console.log("loadedImages=", loadedImages);
      console.log("");
      console.log("performing completion callback");

      completionCallback();

      console.log("completion callback done");
      console.log("");
    }
  };

  for (currentName in requiredImages) {

    if (requiredImages.hasOwnProperty(currentName)) {

      console.log("preloading image", currentName);
      currentImage = new Image();
      currentImage.name = currentName;
      currentImage.asyncLoad(requiredImages[currentName], preloadHandler);
    }
  }
}
