"use strict";

Image.prototype.asyncLoad = function (src, asyncCallback) {

  this.onload = asyncCallback;
  this.onerror = asyncCallback;

  this.src = src;
};

function imagesPreload(requiredImages,
                       sprites,
                       completionCallback) {

  let numImagesRequired,
    numImagesHandled = 0,
    currentName,
    currentImage,
    preloadHandler;

  numImagesRequired = Object.keys(requiredImages).length;

  preloadHandler = function () {
    sprites[this.name] = new Sprite(this);

    if (0 === this.width) {
      console.log("loading failed for", this.name);
    }

    this.onload = null;
    this.onerror = null;

    numImagesHandled += 1;

    if (numImagesHandled === numImagesRequired) {
     /* console.log("all preload images handled");
      console.log("loadedSprites=", sprites);
      console.log("");
      console.log("performing completion callback");*/

      completionCallback();

     // console.log("completion callback done");
     // console.log("");
    }
  };

  for (currentName in requiredImages) {
    if (requiredImages.hasOwnProperty(currentName)) {

      currentImage = new Image();
      currentImage.name = currentName;
      currentImage.asyncLoad(requiredImages[currentName], preloadHandler);
    }
  }
}
