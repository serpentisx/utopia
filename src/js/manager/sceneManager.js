class SceneManager {
 constructor() {
    this.scenes = [];
    this.currentScene;
  }

  register(entity) {
    this.scenes.push(scene);
  }

  loadNextScene() {

  }

 


  render(ctx) {
    this.currentScene.render(ctx);
  }

  setCurrentScene(id){
 
    if (this.scenes[id]) {
        // Pause the current scene
        if (this.currentScene) this.currentScene.pause();
        // Set the current scene as scene passed
        this.currentScene = this.scenes[id];

        //Allow scene to resume
        this.currentScene.resume();

        return true;
    }

    return false;
}

    getCurrentScene() {
      return this.currentScene;
    }

    createScene(id, sceneType) {
      if (this.scenes[id]) return undefined;
 
        var scene = sceneType;

        this.scenes[id] = scene;
 
        return scene;
        }

         update(du) {

    // Check whether scene is dead, if so load next scene?
    //update the current scene
    if(!this.currentScene.isChangingScenes) {
      this.currentScene.update(du);
    } else {
      this.setCurrentScene(this.currentScene.getNextScene());
    }
  }
   

}
