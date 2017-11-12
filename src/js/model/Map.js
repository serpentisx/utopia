class Map {

  constructor(mapImage) {
    this.sprite = mapImage;
    this.width = this.sprite.width;
    this.height = this.sprite.height;
    this.tsize = 128;
    //Set to 0 for background, 1 for collision sheet, 2 for foreground
    this.developer = 1;

    this.rocks = new Image();
    this.rocks.src = 'assets/platformer_background_3/Layers/layer06_Rocks.png';
    this.rocks = new Sprite(this.rocks);

    this.cave = new Image();
    this.cave.src = 'assets/map/cave_background.png';
    this.cave = new Sprite(this.cave);

    this.hills = new Image();
    this.hills.src = 'assets/platformer_background_3/Layers/layer04_Hills_2.png';
    this.hills = new Sprite(this.hills);

    this.hills2 = new Image();
    this.hills2.src = 'assets/platformer_background_3/Layers/layer03_Hills_1.png';
    this.hills2 = new Sprite(this.hills2);

    this.clouds = new Image();
    this.clouds.src = 'assets/platformer_background_3/Layers/layer05_Clouds.png';
    this.clouds = new Sprite(this.clouds);
    this.clouds.x = -1000;
    this.clouds.y = 0;


    this.cols = Math.ceil(this.width / this.tsize); //Divide by map tile size
    this.rows = Math.ceil(this.height / this.tsize); //Divide by map tile size

    //Change this  -- we need to load all the tiles in an effective way
    this.imgArray = new Array();

    this.imgArray[0] = new Image();
    this.imgArray[0].src = 'assets/_ground/ground06.png';

    this.imgArray[1] = new Image();
    this.imgArray[1].src = 'assets/_ground/ground02.png';

    this.imgArray[2] = new Image();
    this.imgArray[2].src = 'assets/_lava/lava01.png';

    this.imgArray[3] = new Image();
    this.imgArray[3].src = 'assets/_leafy_ground/leafy_ground01.png';

    this.imgArray[4] = new Image();
    this.imgArray[4].src = 'assets/_rocky/rocky03.png';

    this.imgArray[5] = new Image();
    this.imgArray[5].src = 'assets/_hollow/hollow_middle.png';

    this.imgArray[6] = new Image();
    this.imgArray[6].src = 'assets/_hollow/hollow15.png';

    this.imgArray[7] = new Image();
    this.imgArray[7].src = 'assets/_lava/lava2.png';

    this.imgArray[8] = new Image();
    this.imgArray[8].src = 'assets/_rocky/rocky04.png';

    this.tiles = new Array();

    for(var i = 0; i < this.imgArray.length; i ++ ) {
      this.tiles[i] = new Sprite(this.imgArray[i]);
    }


    //Create 2D array that fills out image/map size - we will split the array to
    //represent background and foreground (this is if we want the player to
    // walk behind objects)
    this.layer =
      //Background
      [
         [
           [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,2,2,0,0,0,0,4,4,4,0,0,4,4,1,1,1,1,4,4,4,4,4,4,4,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0],[0,0,0,0,0,0,0,0,0,0,0,4,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],[4,4,4,4,4,4,4,4,4,4,4,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,0,0,0,0,0,2,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,1,1,1,1,1,0,0],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,3,3,3,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0],[0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,1,0,0,0,0,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0],[0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0],[2,2,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,5,0,0],[0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,5,5,5,5,5,5,0,0,5,5,5,0,0,0,0,0,5,0,0],[0,0,0,0,0,2,2,0,0,0,0,1,1,1,1,0,0,1,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,1,0,0],[0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1,5,5,3,3,3,3,3,5,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,0,0,2,2,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,2,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,0,0,0,0,1,1,1,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,2,1,0,0],[0,0,0,0,0,0,2,2,0,0,0,1,1,1,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,1,0,0],[0,0,2,2,0,0,0,0,0,0,0,1,1,1,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,1,0,0],[0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,5,5,3,3,3,3,3,3,3,3,3,3,3,3,1,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,3,3,3,3,3,3,3,3,3,3,3,3,1,0,0],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,5,5,5,5,5,3,3,3,3,3,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
         ],
         [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,2,2,0,0,0,0,4,4,4,0,4,4,4,1,1,1,1,4,4,4,4,4,4,4,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0],[0,0,0,0,0,0,0,0,0,0,0,4,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],[4,4,4,4,4,4,4,4,4,4,4,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,0,0,0,0,2,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,1,1,1,1,1,0,0],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,3,3,3,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0],[0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,1,0,0,0,0,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0],[0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0],[2,2,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,5,0,0],[1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,5,5,5,5,5,5,0,0,5,5,5,0,0,0,0,0,5,0,0],[2,2,2,2,2,2,2,2,2,2,0,1,1,1,1,0,0,1,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,1,0,0],[0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1,5,5,3,3,3,3,3,5,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,0,0,2,2,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,2,0,0,2,0,0,0,0,0,0,0,0,0,9,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,0,0,0,0,1,1,1,5,5,0,0,0,0,0,0,0,5,5,0,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,9,1,0,0],[0,0,0,0,0,0,2,2,0,0,0,0,1,1,5,5,0,0,0,0,0,0,0,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,0,0,0,1,0,0],[0,0,2,2,0,0,0,0,0,0,0,0,1,1,5,5,0,0,0,0,0,0,0,5,5,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,9,1,0,0],[0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,0,2,0,0,0,5,5,3,3,3,3,3,3,3,3,3,3,3,3,1,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,0,0,0,0,5,5,5,8,8,8,8,8,8,8,8,8,8,8,8,1,0,0],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,3,3,3,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
         ],
         [
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ]
      ];


    window.addEventListener('mousedown', this.addOrRemoveTile.bind(this));
  }

  addOrRemoveTile(e) {
    let x = e.clientX - ctx.canvas.offsetLeft + this.xView;
    let y = e.clientY - ctx.canvas.offsetTop + this.yView;
    let r = this.getRow(y);
    let c = this.getCol(x);

    if(keys[KEY_1]) this.layer[this.developer][r][c] = 1;
    else if(keys[KEY_2]) this.layer[this.developer][r][c] = 2;
    else if(keys[KEY_3]) this.layer[this.developer][r][c] = 3;
    else if(keys[KEY_4]) this.layer[this.developer][r][c] = 4;
    else if(keys[KEY_5]) this.layer[this.developer][r][c] = 5;
    else if(keys[KEY_6]) this.layer[this.developer][r][c] = 6;
    else if(keys[KEY_7]) this.layer[this.developer][r][c] = 7;
    else if(keys[KEY_8]) this.layer[this.developer][r][c] = 8;
    else if(keys[KEY_9]) this.layer[this.developer][r][c] = 9;


    else this.layer[this.developer][r][c] = 0;

    //Get the array from map building
    console.log(JSON.stringify(this.layer[this.developer]));
  }

  getTile(layer, row, col) {
    return this.layer[layer][row][col];
  }

  // this function can be optimized, we don't need to check that much
  getRectTiles(x, y) {
    var row = Math.max(0, this.getRow(y) - 3);
    var col = Math.max(0, this.getCol(x) - 3);

    var tiles = [];
    for (var i = row; i <= row + 4; i++) {
      for( var k = col; k <= col + 4; k++) {
        if (this.layer[1][i][k] !== undefined) {
          tiles.push({
            y: i * this.tsize,
            x: k * this.tsize,
            w: this.tsize,
            h: this.tsize
          });
        }
      }
    }
    return tiles;
  }

  isSolidTileAtXY(x, y) {
    let col = Math.floor(x / this.tsize);
    let row = Math.floor(y / this.tsize);
    let tile = this.getTile(1, row, col);

    return (tile != 0);
  }

  getCol(x) {
    return Math.floor(x / this.tsize);
  }

  getRow(y) {
    return Math.floor(y / this.tsize);
  }

  getX(col) {
    return col * this.tsize;
  }

  getY(row) {
    return row * this.tsize;
  }

  drawTile(x, y) {
    ctx.strokeStyle = "green";
    ctx.lineWidth = 5;
    ctx.strokeRect(x - this.xView, y - this.yView, 128, 128);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
  }

  renderForeground(ctx, xView, yView) {
    this.drawGrid(ctx, 2, xView, yView);
  }

  render(ctx, xView, yView) {
    //context.drawImage(this.image, 0, 0, this.image.width, this.image.height, -xView, -yView, this.image.width, this.image.height);

    //Get the array from map building
    //console.log(JSON.stringify(this.layer[this.developer]));

    let sx, sy, dx, dy,
      sWidth, sHeight, dWidth, dHeight;

    // Offset point to crop image
    this.xView = xView;
    this.yView = yView;

    // dimensions of cropped image
    sWidth = ctx.canvas.width;
    sHeight = ctx.canvas.height;

    //Check if cropped image is smaller than canvas
    if (this.sprite.width - this.xView < sWidth) {
      sWidth = this.sprite.width - this.xView;
    }

    if (this.sprite.height - this.yView < sHeight) {
      sHeight = this.sprite.height - this.yView;
    }

    // location on canvas to draw the cropped image
    dx = 0;
    dy = 0;

    // match destination with source to not scale the image
    dWidth = sWidth;
    dHeight = sHeight;

    this.sprite.drawAt(ctx, this.xView, this.yView, sWidth, sHeight, dx, dy, dWidth, dHeight);
    this.rocks.drawAtCorner(ctx, 0, 0);
    if(this.clouds.x > this.xView) {
      this.clouds.x = -1000;
    }
    this.clouds.drawAtCorner(ctx, this.clouds.x+=0.5, this.clouds.y);
    this.hills.drawAtCorner(ctx, -this.xView, -this.yView);
    this.hills.drawAtCorner(ctx, -this.xView+this.hills.image.width, -this.yView);
    this.hills.drawAtCorner(ctx, -this.xView+this.hills.image.width*2, -this.yView);
    this.cave.drawAtCorner(ctx, -this.xView, -this.yView+this.sprite.image.height-this.cave.image.height);
    this.cave.drawAtCorner(ctx, -this.xView+this.cave.image.width, -this.yView+this.sprite.image.height-this.cave.image.height);
    this.cave.drawAtCorner(ctx, -this.xView, -this.yView+this.sprite.image.height-this.cave.image.height*2);
    this.cave.drawAtCorner(ctx, -this.xView+this.cave.image.width, -this.yView+this.sprite.image.height-this.cave.image.height*2);

  //  this.hills.drawAtCorner(ctx, this.xView, -this.yView+ (this.sprite.height-this.hills.image.height/2));

    this.drawGrid(ctx, 1, this.xView, this.yView);
  }

  drawGrid(ctx, layer, xView, yView) {
    // dimensions of cropped image
    let cameraWidth = ctx.canvas.width + 200,
      cameraHeight = ctx.canvas.height + 200;

    let startCol = Math.floor(xView / this.tsize);
    let endCol = startCol + (cameraWidth / this.tsize);

    //	console.log(endCol);
    let startRow = Math.floor(yView / this.tsize);
    let endRow = startRow + (cameraHeight / this.tsize);
    let offsetX = -xView + startCol * this.tsize;
    let offsetY = -yView + startRow * this.tsize;

      for (let r = startRow; r <= endRow; r++) {
        for (let c = startCol; c <= endCol; c++) {
        var tile = this.getTile(layer, r, c);
        var x = (c - startCol) * this.tsize + offsetX;
        var y = (r - startRow) * this.tsize + offsetY;
        ctx.strokeRect(Math.round(x), Math.round(y), 128, 128);
        if (tile != 0) { // 0 => empty tile
          this.tiles[tile-1].drawAtCorner(ctx, x, y);
        }

      }
    }
  }
}
