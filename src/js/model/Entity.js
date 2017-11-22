class Entity {

  constructor(spatialID) {
    this.spatialID = spatialID;
    this.isDeadNow = false;
    this.map = GameManager.getInstance().sceneManager.getSceneByID('game').map;
  }

  detectCollisionsWithPlatform() {
    let tiles = this.map.getRectTiles(this.x, this.y);
    let collisions = [];
    let col = {
      solid: {
        right: null,
        left: null,
        bottom: null,
        top: null
      },

      mario: {
        right: null,
        left: null,
        bottom: null,
        top: null
      },

      lava: {
        right: null,
        left: null,
        bottom: null,
        top: null
      }
    };

    tiles.forEach(tile => {
      let collision = Utils.collidesWithRectangle(this.getEntityRect(), tile);
      let type = this.map.getPlatformType(tile.x, tile.y);
      if (collision && type) {
          collisions[type] = type;
          collisions[collision] = tile;
          col[type][collision] = tile;
      }
    });
    collisions["col"] = col;
    return collisions;
  }

  isCollisionWithPlatform() {
    let tiles = this.map.getRectTiles(this.x, this.y);
    let collisions = [];

    tiles.forEach(tile => {
      let collision = Utils.collidesWithRectangleTopLeft(this.getEntityRectTopLeft(), tile);
      let type = this.map.getPlatformType(tile.x, tile.y);
      if (collision && type) {
        collisions[type] = type;
        collisions[collision] = tile;
      }
    });
    if(collisions["solid"]) {
      return true;
    }
    return false;
  }

  handleBoundary() {
    const halfWidth = this.sprite.width / 2;
    const halfHeight = this.sprite.height / 2;

    if (this.y - halfHeight < 0) {
      this.y = halfHeight;
      this.velY = 0.01;
    }
    if (this.y + halfHeight > this.map.height) this.y = this.map.height - halfHeight;
    if (this.x - halfWidth < 0) this.x = halfWidth;
    if (this.x + halfWidth > this.map.width) this.x = this.map.width - halfWidth;
  }

  applyGravity(du) {
    let finalVelY = this.velY + g_gravity * du,
      avgVelY = (this.velY + finalVelY) / 2,
      dPosY = avgVelY * du;

    this.y += dPosY;
    this.velY = finalVelY;
  }

  drawCollisions(collisions) {
    for (let i in collisions) {
      this.map.drawTile(collisions[i].x, collisions[i].y);
    }
  }

  kill() {
    this.isDeadNow = true;
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
  }

  getEntityRect() {
    return {
      x: this.x,
      y: this.y,
      w: this.sprite.width,
      h: this.sprite.height
    };
  }

  getEntityRectTopLeft() {
    return {
      x: this.x - this.sprite.width / 2,
      y: this.y - this.sprite.height / 2,
      w: this.sprite.width,
      h: this.sprite.height
    };
  }

  getRadius() {
    return this.radius ? this.radius : 0;
  }

  getSpatialID() {
    return this.spatialID;
  }

  getPos() {
    return {
      x: this.x,
      y: this.y
    };
  }
}
