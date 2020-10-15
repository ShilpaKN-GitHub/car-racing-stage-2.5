class Form
{
    constructor()
    {
        this.input = createInput("Name");
        this.button = createButton("Play");
        this.greeting = createElement("h3");
        this.reset = createButton("Reset");
    }

    hide()
    {
        this.greeting.hide();
        this.button.hide();
        this.input.hide();
    }

    display()
    {
        var xCentre = displayWidth / 2;
        var yCentre = displayHeight / 2;

        var title = createElement("h2");
        title.html("Car Racing Game");
        title.position(xCentre - 50, 0);

        this.input.position(xCentre - 40, yCentre - 80);
        this.button.position(xCentre + 30, yCentre);
        this.reset.position(displayWidth - 100, 20);

        this.button.mousePressed(() =>
        {
            this.input.hide();
            this.button.hide();
             
            player.name = this.input.value();
            playerCount++;
            player.index = playerCount;
            player.update();
            player.updateCount(playerCount);

            this.greeting.html("Hello " + player.name);
            this.greeting.position(xCentre - 70, yCentre / 2); //yCenter / 2 = displayHeight / 4
        });

        this.reset.mousePressed(() =>
        {
            player.updateCount(0);
            game.update(0);
        });
    }
}