class Game
{
    constructor() {}

    getState()
    {
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value", function(data)
        {
            gameState = data.val();
        });
    }

    update(state)
    {
        database.ref("/").update(
            {
                gameState: state
            }
        );
    }

    async start()
    {
        if(gameState === 0)
        {
            player = new Player();
            var playerCountRef = await database.ref("playerCount").once("value");
            if(playerCountRef.exists())
            {
                playerCount = playerCountRef.val();
                player.getCount();
            }

            form = new Form();
            form.display();
        }

        car1 = createSprite(100, 200);
        car1.addImage("car1", car1_image);
        
        car2 = createSprite(300, 200);
        car2.addImage("car2", car2_image);

        car3 = createSprite(500, 200);
        car3.addImage("car3", car3_image);

        car4 = createSprite(700, 200);
        car4.addImage("car4", car4_image);

        cars = [car1, car2, car3, car4];
    }

    play()
    {
        form.hide();
        Player.getPlayerInfo();
        if(allPlayers !== undefined)
        {
            background("#c68767");

            image(track, 0, -displayHeight * 4, displayWidth, displayHeight * 5);

            var index = 0, x = 175, y;
            for(var p in allPlayers)
            {
                index++;
                x += 200;
                y = displayHeight - allPlayers[p].distance;
                
                cars[index - 1].x = x;
                cars[index - 1].y = y;

                if(index === player.index)
                {
                    stroke(10);
                    fill("red");
                    ellipse(x, y, 60, 60);

                    cars[index - 1].shapeColor = "red";

                    camera.position.x = displayWidth / 2;
                    camera.position.y = cars[index - 1].y;
                }
            }
        }

        if(keyIsDown(UP_ARROW) && player.index !== null)
        {
            player.distance += 10;
            player.update();
        }

        if(player.distance > 3860)
        {
            gameState = 2;
        }

        drawSprites();
    }

    end()
    {
        console.log("Game Ended");
    }
}